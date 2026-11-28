import AnimationExample from '@site/src/components/AnimationExample';
import CodeBlock from '@theme/CodeBlock';
import CacheStampede from '@site/static/bespoke-d2/cache-stampede.d2';
import Battery from '@site/static/bespoke-d2/animation-battery.d2';
import NightSignal from '@site/static/bespoke-d2/night-signal.d2';

# Animation

:::warning
Animation is in alpha and may change. If you have feedback, [open a GitHub issue](https://github.com/d2lang/d2/issues/new).
:::

Use [`style.animated`](./style.md#animated) to animate a shape or connection on a single board.
To show a sequence, use `animate-interval` to play [boards](./composition.md) in order.
Set `animate-duration` to control how long a transition takes. [Steps](./steps.md)
can animate styles, variables, and grids. Pencil shading and text decorations
also animate between consecutive [layers](./layers.md) and [scenarios](./scenarios.md).
The default duration is `0`, so boards change instantly.

This example is an animated SVG you can embed in a GitHub README.

<img
  src="/img/generated/cache-stampede.svg"
  alt="Pulses travel along connections as grid cells appear and disappear."
  width="1018"
  height="472"
  style={{height: 'auto'}}
/>

<details>
<summary>View D2 source</summary>

<CodeBlock className="language-d2" hidePlaygroundLink>{CacheStampede}</CodeBlock>

</details>

To point at things and caption each step, see [annotations](./annotations.md).

To share an animation as a video, see [WebM export](./exports.md#webm) or [MP4 export](./exports.md#mp4).

## Configuration

```d2-incomplete
vars: {
  d2-config: {
    animate-interval: 1s
    animate-duration: 400ms
  }
}
```

The 1-second interval includes the transition. Each animated step spends 400 ms
changing and holds its final state for the remaining 600 ms.

The CLI accepts durations in milliseconds.

```sh
d2 input.d2 output.svg
d2 --animate-duration=300 input.d2 output.gif
```

### Playback progress

On D2's development branch, setting a positive `animate-interval` in the source or on
the CLI shows a thin line along the bottom of an animated SVG, GIF, MP4, or WebM. It fills
from left to right over the whole animation, including the time each board is held.
At export size, the line is about 1% of the shorter side, from 2 to 6 pixels.
The line sits at least 8 pixels below the diagram’s usual padding.

<AnimationExample name="playback-progress" width={622} height={94} alt="A progress line fills as a backup is queued, files are copied, and the archive is verified." />

The line uses the theme's B1 color, the usual stroke color for shapes and arrows.
Set `vars.d2-config.animate-progress-color: "#E35B42"` to use your own color, or
`vars.d2-config.animate-progress: false` to hide the line. The equivalent CLI flags
are `--animate-progress-color="#E35B42"` and `--animate-progress=false`.

If a GIF, MP4, or WebM uses its built-in one-second interval, pass `--animate-progress`
to show the line.

## Animate styles

The following properties animate when their values change in a step.

### Opacity

<AnimationExample name="opacity" width={258} height={282} alt="A shape and its connection fade together." open />

### Fill

<AnimationExample name="fill" width={242} height={205} alt="A shape changes from amber to green before its label changes." />

Set `style.fill` on the board to animate its background color.

<AnimationExample name="background" width={268} height={88} alt="The board background changes from green to amber." />

### Pencil shading

In sketch mode, changing a shape’s solid fill shades it in with pencil strokes.
Changing the fill to `transparent` erases it.

<AnimationExample name="sketch-shading" width={470} height={160} alt="A standby volume’s block ranges are shaded in as they are restored from a snapshot." />

### Stroke

Set `style.stroke` to animate the outline of a shape or the color of a connection.

<AnimationExample name="stroke" width={318} height={282} alt="Two connections exchange stroke colors." />

### Font color

<AnimationExample name="font-color" width={312} height={132} alt="One label changes from gray to red." />

### Text decorations

Keep the same object ID and label text. Set `style.underline` on a shape or
connection to draw an underline, or wrap a Markdown span in `~~` to draw a
strikethrough. Removing the decoration retracts the line. Both work in regular
and sketch mode.

<AnimationExample name="decorations" width={469} height={196} alt="The v1 webhook endpoint is crossed out as the v2 endpoint is underlined. Both marks retract on rollback." />

### Stroke width

<AnimationExample name="stroke-width" width={336} height={261} alt="One connection thickens as the other thins." />

### Stroke dash

<AnimationExample name="stroke-dash" width={362} height={261} alt="A dashed connection becomes solid." />

### Border radius

<AnimationExample name="border-radius" width={273} height={144} alt="A square upload stays fixed while its matching profile avatar rounds into a circle." />

### Font size

<AnimationExample name="font-size" width={288} height={173} alt="A numeric label grows while a second label stays the same size." />

### Width

<AnimationExample name="width" width={238} height={168} alt="A horizontal bar doubles in width." />

### Height

<AnimationExample name="height" width={144} height={490} alt="A queue grows taller as its label counts up." />

## Animate connection icons

`icon.style.animated: 3/s` sends three icons per second at the same speed, up
to 64 icons in flight per connection. Set `0/s` to stop sending and let them
arrive.

### One checkout, nine stock reads

One checkout arrives each second. If every stock read times out, Checkout and
Inventory each make three attempts. Turn off retries in Checkout and the
database sees three reads per second.

<AnimationExample name="retry-amplification" width={512} height={353} alt="One checkout per second triggers three inventory calls and nine stock reads. When only Inventory retries, the same checkout triggers one call and three reads." />

### Set the travel time

With `icon.style.animated: 200ms`, one icon crosses the connection in 200
milliseconds, then starts again. Use `true` to loop one icon at the default speed.

<AnimationExample name="icon-travel-time" width={358} height={232} alt="The cache icon makes six trips along its wire for each trip the database icon makes along an equally long wire." open />

### Color and custom icons

Set `icon.shape` to `circle` (the default), `square`, `triangle`, or `diamond`.
Each uses the connection's `style.stroke` color.

<AnimationExample name="build-events" width={544} height={210} alt="Git sends commits as diamonds to a CI runner. The runner sends squares to the image registry and triangles to build alerts." />

To send custom artwork with its own colors, set `icon` to an image.

<AnimationExample name="monitor-events" width={406} height={336} alt="A service monitor sends green heartbeat dots to a status page, blue log squares to a log store, and amber warning triangles to the on-call service." />

To run the example, save <a href="/bespoke-d2/log-square.svg" download="log-square.svg">log-square.svg</a> and
<a href="/bespoke-d2/alert-triangle.svg" download="alert-triangle.svg">alert-triangle.svg</a> beside the D2 file.

## Change a gradient

Animate a gradient by changing its color stops or angle between steps.

### Fill a progress bar

<AnimationExample name="linear-gradient" width={359} height={113} alt="A sharp color boundary advances across a bar." />

### Fade one end of a fill

<AnimationExample name="gradient-opacity" width={308} height={190} alt="Build log entries show through an overlay and fade toward the bottom of the log viewer." />

### Expand a radial gradient

<AnimationExample name="radial-gradient" width={274} height={310} alt="A wider search radius includes a second log embedding while a third stays outside." />

### Rotate a gradient

<AnimationExample name="gradient-angle" width={266} height={104} alt="A highlight travels around a loading ring beside the status “Restoring snapshot”." />

### Send a pulse along a connection

<AnimationExample name="request-pulse" width={395} height={236} alt="A narrow band of color travels along a connection and through its arrowhead." />

## Animate with variables

Use the same [variable](./vars.md) in several places to animate them together.

<CodeBlock className="language-d2" hidePlaygroundLink>{Battery}</CodeBlock>

<img src="/img/generated/animation-battery.svg" alt="A percentage label counts down as the filled portion of a bar shrinks." width="248" height="279" style={{height: 'auto'}} loading="lazy" />

### Count in a label

<AnimationExample name="counter" width={204} height={292} alt="A label counts down in whole numbers." />

### Share a color

<AnimationExample name="shared-color" width={359} height={277} alt="Two shapes change from red to green together." />

### Move a pinned shape

With [TALA](./positions.md#top-and-left), bind `left` or `top` to a numeric
variable and change the variable in a step. Setting the coordinate directly
in the step moves the shape immediately.

<AnimationExample name="position" width={310} height={123} alt="A pinned shape slides horizontally between two positions." />

## Grid animations

When a grid changes, D2 matches cells by ID. Cells that keep their IDs can move
to new slots. New cells grow into place, and removed cells shrink away.

### Reorder cells

A grid fills in [declaration order](./grid-diagrams.md#dominant-direction).
To move a cell later in that order, remove it with `null` and redeclare the
same ID in the same step.

<AnimationExample name="grid-restore" width={477} height={160} alt="Grid cells slide into new slots as one cell leaves and two enter." />

### Add or remove a row or column

Insert or remove a complete row or column in a filled grid. Keep the other
cells in the same relative order. The row or column grows or shrinks as a group.

<AnimationExample name="grid-ci" width={569} height={230} alt="A column opens between two existing columns. A second column shrinks away." />

### Replace a cell in place

In a grid with at least two cells, replace one plain rectangle with a new ID
in the same slot. Keep its size and style, and leave its neighbors in place.
Use centered, single-line labels. The label rolls inside the outline.
Equal-length monospace labels can keep a shared prefix in place.

<AnimationExample name="grid-consumers" width={754} height={295} alt="The end of a label rolls to a new value inside a fixed cell." />

### Expand or collapse a cell

Keep a rectangular cell's ID and give it a larger nested grid. Each child
appears when it fits. To collapse the cell, remove its children and restore
its original dimensions.

<AnimationExample name="grid-mirror" width={420} height={266} alt="A cell expands to reveal a nested grid, then folds closed." />

## Animated steps

You can use [steps](./steps.md) to build up a diagram and walk your audience through a sequence.

<a href="/img/animation/night-signal.svg" aria-label="Open the full-size Night Signal animation">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcSet="/img/animation/night-signal-still.svg" width="1188" height="677" />
    <img src="/img/animation/night-signal.svg" loading="lazy" width="1188" height="691" style={{height: 'auto'}} alt="A telescope detects a signal. The outbox publishes one alert and returns the saved receipt when the publisher retries." />
  </picture>
</a>

<details>
<summary>View base D2 source</summary>

<CodeBlock className="language-d2" hidePlaygroundLink>{NightSignal}</CodeBlock>

</details>
