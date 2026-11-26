import React from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import { grammarFiles } from "./grammar";
import ProductionDiagram from "./ProductionDiagram";
import styles from "./DiagramAtlas.module.css";

const groups = grammarFiles.map(({ name, rules }) => ({
  name: name === "structure.ebnf" ? "Structural" : "Lexical",
  rules,
}));
const count = groups.reduce((sum, group) => sum + group.rules.length, 0);
const notes = {
  nonASCIITagStart: "The character must be a Unicode letter or decimal digit.",
  nonASCIIFenceChar:
    "The character must be neither a Unicode letter nor a decimal digit.",
  blockString: "The first matching fence followed by a pipe closes the block.",
  EdgeIndex: "A numeric index ranges from zero to the largest Go int.",
};

function closeAfterChoosing(event) {
  if (
    event.target.tagName === "A" &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  ) {
    event.currentTarget.open = false;
  }
}

export default function DiagramAtlas() {
  const { collectAnchor } = useBrokenLinks();
  return (
    <div className={styles.atlas}>
      <nav aria-label="Grammar diagram index">
        <details className={styles.index} onClick={closeAfterChoosing}>
          <summary>Browse {count} rules</summary>
          <div className={styles.groups}>
            {groups.map((group) => (
              <div key={group.name}>
                <strong>{group.name}</strong>
                <ul aria-label={group.name + " rules"}>
                  {group.rules.map(({ name }) => (
                    <li key={name}>
                      <a href={"#diagram-" + name}>{name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </nav>
      {groups.map((group) =>
        group.rules.map((rule) => {
          const id = "diagram-" + rule.name;
          collectAnchor(id);
          return (
            <section
              key={id}
              id={id}
              tabIndex={-1}
              aria-labelledby={id + "-name"}
              className={rule.name === "Value" ? styles.defaultPanel : styles.panel}
            >
              <header className={styles.header}>
                <h3 id={id + "-name"}>{rule.name}</h3>
                <div className={styles.links}>
                  <a href={"#rule-" + rule.name}>EBNF</a>
                  <a href={"#" + group.name.toLowerCase() + "-rules"}>
                    {group.name} notes
                  </a>
                </div>
              </header>
              <ProductionDiagram rule={rule} />
              {notes[rule.name] && <p className={styles.note}>{notes[rule.name]}</p>}
            </section>
          );
        })
      )}
    </div>
  );
}
