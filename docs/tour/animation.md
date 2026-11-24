import AnimationExample from '@site/src/components/AnimationExample';
import CodeBlock from '@theme/CodeBlock';
import CacheStampede from '@site/static/bespoke-d2/cache-stampede.d2';
import Recovery from '@site/static/bespoke-d2/animation-recovery.d2';
import Battery from '@site/static/bespoke-d2/animation-battery.d2';

# Animation

Draw a diagram, add a [board](./composition.md) showing what happens next, and
set `animate-interval`. D2 plays the boards in order as a looping SVG or GIF.
You can mix layers, scenarios, and steps in the same animation. To show a
value changing *during* a step, like a battery draining, set `animate-duration`.

## How 1,200 GETs become one origin read

Six edge caches each receive 200 requests for the same image. Watch Ashburn,
the third row. Its amber request reaches the shield while the others are
still on their way.

<img
  src="/img/generated/cache-stampede.svg"
  alt="Six edge caches send GETs to a shared shield. One GET reaches the origin. The response returns to the shield, then to the edges and their viewers."
  width="1008"
  height="578"
  style={{height: 'auto'}}
/>

<a href="/img/generated/cache-stampede.svg">Open the animation</a>
{' · '}
<a href="/bespoke-d2/cache-stampede.d2" download="cache-stampede.d2">Download the D2 source</a>

The shield starts one origin GET for Ashburn. The other five edges wait for
that same fetch. When the mint response comes back, each edge gets a copy
and serves its 200 viewers. The origin sends 256 KiB and the viewers receive
300 MiB.

<details>
<summary>How do the requests move?</summary>

Look for `origin-get` in the source below. Its connection stroke is a linear
gradient with a narrow amber band. One step moves both ends of that band
together. The next hop's band starts outside its connection, so it comes into
view just as the request arrives. This works on curves that keep moving in
the same direction along the gradient axis.

Each dash on a viewer connection stands for 50 messages. Farther upstream,
one dash is one GET or one response. The opening board lasts 140 ms and one
7.2-second step runs the whole exchange.

<CodeBlock className="language-d2" hidePlaygroundLink>{CacheStampede}</CodeBlock>

</details>

Render the downloaded source with the D2 CLI.

```sh
d2 cache-stampede.d2 cache-stampede.svg
```

Use `cache-stampede.gif` as the output filename to get a GIF.

:::note
`animate-duration` is available on D2's `master` branch for the next release.
:::

## Play layers, scenarios, and steps

Use a scenario to show an API going down and a step inside it to show the
recovery. Set both timing options once in `vars.d2-config`. The interval
gives each board its time on screen. The duration tells D2 how long to
spend changing values in a step. If the change takes longer than the
interval, the step stays on screen until it finishes.

<CodeBlock className="language-d2" hidePlaygroundLink>{Recovery}</CodeBlock>

<img src="/img/generated/animation-recovery.svg" alt="The blue API turns red at the incident, then fades through purple back to blue as it recovers." width="138" height="79" style={{height: 'auto'}} loading="lazy" />

The API is blue for one second. When the scenario appears, the API turns red
and stays red for one second. Watch the recovery. The step takes 400 ms to
blend back to blue and holds blue for the remaining 600 ms.

Layers and scenarios switch as whole boards. A step animates from its parent
board if it's the first step, or from the previous step otherwise. This also
works for steps inside a layer or scenario.

## Animate a value between steps

Give a [variable](./vars.md) a starting value, then change it in a step.
This battery uses the same `${charge}` for its label and for the point where
the green fill ends. Change `charge` once and both update together.

<CodeBlock className="language-d2" hidePlaygroundLink>{Battery}</CodeBlock>

<img src="/img/generated/animation-battery.svg" alt="A battery drains from 65% to empty. The percentage on the label drops as the green fill recedes." width="318" height="82" style={{height: 'auto'}} loading="lazy" />

The battery starts at 65% for 800 ms. The drain takes the full four seconds
even though the interval is shorter. Try changing `animate-duration` to
`300ms`. The battery now drains in 300 ms and stays empty for 500 ms.

