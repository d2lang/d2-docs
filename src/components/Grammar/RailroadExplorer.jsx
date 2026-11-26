import React, { useId, useRef, useState } from "react";
import styles from "./RailroadExplorer.module.css";

// A trace lights the route taken by the selected example. Keep all other
// rails visible so readers can still follow the complete production.
function Track({ d, active = true }) {
  return <path className={active ? styles.traced : styles.track} d={d} />;
}

function Arrow({ x, y, back = false, active = true }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${back ? -1 : 1} 1)`}>
      <Track active={active} d="M-3 -3.2 0 0 -3 3.2" />
    </g>
  );
}

function Stops({ left = 17, right = 385, y = 39 }) {
  return (
    <g className={styles.stops}>
      <circle cx={left} cy={y} r="4" />
      <circle className={styles.endStop} cx={right} cy={y} r="5.5" />
      <circle cx={right} cy={y} r="2" />
    </g>
  );
}

function Token({ x, y, width, literal, active = true, children }) {
  const shape = literal ? styles.literal : styles.rule;
  return (
    <g className={`${shape} ${active ? "" : styles.inactive}`}>
      <rect
        x={x - width / 2}
        y={y - 15}
        width={width}
        height="30"
        rx={literal ? 15 : 4}
      />
      <text x={x} y={y} dy="0.35em" textAnchor="middle">
        {children}
      </text>
    </g>
  );
}

function KeyPath({ alternate }) {
  return (
    <>
      <Track d="M17 39H385" />
      <Track
        active={alternate}
        d="M261 39Q281 39 281 59V74Q281 94 261 94H142Q122 94 122 74V59Q122 39 142 39"
      />
      <Arrow x={90} y={39} />
      <Arrow x={322} y={39} />
      <Arrow x={244} y={94} back active={alternate} />
      <Token x={201} y={39} width={102}>
        keyString
      </Token>
      <Token x={201} y={94} width={42} literal active={alternate}>
        .
      </Token>
      <Stops />
    </>
  );
}

// Expand EdgeTargets so an entire chain can be followed in one diagram.
function EdgeChain({ alternate }) {
  return (
    <>
      <Track d="M17 39H385" />
      <Track
        active={alternate}
        d="M344 39Q360 39 360 56V75Q360 94 341 94H265Q246 94 246 75V56Q246 39 263 39"
      />
      <Arrow x={130} y={39} />
      <Arrow x={249} y={39} />
      <Arrow x={266} y={94} back active={alternate} />
      <Token x={76} y={39} width={76}>
        keyPath
      </Token>
      <Token x={188} y={39} width={100}>
        FirstArrow
      </Token>
      <Token x={303} y={39} width={76}>
        keyPath
      </Token>
      <Token x={303} y={94} width={61} active={alternate}>
        Arrow
      </Token>
      <Stops />
    </>
  );
}

function EdgeIndex({ alternate }) {
  return (
    <>
      <Track d="M17 39H56 M346 39H385" />
      <Track d="M56 39H346" active={!alternate} />
      <Track
        d="M56 39Q73 39 73 56V74Q73 91 90 91H312Q329 91 329 74V56Q329 39 346 39"
        active={alternate}
      />
      <Track
        d="M268 91Q283 91 283 106V116Q283 131 268 131H135Q120 131 120 116V106Q120 91 135 91"
        active={alternate}
      />
      <Arrow x={290} y={39} active={!alternate} />
      <Arrow x={302} y={91} active={alternate} />
      <Arrow x={193} y={131} back active={alternate} />
      <Token x={201} y={39} width={42} literal active={!alternate}>
        *
      </Token>
      <Token x={201} y={91} width={120} active={alternate}>
        decimalDigit
      </Token>
      <Stops />
    </>
  );
}

const valueKinds = ["Scalar", "Map", "Array", "Import"];

function Value({ example }) {
  // Trace the chosen path last because the branches share a pair of rails.
  const order = valueKinds
    .map((_, i) => i)
    .filter((i) => i !== example)
    .concat(example);
  return (
    <>
      <Track d="M17 39H75 M327 39H385" />
      {order.map((i) => {
        const y = 39 + i * 42;
        const path =
          i === 0
            ? "M75 39H327"
            : `M75 39Q92 39 92 56V${y - 17}Q92 ${y} 109 ${y}H293Q310 ${y} 310 ${
                y - 17
              }V56Q310 39 327 39`;
        return <Track key={i} d={path} active={example === i} />;
      })}
      {valueKinds.map((kind, i) => (
        <React.Fragment key={kind}>
          <Arrow x={270} y={39 + i * 42} active={i === example} />
          <Token x={201} y={39 + i * 42} width={90} active={i === example}>
            {kind}
          </Token>
        </React.Fragment>
      ))}
      <Stops />
    </>
  );
}

const diagrams = [
  {
    name: "Connections",
    rule: "EdgeChain",
    draw: EdgeChain,
    height: 128,
    description:
      "Read a keyPath, a FirstArrow, and a target keyPath. Loop through Arrow for each additional target. This diagram expands the EdgeTargets rule.",
    examples: [
      ["api -> db", "One arrow connects two objects."],
      ["api -> db -> cache", "The loop adds a second connection."],
    ],
  },
  {
    name: "Key paths",
    rule: "keyPath",
    draw: KeyPath,
    height: 128,
    description:
      "Read a keyString. To add another segment, follow the loop through a literal dot and read another keyString.",
    examples: [
      ["api", "One key segment."],
      ['api."v1.0".logs', "Three segments. The quoted dot stays in the name."],
    ],
  },
  {
    name: "Values",
    rule: "Value",
    draw: Value,
    height: 197,
    description:
      "Select one of four parallel paths. A value can be a scalar, a map, an array, or an import.",
    examples: [
      ["hello", "An unquoted string."],
      ["{ api; db }", "A map with two entries."],
      ["[one; two]", "An array with two values."],
      ["@shared", "Imports shared.d2."],
    ],
  },
  {
    name: "Edge indices",
    rule: "EdgeIndex",
    draw: EdgeIndex,
    height: 154,
    description:
      "Choose a literal asterisk or one decimal digit. After a digit, the loop permits more digits. This diagram covers the index inside the brackets.",
    examples: [
      ["(api -> db)[*]", "Selects every matching connection."],
      ["(api -> db)[12]", "Index 12 selects the thirteenth matching connection."],
    ],
  },
];

export default function RailroadExplorer() {
  const [selection, setSelection] = useState({ tab: 0, example: 1 });
  const tabs = useRef([]);
  const id = useId();
  const { tab, example } = selection;
  const { rule, draw: Diagram, description, height, examples } = diagrams[tab];

  function selectTab(index) {
    setSelection({ tab: index, example: 1 });
  }

  function navigate(event, index) {
    const last = diagrams.length - 1;
    const target = {
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowRight: index === last ? 0 : index + 1,
      Home: 0,
      End: last,
    }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    selectTab(target);
    tabs.current[target].focus();
  }

  return (
    <div className={styles.explorer}>
      <div className={styles.tabs} role="tablist" aria-label="Syntax diagrams">
        {diagrams.map(({ name }, index) => (
          <button
            key={name}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={tab === index}
            tabIndex={tab === index ? 0 : -1}
            onKeyDown={(e) => navigate(e, index)}
            onClick={() => selectTab(index)}
          >
            {name}
          </button>
        ))}
      </div>
      {diagrams.map((item, index) => (
        <div
          key={item.rule}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={tab !== index}
        >
          {tab === index && (
            <>
              <div className={styles.graph}>
                <div className={styles.graphHeader}>
                  <span className={styles.ruleName}>{rule}</span>
                  <a href={`#rule-${rule}`}>
                    View EBNF <span aria-hidden="true">↓</span>
                  </a>
                </div>
                <svg
                  className={styles.drawing}
                  viewBox={`0 0 402 ${height}`}
                  role="img"
                  aria-labelledby={`${id}-title ${id}-desc`}
                >
                  <title id={`${id}-title`}>{rule} railroad diagram</title>
                  <desc id={`${id}-desc`}>{description}</desc>
                  <Diagram alternate={example === 1} example={example} />
                </svg>
                <div className={styles.legend} aria-hidden="true">
                  <span>
                    <i className={styles.ruleKey} />
                    Named rule
                  </span>
                  <span>
                    <i className={styles.literalKey} />
                    Literal
                  </span>
                  <span>
                    <i className={styles.routeKey} />
                    Example route
                  </span>
                </div>
              </div>
              <div className={styles.examples}>
                <div
                  className={styles.exampleChoices}
                  role="group"
                  aria-label="Choose an example to trace"
                >
                  <span className={styles.traceLabel}>Trace an example</span>
                  {examples.map(([code], j) => (
                    <button
                      type="button"
                      key={code}
                      aria-pressed={example === j}
                      onClick={() => setSelection({ tab, example: j })}
                    >
                      {code}
                    </button>
                  ))}
                </div>
                <p aria-live="polite" aria-atomic="true">
                  {examples[example][1]}
                </p>
              </div>
            </>
          )}
        </div>
      ))}
      <p className={styles.footnote}>Diagrams omit optional whitespace.</p>
    </div>
  );
}
