import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import CodeBlock from "@theme/CodeBlock";

export default function AnimationExample({
  name,
  width,
  height,
  alt,
  backgroundColor,
  open = false,
}) {
  const source = require(`@site/static/bespoke-d2/animate-${name}.d2`);
  const image = useBaseUrl(`/img/generated/animate-${name}.svg`);

  return (
    <>
      <img
        src={image}
        alt={alt}
        width={width}
        height={height}
        style={{ height: "auto", backgroundColor }}
        loading="lazy"
      />
      <details open={open}>
        <summary>View D2 source</summary>
        <CodeBlock className="language-d2" hidePlaygroundLink>
          {source}
        </CodeBlock>
      </details>
    </>
  );
}
