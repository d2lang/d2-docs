# The Printing Room

Four ink stations hold a physical registration line while prepress, sensors, controls, and finishing find their own places.

Pinned (4 nodes): The four CMYK stations share a fixed top coordinate and equally spaced left coordinates so the print sequence retains its mechanical alignment.

Automatic (10 nodes): TALA positions the feeder, camera, registration controller, dryer, prepress and finishing steps; none has top or left.

Every container is also automatic. `layout-audit.json` records the compiled graph checks: only the stated nodes have coordinates, their relative offsets are preserved, and there are no leaf bounding-box overlaps.

The full diagram is `source.d2`. `positions.d2` is an excerpt showing only its numeric positioning declarations. All icons are original vector artwork and use local paths; the rendered SVG embeds them.

```sh
d2 --layout tala --tala-seeds 1,2,3 --theme 0 --pad 40 --scale 1 source.d2 tala.svg
```
