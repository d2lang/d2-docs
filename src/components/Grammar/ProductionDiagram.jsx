import React from "react";
import { grammarFiles } from "./grammar";
import styles from "./ProductionDiagram.module.css";

const turn = 10;
const gutter = 2 * turn;
// Wrap long sequences to limit the width of the diagram.
const rowWidth = 6000;

function Arrow({ x, y = 0, back = false }) {
  const tail = x + (back ? 4 : -4);
  return <path d={`M${tail} ${y - 3} L${x} ${y} L${tail} ${y + 3}`} />;
}

// A rail that changes levels between x and x + gutter. It starts and ends
// pointing right, including at the far end of an alternative branch.
function bend(x, from, to) {
  if (from === to) return `M${x} ${from} h${gutter}`;
  const dy = Math.sign(to - from) * Math.min(turn, Math.abs(to - from) / 2);
  return `M${x} ${from} q${turn} 0 ${turn} ${dy} V${to - dy} q0 ${dy} ${turn} ${dy}`;
}

function rangeEnd(raw) {
  const hex = /^"\\[ux]([0-9a-f]+)"$/i.exec(raw);
  return hex
    ? "U+" + parseInt(hex[1], 16).toString(16).toUpperCase().padStart(4, "0")
    : raw;
}

// Each box begins at (0, 0) and ends at (width, exit). Its extents include
// every branch and return track, so nested boxes can be positioned independently.
function token(expr) {
  const ref = expr.type === "ref";
  const range = expr.type === "range";
  const text = range ? `${rangeEnd(expr.from)} … ${rangeEnd(expr.to)}` : expr.text;
  const width = Math.max(32, Array.from(text).length * 7.9 + 20);
  const glyph = (
    <>
      <rect y={-14} width={width} height={28} rx={ref ? 4 : 14} />
      <text x={width / 2} y={0} dy=".34em" textAnchor="middle">
        {text}
      </text>
    </>
  );
  const node = ref ? (
    <a
      className={styles.rule}
      href={"#diagram-" + expr.text}
      aria-label={"Diagram for " + expr.text}
    >
      {glyph}
    </a>
  ) : (
    <g className={range ? styles.range : styles.literal}>{glyph}</g>
  );
  return { width, above: 14, below: 14, exit: 0, node };
}

function line(items) {
  let width = 0,
    exit = 0,
    above = 0,
    below = 0;
  const node = items.map((item, i) => {
    const x = width,
      y = exit;
    above = Math.max(above, item.above - y);
    below = Math.max(below, item.below + y);
    width += item.width;
    exit += item.exit;
    if (i < items.length - 1) width += gutter;
    return (
      <g key={i} transform={`translate(${x} ${y})`}>
        {item.node}
        {i < items.length - 1 && (
          <g transform={`translate(${item.width} ${item.exit})`}>
            <path d={`M0 0 h${gutter}`} />
            <Arrow x={gutter / 2 + 2} />
          </g>
        )}
      </g>
    );
  });
  return { width, above, below, exit, node };
}

function sequence(items) {
  // Long sequences read like wrapped text. Every row reads left to right; the
  // return rail between rows carries no tokens.
  const rows = [];
  let pending = [],
    used = 0;
  for (const item of items) {
    if (pending.length && used + gutter + item.width > rowWidth) {
      rows.push(line(pending));
      pending = [];
      used = 0;
    }
    used += item.width + (pending.length ? gutter : 0);
    pending.push(item);
  }
  rows.push(line(pending));
  if (rows.length === 1) return rows[0];

  const width = Math.max(...rows.map((row) => row.width)) + 2 * gutter;
  const above = rows[0].above;
  let y = 0;
  const node = rows.map((row, i) => {
    const baseline = y;
    const end = baseline + row.exit;
    const next = rows[i + 1];
    const returnY = baseline + row.below + gutter;
    if (next) y = returnY + gutter + next.above;
    return (
      <g key={i}>
        {i === 0 && <path d={`M0 ${baseline} H${gutter}`} />}
        <g transform={`translate(${gutter} ${baseline})`}>{row.node}</g>
        {next ? (
          <>
            <path
              d={`M${gutter + row.width} ${end} H${
                width - turn
              } q${turn} 0 ${turn} ${turn}
          V${
            returnY - turn
          } q0 ${turn} ${-turn} ${turn} H${turn} q${-turn} 0 ${-turn} ${turn}
          V${y - turn} q0 ${turn} ${turn} ${turn} H${gutter}`}
            />
            <Arrow x={width / 2} y={returnY} back />
          </>
        ) : (
          <path d={`M${gutter + row.width} ${end} H${width}`} />
        )}
      </g>
    );
  });
  const last = rows[rows.length - 1];
  return { width, above, below: y + last.below, exit: y + last.exit, node };
}

function choice(items) {
  const content = Math.max(...items.map((item) => item.width));
  const width = content + 2 * gutter;
  const levels = [0];
  for (let i = 1; i < items.length; i++) {
    levels.push(levels[i - 1] + items[i - 1].below + gutter + items[i].above);
  }
  const exit = items[0].exit;
  const node = items.map((item, i) => {
    const y = levels[i];
    const x = gutter;
    return (
      <g key={i}>
        <path d={bend(0, 0, y) + " " + bend(width - gutter, y + item.exit, exit)} />
        <path
          d={`M${gutter} ${y} H${x} M${x + item.width} ${y + item.exit} H${
            width - gutter
          }`}
        />
        <g transform={`translate(${x} ${y})`}>{item.node}</g>
      </g>
    );
  });
  const last = items.length - 1;
  return {
    width,
    above: items[0].above,
    below: levels[last] + items[last].below,
    exit,
    node,
  };
}

