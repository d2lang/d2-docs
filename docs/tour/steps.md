import CodeBlock from '@theme/CodeBlock';
import Chicken from '@site/static/bespoke-d2/chicken.d2';

# Steps

Use steps to show a diagram at successive moments. Each step inherits from the
one before it. The first step inherits from its parent board.

## How steps inherit objects

In Step 3 below, “Approach road” still exists because Step 2 inherited it
from Step 1. Only the changes need to be written in each step.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/chicken.svg2')}}></div>

<CodeBlock className="language-d2-incomplete">
    {Chicken}
</CodeBlock>

To animate a change between steps, see [Animation](./animation.md).
