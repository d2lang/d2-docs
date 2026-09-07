# MULE / Utility Rover

Four motor corners preserve a recognizable rover footprint while navigation, power, safety, and fleet operations remain free to move.

Pinned (4 nodes): The four motor assemblies are fixed at the front and rear corners of the chassis rectangle.

Automatic (11 nodes): TALA places every controller, sensor, power and safety node between or around those corners and arranges the unpositioned fleet container.

Every container is also automatic. `layout-audit.json` records the compiled graph checks: only the stated nodes have coordinates, their relative offsets are preserved, and there are no leaf bounding-box overlaps.

The full diagram is `source.d2`. `positions.d2` is an excerpt showing only its numeric positioning declarations. All icons are original vector artwork and use local paths; the rendered SVG embeds them.

```sh
d2 --layout tala --tala-seeds 1,2,3 --theme 0 --pad 40 --scale 1 source.d2 tala.svg
```
