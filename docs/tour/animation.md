import AnimationExample from '@site/src/components/AnimationExample';
import CodeBlock from '@theme/CodeBlock';
import CacheStampede from '@site/static/bespoke-d2/cache-stampede.d2';
import Recovery from '@site/static/bespoke-d2/animation-recovery.d2';
import Battery from '@site/static/bespoke-d2/animation-battery.d2';

# Animation

Set `animate-interval` to play [boards](./composition.md) in a loop. Add
`animate-duration` to animate changes between steps. Both settings go in
`vars.d2-config`.

<img
  src="/img/generated/cache-stampede.svg"
  alt="Pulses travel along connections as grid cells appear and disappear."
  width="1018"
  height="459"
  style={{height: 'auto'}}
/>

<a href="/img/generated/cache-stampede.svg">Open the animation</a>
{' · '}
<a href="/bespoke-d2/cache-stampede.d2" download="cache-stampede.d2">Download the D2 source</a>

<details>
<summary>View D2 source</summary>

<CodeBlock className="language-d2" hidePlaygroundLink>{CacheStampede}</CodeBlock>

</details>

## Play layers, scenarios, and steps

D2 plays each board, then its [layers](./layers.md), [scenarios](./scenarios.md),
and [steps](./steps.md), in that order. Layers and scenarios switch immediately.
The first step animates from its parent board. Later steps animate from the
previous step.

```d2-incomplete
vars: {
  d2-config: {
    animate-interval: 1s
    animate-duration: 400ms
  }
}
```

With these settings, a step animates for 400 ms and holds its final state for
600 ms. A transition longer than the interval extends the step. The default
duration is zero. Step transitions are available on D2's [development branch](https://github.com/d2lang/d2/tree/master).

<img src="/img/generated/animation-recovery.svg" alt="A scenario switches instantly. A nested step changes the count and fill together." width="231" height="266" style={{height: 'auto'}} loading="lazy" />

<details>
<summary>View D2 source</summary>

<CodeBlock className="language-d2" hidePlaygroundLink>{Recovery}</CodeBlock>

</details>

Export to SVG or GIF. Use `--animate-interval` or `--animate-duration` to
override the diagram's settings in milliseconds.

```sh
d2 input.d2 output.svg
d2 --animate-duration=300 input.d2 output.gif
```

## Animate styles

Set a property on an object or in a [class](./classes.md), then give it a new
value in a step. Several properties can change together.

### Opacity

Change `style.opacity` on a shape or connection. Use `0` for invisible and
`1` for fully visible.

<AnimationExample name="opacity" width={258} height={271} alt="A shape and its connection fade together." open />

### Fill

