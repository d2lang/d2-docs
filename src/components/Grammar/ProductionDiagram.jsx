import React from "react";
import styles from "./ProductionDiagram.module.css";

const turn = 10;
const gutter = 2 * turn;
const rowWidth = 520;

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
  const middle = Math.floor((items.length - 1) / 2);
  const offset = levels[middle];
  const exit = items[middle].exit;
  const node = items.map((item, i) => {
    const y = levels[i] - offset;
    const x = (width - item.width) / 2;
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
    above: offset + items[0].above,
    below: levels[last] - offset + items[last].below,
    exit,
    node,
  };
}

function bypass(body, repeat) {
  const width = body.width + 2 * gutter;
  const above = body.above + gutter;
  const below = body.below + (repeat ? gutter : 0);
  const exit = body.exit;
  const node = (
    <>
      <path d={`M0 0 H${gutter} M${width - gutter} ${exit} H${width}`} />
      <path
        d={
          bend(0, 0, -above) + ` H${width - gutter} ` + bend(width - gutter, -above, exit)
        }
      />
      <Arrow x={width / 2} y={-above} />
      {repeat && (
        <>
          <path
            d={`M${width - gutter} ${exit} q${turn} 0 ${turn} ${turn}
        V${below - turn} q0 ${turn} ${-turn} ${turn} H${gutter}
        q${-turn} 0 ${-turn} ${-turn} V${turn} q0 ${-turn} ${turn} ${-turn}`}
          />
          <Arrow x={width / 2} y={below} back />
        </>
      )}
      <g transform={`translate(${gutter} 0)`}>{body.node}</g>
    </>
  );
  return { width, above, below, exit, node };
}

function layout(expr) {
  switch (expr.type) {
    case "ref":
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

export default function ProductionDiagram({ rule }) {
  const { width, above, below, exit, node } = layout(rule.expression);
  const svgWidth = Math.ceil(width + 64),
    svgHeight = Math.ceil(above + below + 36);
  return (
    <div
      className={styles.viewport}
      role="region"
      aria-label={rule.name + " syntax diagram"}
      tabIndex={0}
    >
      <svg
        className={styles.diagram}
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        role="group"
        aria-label={"Railroad diagram for " + rule.name}
      >
        <title>{rule.name}</title>
        <desc>{rule.source}</desc>
        <g transform={`translate(32 ${above + 18})`}>
          <path d={`M-24 0 H0 M${width} ${exit} h24`} />
          <circle cx={-24} cy={0} r={3.5} />
          <Arrow x={-9} />
          {node}
          <circle cx={width + 24} cy={exit} r={5} className={styles.end} />
          <circle cx={width + 24} cy={exit} r={2} />
        </g>
      </svg>
    </div>
  );
}
