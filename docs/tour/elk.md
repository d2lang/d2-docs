import ElkOptionExample from '@site/src/components/ElkOptionExample';

# ELK

**[🔗 Gallery](/examples/elk)**

ELK is a mature layout engine, actively maintained by an academic research group at
[Christian Albrechts University in
Kiel](https://www.rtsys.informatik.uni-kiel.de/en/team).

## Reference

[https://www.eclipse.org/elk/reference.html](https://www.eclipse.org/elk/reference.html)

## Layered layout options

Set `layout-engine` to `elk` to use ELK's default layered layout. Put diagram-wide
options in the `data` map inside `d2-config`. You can also pass these options on the
command line by adding `--` to the key. A value in the diagram takes precedence over
the flag. These option values are case-insensitive. Run `d2 layout elk` to see the
flags your installed version supports.
Set `elk-layer-constraint` directly on the shape you want to position.

Each comparison changes one option and shows the diagrams at the same scale.

| Option | Default | What it controls |
| --- | --- | --- |
| [`elk-mergeEdges`](#merge-connections) | `false` | Shared entry and exit points. |
| [`elk-edgeRouting`](#choose-how-connections-bend) | `orthogonal` | Right-angle or diagonal segments. |
| [`elk-feedbackEdges`](#route-a-cycle) | `false` | The path an edge takes back through a cycle. |
| [`elk-wrappingStrategy`](#wrap-a-long-pipeline) | `off` | Where a pipeline can wrap onto another row. |
| [`elk-forceNodeModelOrder`](#keep-shapes-in-declaration-order) | `false` | The order of top-level shapes within a layer. |
| [`elk-nodeNode`](#separate-shapes-in-the-same-layer) | `20` | Gap between shapes in the same layer. |
| [`elk-edgeNode`](#move-a-passing-edge-away-from-a-shape) | `40` | Clearance between a shape and an edge passing through its layer. |
| [`elk-edgeEdge`](#separate-edges-in-the-same-layer) | `10` | Gap between edges passing through the same layer. |
| [`elk-nodeNodeBetweenLayers`](#separate-shapes-in-adjacent-layers) | `70` | Gap between shapes in adjacent layers. |
| [`elk-edgeNodeBetweenLayers`](#move-bends-away-from-adjacent-shapes) | `40` | Clearance between a bend and the shapes in adjacent layers. |
| [`elk-edgeEdgeBetweenLayers`](#separate-edges-between-layers) | `50` | Gap between parallel edge segments between layers. |
| [`elk-padding`](#add-space-inside-a-container) | 50 on each side | Space inside a container’s border. |
| [`elk-nodeSelfLoop`](#move-a-self-loop-away-from-its-shape) | `50` | Gap between a shape and its self-loop. |
| [`elk-layer-constraint`](#place-a-shape-in-the-first-or-last-layer) | `none` | The layer assigned to one shape. |

### Routing and order

#### Merge connections

With `elk-mergeEdges` set to `true`, the connections to `Orders`, `Billing` and `Events`
leave `Gateway` at one point and then branch. Incoming connections can also share an
entry point. Connections to specific SQL table columns stay attached to their columns.

<ElkOptionExample
  source={require('@site/static/d2/elk-merge-edges-on.d2')}
  variants={[
    {
      file: "merge-edges-off",
      label: "false (default)",
      alt: "Three arrows leave Gateway at three different points.",
    },
    {
      file: "merge-edges-on",
      label: "true",
      alt: "Three arrows leave Gateway at one point and branch toward Orders, Billing and Events.",
    },
  ]}
/>

To enable merging for a single render, leave `elk-mergeEdges` out of the source and run

```shell
d2 --layout=elk --elk-mergeEdges gateway.d2 gateway.svg
```

#### Choose how connections bend

The routes from `Router` to `East` and `West` turn at right angles with
`elk-edgeRouting` set to `orthogonal`. Switch to `polyline` and the two routes run
diagonally. The connection to `Local` is straight in both diagrams.

<ElkOptionExample
  source={require('@site/static/d2/elk-edge-routing-polyline.d2')}
  variants={[
    {
      file: "edge-routing-orthogonal",
      label: "orthogonal (default)",
      alt: "The upper and lower arrows from Router bend twice on the way to East and West.",
    },
    {
      file: "edge-routing-polyline",
      label: "polyline",
      alt: "Straight diagonal arrows fan out from Router to East and West.",
    },
  ]}
/>

#### Route a cycle

Follow the arrow from `Write` back to `Read`. By default it leaves the left side of
`Write`. With `elk-feedbackEdges` enabled, it leaves the right side, goes around the
whole row and enters `Read` from the left.

<ElkOptionExample
  source={require('@site/static/d2/elk-feedback-edges-on.d2')}
  variants={[
    {
      file: "feedback-edges-default",
      label: "false (default)",
      alt: "The return arrow starts on the left of Write and enters the right of Read.",
    },
    {
      file: "feedback-edges-on",
      label: "true",
      alt: "Read, Parse and Write line up. The return arrow loops around the row from its far right to its far left.",
    },
  ]}
/>

#### Wrap a long pipeline

With `elk-wrappingStrategy` set to `off`, the pipeline runs from `Fetch` to `Ship` in
one row. `single_edge` can wrap between layers joined by a single edge. Here it wraps
after `Pack`. `multi_edge` can also wrap where several edges cross between layers.
Here it wraps before `Pack`, where both `Build` and `Test` connect to it.

<ElkOptionExample
  source={require('@site/static/d2/elk-wrapping-multi.d2')}
  variants={[
    {
      file: "wrapping-off",
      label: "off (default)",
      alt: "All six pipeline stages progress left to right, with a shortcut from Build to Pack.",
    },
    {
      file: "wrapping-single",
      label: "single_edge",
      alt: "The top row ends at Pack. Sign and Ship occupy a second row.",
    },
    {
      file: "wrapping-multi",
      label: "multi_edge",
      alt: "The top row ends at Test. Both Test and Build connect to Pack on the second row, followed by Sign and Ship.",
    },
  ]}
/>

#### Keep shapes in declaration order

The source declares `One` before `Two`. By default, ELK puts `Two` above `One` to
avoid a crossing. Set `elk-forceNodeModelOrder` to `true` to keep the declared order
within each layer of top-level shapes. The lines from `Alpha` and `Beta` now cross.

<ElkOptionExample
  source={require('@site/static/d2/elk-declaration-order-forced.d2')}
  variants={[
    {
      file: "declaration-order-default",
      label: "false (default)",
      alt: "Two sits above One, so the lines from Alpha to Two and Beta to One do not cross.",
    },
    {
      file: "declaration-order-forced",
      label: "true",
      alt: "One sits above Two. The two connections cross between the middle columns.",
    },
  ]}
/>

### Spacing and padding

In a left-to-right diagram, shapes in the same layer form a vertical column. Spacing
values are minimum distances in pixels. Labels and routing can require more room.

#### Separate shapes in the same layer

The three destinations of `Queue` share a column. Increasing `elk-nodeNode` from
`20` to `100` increases the vertical gap between neighboring boxes from 20 to 100 pixels.

<ElkOptionExample
  source={require('@site/static/d2/elk-node-spacing-wide.d2')}
  variants={[
    {
      file: "node-spacing-default",
      label: "20 px (default)",
      alt: "Fast, Normal and Batch are stacked with 20 pixels between boxes.",
    },
    {
      file: "node-spacing-wide",
      label: "100 px",
      alt: "The same three boxes are stacked with 100 pixels between them.",
    },
  ]}
/>

#### Move a passing edge away from a shape

The direct edge from `Start` to `Ship` bypasses `Check` and `Pack`. Increasing
`elk-edgeNode` moves that route farther below the two boxes.

<ElkOptionExample
  source={require('@site/static/d2/elk-edge-node-spacing-wide.d2')}
  variants={[
    {
      file: "edge-node-spacing-default",
      label: "40 px (default)",
      alt: "The direct route from Start to Ship passes 40 pixels below Check and Pack.",
    },
    {
      file: "edge-node-spacing-wide",
      label: "100 px",
      alt: "The same route passes 100 pixels below Check and Pack.",
    },
  ]}
/>

#### Separate edges in the same layer

Two edges run directly from `Input` to `Save`, passing under `Check`. With
`elk-edgeEdge` set to `80`, the lower edge bends away so the two routes have more space
between them as they pass through the middle layer.

<ElkOptionExample
  source={require('@site/static/d2/elk-edge-spacing-wide.d2')}
  variants={[
    {
      file: "edge-spacing-default",
      label: "10 px (default)",
      alt: "Two straight parallel arrows pass below Check, from Input to Save.",
    },
    {
      file: "edge-spacing-wide",
      label: "80 px",
      alt: "The upper arrow stays straight. The lower arrow bends farther down beneath Check.",
    },
  ]}
/>

#### Separate shapes in adjacent layers

Each stage in `Read -> Build -> Ship` occupies its own layer. Increasing
`elk-nodeNodeBetweenLayers` from `70` to `180` adds 110 pixels between each pair of
boxes along the direction of the pipeline.

<ElkOptionExample
  source={require('@site/static/d2/elk-layer-node-spacing-wide.d2')}
  variants={[
    {
      file: "layer-node-spacing-default",
      label: "70 px (default)",
      alt: "Read, Build and Ship sit in a row with 70 pixels between consecutive boxes.",
    },
    {
      file: "layer-node-spacing-wide",
      label: "180 px",
      alt: "The same boxes are 180 pixels apart and the two arrows are longer.",
    },
  ]}
/>

#### Move bends away from adjacent shapes

The two edges turn between the source column and `Store`. Increasing
`elk-edgeNodeBetweenLayers` gives those vertical segments more space on both sides.
`Store` moves farther right to make room.

<ElkOptionExample
  source={require('@site/static/d2/elk-layer-edge-node-spacing-wide.d2')}
  variants={[
    {
      file: "layer-edge-node-spacing-default",
      label: "40 px (default)",
      alt: "The arrows from Queue and Batch bend in the gap before Store.",
    },
    {
      file: "layer-edge-node-spacing-wide",
      label: "100 px",
      alt: "The bends sit farther from both the source boxes and Store.",
    },
  ]}
/>

#### Separate edges between layers

Each of `API`, `Web` and `Job` connects to both destinations. Increasing
`elk-edgeEdgeBetweenLayers` spreads out the vertical segments in the gap before
`East` and `West`.

<ElkOptionExample
  source={require('@site/static/d2/elk-layer-edge-spacing-wide.d2')}
  variants={[
    {
      file: "layer-edge-spacing-default",
      label: "50 px (default)",
      alt: "The six arrows turn along closely spaced vertical lines between the two columns.",
    },
    {
      file: "layer-edge-spacing-wide",
      label: "125 px",
      alt: "The vertical parts of the arrows are spaced farther apart, widening the gap between columns.",
    },
  ]}
/>

#### Add space inside a container

Set the four sides of `elk-padding` with a string. Changing `left` and `right` from
`50` to `110` adds 60 pixels at each end of `Read -> Write`, making the `Worker` container
120 pixels wider.

<ElkOptionExample
  source={require('@site/static/d2/elk-container-padding-wide.d2')}
  variants={[
    {
      file: "container-padding-default",
      label: "50 px on each side (default)",
      alt: "The Worker container has 50 pixels of space around Read and Write.",
    },
    {
      file: "container-padding-wide",
      label: "110 px left and right",
      alt: "The left and right margins inside Worker grow to 110 pixels. The top and bottom margins are still 50 pixels.",
    },
  ]}
/>

#### Move a self-loop away from its shape

The `retry` edge leaves `Worker` and returns to it. Increase `elk-nodeSelfLoop` from
`50` to `120` to move the top of the loop and its label farther above the box.

<ElkOptionExample
  source={require('@site/static/d2/elk-self-loop-spacing-wide.d2')}
  variants={[
    {
      file: "self-loop-spacing-default",
      label: "50 px (default)",
      alt: "A short loop labeled retry sits immediately above Worker.",
    },
    {
      file: "self-loop-spacing-wide",
      label: "120 px",
      alt: "The retry loop rises 70 pixels farther above Worker.",
    },
  ]}
/>

### Shape placement

#### Place a shape in the first or last layer

Set `elk-layer-constraint` on the shape itself. With `none`, the default, ELK places
`Audit` alongside `Build`. With `direction: right`, `first` puts `Audit` in the
leftmost layer, so the arrow from `Start` points back to it. `last` moves `Audit`
into the rightmost layer alongside `Ship`.

<ElkOptionExample
  source={require('@site/static/d2/elk-last-layer.d2')}
  variants={[
    {
      file: "audit-layer-none",
      label: "none (default)",
      alt: "Audit sits in the second column alongside Build, one step to the right of Start.",
    },
    {
      file: "audit-layer-first",
      label: "first",
      alt: "Audit sits to the left of Start, with the arrow from Start pointing left to Audit.",
    },
    {
      file: "last-layer",
      label: "last",
      alt: "Audit sits below Ship in the rightmost column, with a long arrow from Start.",
    },
  ]}
/>

## Algorithms

ELK has several layout algorithms. D2 uses `layered` by default. To choose another one,
pass `--elk-algorithm` along with `--layout=elk`.

The main choices for connected diagrams are:

| Algorithm | Description |
| --- | --- |
| `layered` | The default. Arranges shapes in layers, with orthogonal connections. |
| `force` | Spreads shapes out using simulated attraction and repulsion. |
| `stress` | Places shapes closer together when there are shorter paths between them. |
| `mrtree` | Arranges a tree in levels. |
| `radial` | Arranges a tree in circles around its root. |

For example:

```shell
d2 --layout=elk --elk-algorithm=force input.d2 force.svg
d2 --layout=elk --elk-algorithm=stress input.d2 stress.svg
d2 --layout=elk --elk-algorithm=radial tree.d2 radial.svg
```

`radial` expects a tree. For example, `tree.d2` could contain:

```d2
a -> b
a -> c
c -> d
```

The pros and cons below describe the default `layered` algorithm. Other algorithms have
different routing and feature support.

## Pros

- Clean, orthogonal routes.
- Highly customizable.
- Fast.
- Good at minimizing crossings.
- Natively supports container to container routing, handling these better than dagre.
- Undergoing active improvements with regular releases.
- Routes SQL tables with exact columns.

## Cons

- Strictly hierarchical, like dagre.
- Some routes have unnecessary bends.
- Minimal consideration for symmetry.
