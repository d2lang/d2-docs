import CodeBlock from '@theme/CodeBlock';
import MergeEdges from '@site/static/d2/elk-merge-edges-on.d2';
import LastLayer from '@site/static/d2/elk-last-layer.d2';

# ELK

**[🔗 Gallery](/examples/elk)**

ELK is a mature layout engine, actively maintained by an academic research group at
[Christian Albrechts University in
Kiel](https://www.rtsys.informatik.uni-kiel.de/en/team).

## Reference

[https://www.eclipse.org/elk/reference.html](https://www.eclipse.org/elk/reference.html)

## Layered layout options

Set `layout-engine` to `elk` to use ELK's default layered layout. Put diagram-wide
options in the `data` map inside `d2-config`, as shown below. You can also pass these
options on the command line by adding `--` to the key. When both specify a value, the
value in the diagram takes precedence. Run `d2 layout elk` to see the flags your
installed version supports.

### Merge connections

By default, the three connections from `Gateway` leave at different points. Set
`elk-mergeEdges` to `true` to give them one exit point. Connections entering the same
shape can share an entry point too. Connections to specific SQL table columns stay
attached to their columns.

<CodeBlock className="language-d2" layout="elk">{MergeEdges}</CodeBlock>

<div className="row">
  <div className="col col--6">
    <strong>Default</strong>
    <div className="embedSVG" role="img"
      aria-label="Three connections leave Gateway at three separate points."
      dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/elk-merge-edges-off.svg2')}} />
  </div>
  <div className="col col--6">
    <strong>Merge edges enabled</strong>
    <div className="embedSVG" role="img"
      aria-label="The same three connections leave Gateway at one shared point before branching."
      dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/elk-merge-edges-on.svg2')}} />
  </div>
</div>

To enable merging for a single render, leave `elk-mergeEdges` out of the source and run

```shell
d2 --layout=elk --elk-mergeEdges gateway.d2 gateway.svg
```

### Routing and order

| Key | Default | Effect |
| --- | --- | --- |
| `elk-mergeEdges` | `false` | Let incoming connections share an entry point and outgoing connections share an exit point. |
| `elk-edgeRouting` | `ORTHOGONAL` | `ORTHOGONAL` routes with right-angle turns. `POLYLINE` allows diagonal segments. |
| `elk-feedbackEdges` | `false` | Route edges that point back against the flow around the nodes in a cycle. |
| `elk-wrappingStrategy` | `OFF` | Wrap a long pipeline into shorter runs. `SINGLE_EDGE` can break between layers joined by one edge. `MULTI_EDGE` also permits breaks crossed by several edges. |
| `elk-forceNodeModelOrder` | `false` | Keep top-level shapes in declaration order within each layer, even when that introduces crossings. |

### Spacing and padding

In a left-to-right diagram, shapes in the same layer form a vertical column.
`elk-nodeNode` opens the vertical gaps within a column. `elk-nodeNodeBetweenLayers` opens
the horizontal gap between columns. These distances are minimums in pixels. Labels and
routing can require extra room.

| Key | Default | Space between |
| --- | --- | --- |
| `elk-nodeNode` | `20` | Two nodes in the same layer. |
| `elk-edgeNode` | `40` | A node and an edge passing it within a layer. |
| `elk-edgeEdge` | `10` | Two edges passing through the same layer. |
| `elk-nodeNodeBetweenLayers` | `70` | Nodes in adjacent layers. |
| `elk-edgeNodeBetweenLayers` | `40` | A node and an edge running beside its layer. |
| `elk-edgeEdgeBetweenLayers` | `50` | Parallel edge segments between adjacent layers. |
| `elk-nodeSelfLoop` | `50` | A node and an edge that loops back to it. |
| `elk-padding` | `50` on each side | A container's border and its contents. Set each side with a string such as `"[top=20,left=40,bottom=20,right=40]"`. |

### Place a shape in the first or last layer

Set `elk-layer-constraint` directly on a shape. With `direction: right`, `FIRST` puts
the shape in the leftmost layer and `LAST` puts it in the rightmost layer.
`NONE` lets ELK choose the layer and is the default.
Here, `Audit` has just one incoming edge from `Start`. Giving it `LAST` places it in
the same layer as `Ship`.

<CodeBlock className="language-d2" layout="elk">{LastLayer}</CodeBlock>

<div className="embedSVG" role="img"
  aria-label="Build, Test and Ship form a pipeline from Start. Audit sits in the final column alongside Ship."
  dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/elk-last-layer.svg2')}} />

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
