# ELK

**[🔗 Gallery](/examples/elk)**

ELK is a mature layout engine, actively maintained by an academic research group at
[Christian Albrechts University in
Kiel](https://www.rtsys.informatik.uni-kiel.de/en/team).

## Reference

[https://www.eclipse.org/elk/reference.html](https://www.eclipse.org/elk/reference.html)

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
