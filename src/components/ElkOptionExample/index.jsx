import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

export default function ElkOptionExample({ source, variants }) {
  const sourceRoot = useBaseUrl("/d2/");
  const diagrams = variants.map(({ file, ...variant }) => {
    const svg = require(`@site/static/img/generated/elk-${file}.svg2`);
    const viewBox = svg.match(/\bviewBox="([^"]+)"/)[1];
    return { ...variant, file, svg, width: Number(viewBox.split(/\s+/)[2]) };
  });
  const widest = Math.max(...diagrams.map((diagram) => diagram.width));
  // Keep one scale per comparison. A wide diagram can scroll on a narrow screen.
  const minScale = 0.8;

  return (
    <>
      <div
        className={styles.figures}
        style={{ "--panel-width": `${Math.max(220, widest * minScale + 24)}px` }}
      >
        {diagrams.map(({ file, label, alt, svg, width }) => (
          <figure key={file}>
            <figcaption className={styles.caption}>
              <strong>{label}</strong>
              <a href={`${sourceRoot}elk-${file}.d2`} download>
                D2 source
              </a>
            </figcaption>
            <div className={styles.viewport}>
              <div
                className={styles.diagram}
                role="img"
                aria-label={alt}
                style={{
                  width: `clamp(${width * minScale}px, ${
                    (100 * width) / widest
                  }%, ${width}px)`,
                }}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
          </figure>
        ))}
      </div>
      <CodeBlock className="language-d2" layout="elk">
        {source}
      </CodeBlock>
    </>
  );
}