D2 can fill in values between two numbers, percentages, colors, or compatible
gradients. If a step introduces a variable or changes ordinary text, its new
value appears immediately. Static exports show the final value of each step.

The default duration is zero. You can override it on the CLI with
`--animate-duration=300` (milliseconds).

## Animate styles

To fade a worker when it goes on standby, give it a starting opacity and
change that opacity in a step. The same pattern works for the other
properties below. The starting value can also come from a [class](./classes.md).

### Opacity

A worker on standby can fade into the background. Set `Worker.style.opacity`
to `1` for a fully opaque worker, then to `0.3` in the next step. Its label,
fill, and outline fade together.
Use `0` to make it disappear completely.

<AnimationExample name="opacity" width={116} height={84} alt="A worker fades until its box and label are barely visible." open />

### Fill

Change `Cache.style.fill` from `lightblue` to `peachpuff` to show a cache
warming up. D2 blends opaque named colors and three- or six-digit hex colors.
A change to the solid color `transparent` takes effect immediately. Use
[opacity](#opacity) for a gradual fade.

<AnimationExample name="fill" width={106} height={84} alt="A cache changes from light blue to peach." />

You can change the background of the whole board, too. Set `style.fill` at
the top level and change it in a step. Here the canvas darkens behind the
client and its worker.

<AnimationExample name="background" width={303} height={84} alt="The background changes from pale blue to steel blue behind two connected boxes." />

### Stroke

Change `style.stroke` on a shape for its outline, or on a connection for
its line. Here `(Client -> API)[0].style.stroke` changes the existing
connection from teal to purple. The `[0]` selects the first connection
between those two shapes.

<AnimationExample name="stroke" width={274} height={84} alt="The arrow from Client to API changes from teal to purple." />

### Font color

Change `status.style.font-color` from `navy` to `firebrick` to draw
attention to a job's status.

<AnimationExample name="font-color" width={88} height={39} alt="The words “Job status” change from dark blue to brick red." />

### Stroke width

Set `Worker.style.stroke-width` to `2`, then `8`. The outline gets thicker
while the label keeps its size.

<AnimationExample name="stroke-width" width={122} height={90} alt="The worker's outline thickens from 2 to 8 pixels." />

### Stroke dash

Increase `style.stroke-dash` from `1` to `7` on the API connection. Both
the dashes and the gaps grow. To make dashes travel along an arrow, see
[flow along a connection](#flow-along-a-connection).

<AnimationExample name="stroke-dash" width={275} height={84} alt="Short dashes on the arrow from API to Cache lengthen and spread apart." />

### Border radius

Change `Cache.style.border-radius` from `0` to `24` to round the cache's
square corners.

<AnimationExample name="border-radius" width={106} height={84} alt="The square corners of a cache box become rounded." />

### Font size

Change `Alert.style.font-size` from `16` to `32`. Give the box a fixed
width and height if you want just the text to grow.

<AnimationExample name="font-size" width={178} height={88} alt="The word “Alert” doubles in size inside the same box." />

### Width

Change `Queue.width` from `100` to `240`. The queue gets wider while its
height stays at `48`.

<AnimationExample name="width" width={258} height={66} alt="A queue stretches horizontally while keeping the same height." />

### Height

Change `Queue.height` from `48` to `96` to make the same queue grow
vertically. For a circle or square with both dimensions set, change them
together so they stay equal.

<AnimationExample name="height" width={138} height={114} alt="A queue grows to twice its height while keeping the same width." />

## Change a gradient

Use a gradient when you want some parts of a shape or connection to change color
before others. You can change a whole gradient in a step, or use a variable
to control just one part of it.

### Fill a progress bar

Give two color stops the same percentage to get a sharp boundary. Here the
boundary moves from 25% to 75%. The filled portion also changes from green
to salmon. Halfway through the step, the bar is half full.

<AnimationExample name="linear-gradient" width={218} height={79} alt="A buffer fills from one quarter to three quarters as its colored portion changes from green to salmon." />

D2 pairs the stops in order and blends each stop's color and position.
When replacing a whole gradient, keep the
same kind (linear or radial), the same number of stops, and, for a linear
gradient, the same direction. Otherwise the new gradient appears immediately.

### Fade one end of a fill

To keep the label readable, change the transparency of a gradient stop.
Here both stops start at `lightskyblue`, so the cache has an even fill.
Change just the left stop to `transparent` and the background shows
through from that side. The label and outline stay fully opaque.

<AnimationExample name="gradient-opacity" width={106} height={84} alt="The left end of a blue cache fill fades to transparent while its label and outline stay solid." />

### Expand a radial gradient

Here the whole gradient lives in a variable named `glow`. The inner blue
region starts at 10% of the radius. As it expands to 50%, it turns plum and
the white outer stop moves to the rim.

<AnimationExample name="radial-gradient" width={118} height={118} alt="A small blue center in a circle grows into a wider plum-colored glow." />

### Rotate a gradient

To turn a linear gradient, put a number in the angle itself, as in
`linear-gradient(${angle}deg, navy, lightskyblue)`. Change `angle` from
`0` to `180` and watch the dark end turn through half a circle.

<AnimationExample name="gradient-angle" width={178} height={90} alt="A navy-to-light-blue gradient rotates 180 degrees inside a stationary rectangle." />

### Send a pulse along a connection

This is how the [cache diagram](#how-1200-gets-become-one-origin-read) sends
a request. Put a narrow orange band in the stroke of the cache connection.
Move both ends of the band from left to right. The connection to the origin
stays still.

<AnimationExample name="request-pulse" width={294} height={210} alt="An orange band travels from Client to Cache along a curved connection while the Client to Origin connection stays still." />

The percentages `tail` and `head` mark the back and front of the band. They
stay 20 percentage points apart. Starting the tail below 0% and ending the
head above 100% lets the pulse enter and leave the line.

## Animate with variables

The [battery](#animate-a-value-between-steps) uses one percentage for a
label and a gradient stop. The same idea works anywhere a variable supplies
a value D2 can draw.

### Count in a label

Put `${jobs}` in the queue's label, then change `jobs` from `2` to `12`.
The label counts through the whole numbers in between. For a reading in
tenths, write the endpoints as `2.0` and `12.0`. D2 keeps the precision
of the more precise endpoint.

<AnimationExample name="counter" width={178} height={79} alt="The label counts from “Queued jobs: 2” through “Queued jobs: 12”." />

### Share a color

Give the API and cache the same `${health}` fill. Changing `health` from
`palegreen` to `lightcoral` in one place changes both shapes in sync.

<AnimationExample name="shared-color" width={275} height={84} alt="The API and cache turn from pale green to coral together." />

### Move a pinned shape

With [TALA](./positions.md#top-and-left), use numeric variables for a
shape's `left` and `top`. Here the gate stays at the origin and the worker
moves from `(100, 0)` to `(200, 60)`. Change the **variables** in the
step. Assigning new coordinates directly moves the shape in one jump.

<AnimationExample name="position" width={316} height={144} alt="The gate stays fixed as the worker slides right and down." />

Both ends of a variable change must be the same kind of value. For example,
`20%` can animate to `80%`. Changing `20` to `80%`, introducing a new
variable, or replacing text like `idle` with `busy` takes effect immediately.

## Animate a single board

Set `style.animated: true` for motion that repeats on its own. These two
SVGs each have a single board and use the default timing options.

### Float a shape

Set `Worker.style.animated: true`. The worker rises and settles back down
as its shadow changes.

<AnimationExample name="floating-shape" width={116} height={84} alt="A worker gently lifts and settles over its shadow." open />

### Flow along a connection

Set `style.animated: true` on `API -> Cache`. The dashes keep flowing
toward the cache for as long as the SVG is on screen.

<AnimationExample name="flowing-connection" width={275} height={84} alt="Dashes move along the arrow from the API to the cache." open />
