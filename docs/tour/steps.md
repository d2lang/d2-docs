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
numeric, percentage, and solid color variables. Every use of a variable updates together.
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
or two opaque solid colors. New variables and ordinary text values appear immediately.
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
six-digit hex colors. Values such as `transparent` change immediately.
