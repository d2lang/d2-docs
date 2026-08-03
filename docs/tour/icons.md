---
sidebar_label: Icons & Images
---
import CodeBlock from '@theme/CodeBlock';
import Icons1 from '@site/static/d2/icons-1.d2';
import IconPlacement from '@site/static/d2/icon-placement.d2';
import IconsImage from '@site/static/d2/icons-image.d2';

# Icons

:::tip
We host a collection of icons commonly found in software architecture diagrams for free to
help you get started: [https://icons.d2lang.com](https://icons.d2lang.com).
:::

Icons and images are an essential part of production-ready diagrams.

You can use any URL as value.

<CodeBlock className="language-d2">
    {Icons1}
</CodeBlock>

<div style={{width: "200px", margin: "0 auto 20px auto"}} className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/icons-1.svg2')}}></div>

:::info
Using the D2 CLI locally? You can specify local images like `icon: ./my_cat.png`.
:::

Icon placement is automatic. Considerations vary depending on layout engine, but things
like coexistence with a label and whether it's a container generally affect where the icon
is placed to not obstruct. Notice how the following diagram has container icons in the
top-left and non-container icons in the center.

<CodeBlock className="language-d2">
    {IconPlacement}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/icon-placement.svg2')}}></div>

:::info
Icons can be positioned with the `near` keyword [introduced later](/tour/positions/#label-and-icon-positioning).
:::

## Add `shape: image` for standalone icon shapes

<CodeBlock className="language-d2">
    {IconsImage}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/icons-image.svg2')}}></div>
