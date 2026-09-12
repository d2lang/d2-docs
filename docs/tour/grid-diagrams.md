import CodeBlock from '@theme/CodeBlock';
import Grid from '@site/static/d2/grid.d2';
import Grid2 from '@site/static/d2/grid-2.d2';
import Grid3 from '@site/static/d2/grid-3.d2';
import Grid4 from '@site/static/d2/grid-4.d2';
import GridDimensions from '@site/static/d2/grid-dimensions.d2';
import GridFill from '@site/static/d2/grid-fill.d2';
import GridNestedGrid from '@site/static/d2/grid-nested-grid.d2';
import Table from '@site/static/d2/table.d2';
import GridUnaligned from '@site/static/d2/grid-unaligned.d2';
import GridAligned from '@site/static/d2/grid-aligned.d2';
import GridPadding1 from '@site/static/d2/grid-padding-1.d2';
import GridPadding2 from '@site/static/d2/grid-padding-2.d2';
import MdTable from '@site/static/d2/md-table.d2';

# Grid Diagrams

Grid diagrams let you display objects in a structured grid.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid.svg2')}}></div>

<CodeBlock className="language-d2" expandeable={true}>
    {Grid}
</CodeBlock>

Two keywords do all the magic:
- `grid-rows`
- `grid-columns`


Setting just `grid-rows`:

<CodeBlock className="language-d2">
    {Grid2}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-2.svg2')}}></div>

Setting just `grid-columns`:

<CodeBlock className="language-d2">
    {Grid3}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-3.svg2')}}></div>

Setting both `grid-rows` and `grid-columns`:

<CodeBlock className="language-d2">
    {Grid4}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-4.svg2')}}></div>

## Width and height

To create specific constructions, use `width` and/or `height`.

<CodeBlock className="language-d2">
    {GridDimensions}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-dimensions.svg2')}}></div>

Notice how objects are evenly distributed within each row.

## Cells expand to fill

When you define only one of row or column, objects will expand.

<CodeBlock className="language-d2">
    {GridFill}
</CodeBlock>

Notice how `Voters` and `Non-voters` fill the space.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-fill.svg2')}}></div>

## Dominant direction

When you apply both row and column, the first appearance is the dominant direction. The
dominant direction is the order in which cells are filled.

For example:

```d2-incomplete
grid-rows: 4
grid-columns: 2
# bunch of shapes
```

Since `grid-rows` is defined first, objects will fill rows before moving onto columns.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-row-dominant.svg2')}}></div>

But if it were reversed:

```d2-incomplete
grid-columns: 2
grid-rows: 4
# bunch of shapes
```

It would do the opposite.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-column-dominant.svg2')}}></div>

:::info
These animations are also pure D2, so you can animate grid diagrams being built-up. Use
the `animate-interval` flag with this
[code](https://github.com/d2lang/d2-docs/blob/f5c762223ce192338d9d7865df3ca8533d683cdc/static/bespoke-d2/grid-row-dominant.d2#L1).
More on this later, in the [composition](/tour/composition/) section.
:::

## Gap size

You can control the gap size of the grid with 3 keywords:
- `vertical-gap`
- `horizontal-gap`
- `grid-gap`

Setting `grid-gap` is equivalent to setting both `vertical-gap` and `horizontal-gap`.

`vertical-gap` and `horizontal-gap` can override `grid-gap`.

### Gap size 0

`grid-gap: 0` in particular can create some interesting constructions:

#### Like this map of Japan

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/japan.svg2')}}></div>

> [D2 source](https://github.com/d2lang/d2/blob/master/docs/examples/japan-grid/japan.d2)

#### Or a table of data

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/table.svg2')}}></div>

<CodeBlock className="language-d2">
    {Table}
</CodeBlock>

:::info
You may find it easier to just use Markdown tables though, especially if there are
duplicate cells.

<CodeBlock className="language-d2">
    {MdTable}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/md-table.svg2')}}></div>
:::

### Gap size 0

## Connections

Connections for grids themselves work normally as you'd expect.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-connected.svg2')}}></div>

> Source code [here](https://github.com/d2lang/d2-docs/blob/eda2d8739ce21c656e7608be48cb9067df36eb53/static/d2/grid-connected.d2).

### Connections between grid cells

With Dagre and ELK, connections between shapes inside a grid are center-center straight
segments, i.e., no path-finding. With TALA, these connections use TALA's routing engine.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-connections.svg2')}}></div>

> Source code [here](https://github.com/d2lang/d2/blob/master/e2etests/testdata/files/simple_grid_edges.d2).

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-nested-connections.svg2')}}></div>

> Source code [here](https://github.com/d2lang/d2/blob/master/docs/examples/vector-grid/vector-grid.d2).

## Nesting

You can nest grid diagrams, sequence diagrams, and regular diagrams within grids.

<CodeBlock className="language-d2">
    {GridNestedGrid}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-nested-grid.svg2')}}></div>

## Aligning with invisible elements

A common technique to align grid elements to your liking is to pad the grid with invisible
elements.

Consider the following diagram.

<CodeBlock className="language-d2">
    {GridUnaligned}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-unaligned.svg2')}}></div>

It'd be nicer if it were centered. This can be achieved by adding 2 invisible elements.

<CodeBlock className="language-d2">
    {GridAligned}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-aligned.svg2')}}></div>

## Troubleshooting

### Why is there extra padding in one cell?

Elements in a grid column have the same width and elements in a grid row have the same
height.

So in this example, a small empty space in "Backend Node" is present.

<CodeBlock className="language-d2" expandeable={true}>
    {GridPadding1}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-padding-1.svg2')}}></div>

It's due to the label of "Flask Pod" being slightly longer than "Next Pod". So the way we
fix that is to set `width`s to match.

<CodeBlock className="language-d2" expandeable={true}>
    {GridPadding2}
</CodeBlock>

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/grid-padding-2.svg2')}}></div>
