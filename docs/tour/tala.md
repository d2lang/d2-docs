# TALA

**[🔗 Gallery](/examples/tala)**

A novel layout engine developed by Terrastruct, designed specifically for software
architecture diagrams.

## Pros

- As a general orthogonal layout engine, TALA is not constrained to one type like
  hierarchies or trees or radial. For fundamentally non-hierarchical layouts, TALA can
  produce diagrams like a human would on a whiteboard.
- `top` and `left` can be used to lock positions.
- Considers and prefers symmetry.
- First-class consideration for containers.
- `direction` can be set per-container.
- `near` can be specified to be to another shape.
- `sql_table` connections point to exact row.
- Dynamic label positioning to avoid obstructions.
- Connections for grid cells use TALA's routing engine instead of always straight lines.

## Cons

- Has randomness. A small change to a label can cascade into an
  entirely different layout.
