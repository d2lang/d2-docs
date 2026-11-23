import CodeBlock from '@theme/CodeBlock';
import Chicken from '@site/static/bespoke-d2/chicken.d2';

# Steps

A "Step" represents a step in a sequence of events.

Each Step inherits from its the Step before it. The first step inherits from its parent,
whether that's a Scenario or Layer.

Notice how in Step 3 for example, the object "Approach road" exists even though it's not
defined, because it was inherited from Step 2, which inherited it from Step 1.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/chicken.svg2')}}></div>

<CodeBlock className="language-d2-incomplete">
    {Chicken}
</CodeBlock>

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

The default duration is zero. D2 interpolates between two numbers, two percentages,
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