Change `style.fill` to blend two colors. Solid colors can be opaque named
colors or three- or six-digit hex values. A solid fill switches to `transparent`
immediately. To fade a shape, animate its [opacity](#opacity).

<AnimationExample name="fill" width={242} height={195} alt="A shape changes from amber to green before its label changes." />

Set `style.fill` at the board level to animate the background.

<AnimationExample name="background" width={268} height={78} alt="The board background changes from green to amber." />

### Stroke

Change `style.stroke` on a shape to recolor its outline. On a connection,
set `(a -> b)[0].style.stroke` to recolor the first edge from `a` to `b`.

<AnimationExample name="stroke" width={318} height={271} alt="Two connections exchange stroke colors." />

### Font color

Change `style.font-color` to blend between two label colors.

<AnimationExample name="font-color" width={312} height={122} alt="One label changes from gray to red." />

### Stroke width

Change `style.stroke-width` to thicken or thin a line.

<AnimationExample name="stroke-width" width={336} height={250} alt="One connection thickens as the other thins." />

### Stroke dash

Change `style.stroke-dash` to adjust the dash pattern. A value of `0` makes
the line solid.

<AnimationExample name="stroke-dash" width={362} height={250} alt="A dashed connection becomes solid." />

### Border radius

Increase `style.border-radius` to round the corners of a rectangle. Decrease
it to sharpen them.

<AnimationExample name="border-radius" width={156} height={278} alt="A circle becomes a rounded square as its corner radius decreases." />

### Font size

Change `style.font-size` to grow or shrink a label.

<AnimationExample name="font-size" width={288} height={163} alt="A numeric label grows while a second label stays the same size." />

### Width

Change `width` to resize a shape horizontally.

<AnimationExample name="width" width={238} height={158} alt="A horizontal bar doubles in width." />

### Height

Change `height` to resize a shape vertically. For a square or circle, change
both dimensions together if both are set.

<AnimationExample name="height" width={144} height={480} alt="A queue grows taller as its label counts up." />

## Change a gradient

D2 pairs gradient stops in order and blends their colors and positions. Use
the same gradient kind and number of stops at both ends. For a linear
gradient, keep the same direction. Other gradient changes take effect
immediately.

### Fill a progress bar

Put two colors at the same percentage to make a sharp edge. Move both
stops together to advance the fill.

<AnimationExample name="linear-gradient" width={359} height={103} alt="A sharp color boundary advances across a bar." />

### Fade one end of a fill

Change one gradient stop to `transparent` and keep the other stops opaque.

<AnimationExample name="gradient-opacity" width={272} height={179} alt="One edge of a fill fades to reveal the color underneath." />

### Expand a radial gradient

Increase the stop percentages in a radial gradient to move the colors outward.

<AnimationExample name="radial-gradient" width={228} height={268} alt="A circular color boundary expands from the center." />

### Rotate a gradient

Use a numeric variable for the angle, such as `${angle}deg`. Change the
variable in a step to rotate the gradient.

<AnimationExample name="gradient-angle" width={266} height={260} alt="The boundary between two colors rotates by 90 degrees." />

### Send a pulse along a connection

Set `style.stroke` to a linear gradient with a narrow band of color. Move both
ends of the band toward the arrowhead. Stop positions below `0%` and above
`100%` let the pulse enter and leave the connection.

<AnimationExample name="request-pulse" width={395} height={226} alt="A narrow band of color travels along a connection and through its arrowhead." />

## Animate with variables

Give a [variable](./vars.md) a starting value, use it in a label or style,
then change it in a step. D2 fills in the values between the two endpoints
wherever the variable is used.

<CodeBlock className="language-d2" hidePlaygroundLink>{Battery}</CodeBlock>

<img src="/img/generated/animation-battery.svg" alt="A percentage label counts down as the filled portion of a bar shrinks." width="248" height="269" style={{height: 'auto'}} loading="lazy" />

Use two numbers, two percentages, two colors, or two [compatible gradients](#change-a-gradient).
New variables, unit changes, and ordinary text changes take effect immediately.
To change a label after a transition finishes, set it in the next step.
Static exports show each step's final values.

### Count in a label

Put a numeric variable in a label, such as `Records behind: ${lag}`. Integer
endpoints produce whole numbers. Use decimal endpoints like `12.0` and `0.0`
to display tenths.

<AnimationExample name="counter" width={204} height={282} alt="A label counts down in whole numbers." />

### Share a color

Use the same color variable on several objects. Changing it once animates
them together.

<AnimationExample name="shared-color" width={359} height={266} alt="Two shapes change from red to green together." />

### Move a pinned shape

With [TALA](./positions.md#top-and-left), bind `left` or `top` to a numeric
variable and change the variable in a step. Setting the coordinate directly
in the step moves the shape immediately.

<AnimationExample name="position" width={310} height={113} alt="A pinned shape slides horizontally between two positions." />

## Grid animations

Edit a [grid](./grid-diagrams.md) in a step with a positive `animate-duration`.
D2 matches cells by their full IDs. Cells that keep their IDs slide to their
new positions, and their connections follow. New cells grow into view.
Removed cells shrink away.

### Reorder cells

A grid fills in [declaration order](./grid-diagrams.md#dominant-direction).
To move a cell later in that order, remove it with `null` and redeclare the
same ID in the same step.

<AnimationExample name="grid-restore" width={477} height={150} alt="Grid cells slide into new slots as one cell leaves and two enter." />

### Add or remove a row or column

Insert or remove a complete row or column in a filled grid. Keep the other
cells in the same relative order. The row or column grows or shrinks as a group.

<AnimationExample name="grid-ci" width={569} height={220} alt="A column opens between two existing columns. A second column shrinks away." />

### Replace a cell in place

In a grid with at least two cells, replace one plain rectangle with a new ID
in the same slot. Keep its size and style, and leave its neighbors in place.
Use centered, single-line labels. The label rolls inside the outline.
Equal-length monospace labels can keep a shared prefix in place.

<AnimationExample name="grid-consumers" width={754} height={284} alt="The end of a label rolls to a new value inside a fixed cell." />

### Expand or collapse a cell

Keep a rectangular cell's ID and give it a larger nested grid. Each child
appears when it fits. To collapse the cell, remove its children and restore
its original dimensions.

<AnimationExample name="grid-mirror" width={420} height={255} alt="A cell expands to reveal a nested grid, then folds closed." />

## Animate a single board

Set `style.animated: true` for continuous motion on a single board.

### Float a shape

Apply `style.animated` to a shape to make it rise and settle above its shadow.

<AnimationExample name="floating-shape" width={210} height={282} alt="A shape rises and settles above its shadow." open />

### Flow along a connection

Apply `style.animated` to a connection to make dashes flow along it.

<AnimationExample name="flowing-connection" width={355} height={323} alt="Dashes flow along one connection while a second connection stays still." open />
