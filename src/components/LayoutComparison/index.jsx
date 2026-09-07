import React, { useId, useRef, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const engines = [
  { id: "tala", label: "TALA" },
  { id: "dagre", label: "Dagre" },
  { id: "elk", label: "ELK" },
];

export default function LayoutComparison({ diagram, title }) {
  const [view, setView] = useState("all");
  const panelId = useId();
  const viewButtons = useRef({});
  const assetRoot = useBaseUrl(`/blog/tala-layouts/${diagram}/`);
  const visibleEngines = engines.filter((engine) => view === "all" || engine.id === view);

  return (
    <div className={styles.comparison}>
      <div className={styles.toolbar}>
        <div className={styles.views} role="group" aria-label={`${title} layout view`}>
          {[{ id: "all", label: "Side by side" }, ...engines].map((option) => (
            <button
              type="button"
              key={option.id}
              ref={(button) => {
                viewButtons.current[option.id] = button;
              }}
              aria-pressed={view === option.id}
              aria-controls={panelId}
              onClick={() => setView(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <a href={`${assetRoot}source.d2`} download={`${diagram}.d2`}>
          D2 source ↓
        </a>
      </div>

      <div
        id={panelId}
        className={view === "all" ? styles.grid : styles.single}
        role="region"
        aria-label={`${title}: ${
          view === "all" ? "all three layouts" : view.toUpperCase()
        }`}
      >
        {visibleEngines.map((engine) => (
          <figure key={engine.id} className={styles.figure}>
            <figcaption className={styles.caption}>
              <strong>{engine.label}</strong>
              <a
                href={`${assetRoot}${engine.id}.svg`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${title}, ${engine.label} SVG in a new tab`}
              >
                Open SVG ↗
              </a>
            </figcaption>
            {view === "all" ? (
              <button
                type="button"
                className={styles.preview}
                aria-label={`Enlarge ${engine.label} layout of ${title}`}
                onClick={() => {
                  setView(engine.id);
                  viewButtons.current[engine.id]?.focus();
                }}
              >
                <img
                  src={`${assetRoot}${engine.id}.svg`}
                  alt={`${title} rendered with ${engine.label}`}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ) : (
              <a
                className={styles.detail}
                href={`${assetRoot}${engine.id}.svg`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open full-size ${engine.label} layout of ${title} in a new tab`}
              >
                <img
                  src={`${assetRoot}${engine.id}.svg`}
                  alt={`${title} rendered with ${engine.label}`}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            )}
          </figure>
        ))}
      </div>
      <p className={styles.hint}>
        {view === "all"
          ? "Select a diagram to enlarge it. Each layout is scaled to fit its panel."
          : "Select another layout above to compare, or open the SVG for a closer look."}
      </p>
    </div>
  );
}
