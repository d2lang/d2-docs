import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

export default function PositioningExample({
  diagram,
  title,
  source,
  width,
  height,
  bundle = false,
  pinnedCount,
  automaticCount,
  pinnedExplanation,
  automaticExplanation,
  pinnedSource,
}) {
  const assetRoot = useBaseUrl(`/blog/tala-layouts/positioning/${diagram}/`);

  return (
    <figure className={styles.example}>
      <div className={styles.toolbar}>
        <span>
          {pinnedCount != null
            ? `TALA · ${pinnedCount} pinned nodes / ${automaticCount} automatic nodes`
            : "TALA · positioned with top / left"}
        </span>
        <div className={styles.links}>
          <a
            href={`${assetRoot}${bundle ? "source.zip" : "source.d2"}`}
            download={`${diagram}.${bundle ? "zip" : "d2"}`}
            aria-label={`Download D2 source${bundle ? " and icons" : ""} for ${title}`}
          >
            {bundle ? "D2 + icons ↓" : "D2 source ↓"}
          </a>
          <a
            href={`${assetRoot}tala.svg`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open full-size ${title} SVG in a new tab`}
          >
            Open SVG ↗
          </a>
        </div>
      </div>
      <a
        className={styles.preview}
        href={`${assetRoot}tala.svg`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Enlarge ${title} in a new tab`}
      >
        <img
          src={`${assetRoot}tala.svg`}
          alt={title}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </a>
      {pinnedExplanation && (
        <div className={styles.placementNotes}>
          <p>
            <strong>Pinned:</strong> {pinnedExplanation}
          </p>
          <p>
            <strong>Automatic:</strong> {automaticExplanation}
          </p>
        </div>
      )}
      {pinnedSource && (
        <details className={styles.source}>
          <summary>See the positioning declarations</summary>
          <CodeBlock className="language-d2" hidePlaygroundLink={true}>
            {pinnedSource}
          </CodeBlock>
        </details>
      )}
      <details className={styles.source}>
        <summary>View D2 source</summary>
        <CodeBlock className="language-d2" hidePlaygroundLink={true}>
          {source}
        </CodeBlock>
      </details>
    </figure>
  );
}
