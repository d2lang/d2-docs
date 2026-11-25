import CodeBlock from '@theme/CodeBlock';
import Chicken from '@site/static/bespoke-d2/chicken.d2';

# Steps

Use steps to show a diagram at successive moments.

## How steps inherit objects

The first step inherits from its parent board. Each later step inherits from
the one before it. Write only the changes in each step.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/chicken.svg2')}}></div>

<CodeBlock className="language-d2-incomplete">
    {Chicken}
</CodeBlock>

To animate a change between steps, see [Animated steps](./animation.md#animated-steps).