function bypass(body, repeat) {
  const width = body.width + 2 * gutter;
  const bodyY = body.above + gutter;
  const bodyEnd = bodyY + body.exit;
  const below = bodyY + body.below + (repeat ? gutter : 0);
  const node = (
    <>
      <path d={`M0 0 H${width}`} />
      <Arrow x={width / 2} />
      <path d={bend(0, 0, bodyY) + " " + bend(width - gutter, bodyEnd, 0)} />
      {repeat && (
        <>
          <path
            d={`M${width - gutter} ${bodyEnd} q${turn} 0 ${turn} ${turn}
        V${below - turn} q0 ${turn} ${-turn} ${turn} H${gutter}
        q${-turn} 0 ${-turn} ${-turn} V${bodyY + turn} q0 ${-turn} ${turn} ${-turn}`}
          />
          <Arrow x={width / 2} y={below} back />
        </>
      )}
      <g transform={`translate(${gutter} ${bodyY})`}>{body.node}</g>
    </>
  );
  return { width, above: 0, below, exit: 0, node };
}

// Expand each production at the nearest reference to File. Other occurrences,
// including recursive references, link to that same expansion on the track.
function expansionSites() {
  const rules = new Map(
    grammarFiles.flatMap((file) => file.rules.map((r) => [r.name, r]))
  );
  const start = rules.get("File");
  const queue = [start];
  const reached = new Set([start.name]);
  const sites = new Map();
  function visit(expr, references) {
    if (expr.type === "ref") references.set(expr.text, expr);
    if (expr.children) expr.children.forEach((child) => visit(child, references));
    if (expr.child) visit(expr.child, references);
  }
  for (const parent of queue) {
    // At equal depth within a rule, use its last occurrence. This keeps the
    // first pass through MapBody readable before expanding its padding.
    const references = new Map();
    visit(parent.expression, references);
    for (const [name, site] of references) {
      if (reached.has(name)) continue;
      const rule = rules.get(name);
      if (!rule) throw new Error("Undefined grammar rule: " + name);
      sites.set(site, rule);
      reached.add(name);
      queue.push(rule);
    }
  }
  if (reached.size !== rules.size)
    throw new Error("Grammar contains rules unreachable from File");
  return { sites, start };
}

const { sites, start } = expansionSites();

function namedRule(rule) {
  const body = layout(rule.expression);
  const lead = 30 + rule.name.length * 8;
  const width = lead + body.width + gutter;
  return {
    width,
    above: Math.max(33, body.above),
    below: Math.max(body.below, body.exit + 7),
    exit: body.exit,
    node: (
      <g data-production={rule.name} role="group" aria-label={rule.name}>
        <desc>{rule.source}</desc>
        <path d={`M0 0 H${lead} M${lead + body.width} ${body.exit} h${gutter}`} />
        <Arrow x={lead - 8} />
        <a
          id={"diagram-" + rule.name}
          className={styles.heading}
          href={"#rule-" + rule.name}
          aria-label={"EBNF for " + rule.name}
        >
          <text data-rule-focus="" x={5} y={-9}>
            {rule.name}
          </text>
        </a>
        <g transform={`translate(${lead} 0)`}>{body.node}</g>
        <path className={styles.cap} d={`M${width - 5} ${body.exit - 5} v10`} />
      </g>
    ),
  };
}

function layout(expr) {
  switch (expr.type) {
    case "ref":
      return sites.has(expr) ? namedRule(sites.get(expr)) : token(expr);
    case "literal":
    case "range":
      return token(expr);
    case "sequence":
      return sequence(expr.children.map(layout));
    case "choice":
      return choice(expr.children.map(layout));
    case "optional":
      return bypass(layout(expr.child), false);
    case "repeat":
      return bypass(layout(expr.child), true);
    case "empty":
      return {
        width: gutter,
        above: 0,
        below: 0,
        exit: 0,
        node: <path d={`M0 0 h${gutter}`} />,
      };
    default:
      throw new Error("Unsupported grammar expression: " + expr.type);
  }
}

const railroad = namedRule(start);
export const diagramSize = {
  width: Math.ceil(railroad.width + 64),
  height: Math.ceil(railroad.above + railroad.below + 36),
  entryY: railroad.above + 18,
};

export default function ProductionDiagram({ svgRef }) {
  const { width, height, entryY } = diagramSize;
  return (
    <svg
      ref={svgRef}
      className={styles.diagram}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="group"
      aria-label="D2 grammar railroad"
    >
      <title>D2 grammar</title>
      <desc>Start at File. Named references link to their expansion on the track.</desc>
      <g transform={`translate(32 ${entryY})`}>
        <path d={`M-24 0 H0 M${railroad.width} ${railroad.exit} h24`} />
        <circle cx={-24} cy={0} r={3.5} />
        {railroad.node}
        <circle
          cx={railroad.width + 24}
          cy={railroad.exit}
          r={5}
          className={styles.end}
        />
        <circle cx={railroad.width + 24} cy={railroad.exit} r={2} />
      </g>
    </svg>
  );
}
