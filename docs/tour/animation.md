# Animation

D2 can play a [composition](./composition.md) as an animated SVG or GIF.
`animate-interval` controls playback across all drawable boards, including
the root, [layers](./layers.md), [scenarios](./scenarios.md), and
[steps](./steps.md). When a step changes a value, `animate-duration`
controls how long D2 takes to interpolate it.

## How 1,200 GETs become one origin read

Six cold edge caches each receive 200 requests for the same image. Watch
Ashburn, the third row. Its GET reaches the shield first and starts an origin
read. The other five caches join that fetch while it is in flight.

<img
  src="/img/generated/cache-stampede.svg"
  alt="Amber GETs converge from six edge caches into one origin read. A mint response returns to the shield, fills all six edges, and fans back out to the viewers."
  width="1008"
  height="578"
  style={{height: 'auto'}}
/>

<a href="/img/generated/cache-stampede.svg">Open the animation</a>
{' · '}
<a href="/bespoke-d2/cache-stampede.d2" download="cache-stampede.d2">Download the D2 source</a>

The origin sends one 256 KiB body. By the time the edges finish serving all
1,200 viewers, they have delivered 300 MiB. Each dash on a viewer connection
represents 50 messages. On the upstream connections, each dash is one message.

One D2 step animates the whole round trip. With `animate-interval: 140ms` and
`animate-duration: 7200ms`, the opening board holds for 140 ms, then the
transition runs for 7.2 seconds. To reproduce it, run
`d2 cache-stampede.d2 cache-stampede.svg` with a D2 build that includes
`animate-duration`. The option is available on D2's `master` branch for the
next release.

The amber GET is a narrow band in the connection’s stroke gradient. When its
ends move from 20% and 30% to 60% and 70%, the band travels forward and keeps
its width. Starting a band outside the visible 0–100% range delays its entry
onto the next connection. This works best on routes that keep moving in one
direction along the gradient axis.

## Play layers, scenarios, and steps

Layers and scenarios appear as complete boards when playback reaches them.
A step can interpolate supported changes from its starting board. The first
step starts from its parent, and later steps start from the previous step.
This also works for steps nested inside a layer or scenario.

```d2
vars: {d2-config: {animate-interval: 1s; animate-duration: 400ms}}
api: {style.fill: blue}

scenarios: {
  incident: {
    api.style.fill: red
    steps: {recover: {api.style.fill: blue}}
  }
}
```

The root shows a blue API for one second. The `incident` scenario cuts
straight to red and holds for one second. Its `recover` step blends red
back to blue over 400 ms, then holds blue for the remaining 600 ms.

## Animate a value between steps

Set `animate-duration` once in the root `vars.d2-config` to animate changes to
number, percentage, color, and gradient variables. Every use of a variable updates together.
Here the battery label and both gradient stops use `${charge}`.

```d2
vars: {
  d2-config: {
    animate-interval: 800ms
    animate-duration: 4s
  }
  charge: 65%
}

battery: "Battery · ${charge}" {
  width: 300
  height: 64
  style.fill: "linear-gradient(to right, #82d6a7 ${charge}, #eff5f1 ${charge})"
}

steps: {
  drain: {vars: {charge: 0%}}
}
```

Save this as `battery.d2` and run `d2 battery.d2 battery.svg`. The battery
starts at 65% for 800 ms, drains to 0% over four seconds, then loops. Changing
`animate-duration` to `300ms` makes the drain take 300 ms and leaves the
battery empty for the remaining 500 ms of the step.

The default duration is zero. For an animated SVG, set a positive
`animate-interval`. A changing step lasts for the longer of the interval and
the duration. You can override the source duration with the CLI flag
`--animate-duration=300` (milliseconds).

D2 interpolates between two numbers, two percentages,
two opaque solid colors, or two compatible gradients. New variables and ordinary text values appear immediately.
Static exports show each step’s destination value.

### Change a solid color

A step can also change `style.fill`, `style.stroke`, or `style.font-color` directly.
Here the service goes from blue through purple (`#800080`) to red.

```d2
vars: {d2-config: {animate-interval: 1500ms; animate-duration: 1200ms}}
service: {style.fill: blue}
steps: {alert: {service.style.fill: red}}
```

D2 interpolates the red, green, and blue channels of named colors and three- or
six-digit hex colors. A solid fill changing to `transparent` switches immediately.

### Change numeric properties directly

Give the property a starting value, then set its destination in the step.
Here the worker fades in as its outline thickens and its corners round.

```d2
vars: {d2-config: {animate-interval: 2s; animate-duration: 1200ms}}
worker: {
  style: {opacity: 0.25; stroke-width: 2; border-radius: 0}
}
steps: {ready: {
  worker.style: {opacity: 1; stroke-width: 8; border-radius: 24}
}}
```

At the midpoint the opacity is 0.625, the stroke is 5 pixels wide, and the
corner radius is 12 pixels. You can also change `style.stroke-dash`,
`style.font-size`, and an object's explicit `width` and `height` this way.

### Change a whole gradient

Set the new gradient directly or assign it to a variable. D2 pairs the stops
in order when the gradients have the same kind, direction, and stop count.
Each pair changes color and position together.

```d2
vars: {d2-config: {animate-interval: 2s; animate-duration: 1200ms}}
capacity: {
  width: 300
  style.fill: "linear-gradient(to right, seagreen 60%, white 60%)"
}
steps: {busy: {
  capacity.style.fill: "linear-gradient(to right, orange 80%, white 80%)"
}}
```

The two stops share a position at both ends, so the boundary stays sharp as
it passes through 70%. Changing the gradient kind, direction, or stop count
switches directly to the new gradient.
