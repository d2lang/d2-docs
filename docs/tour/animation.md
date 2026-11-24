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
recovery. Set both timing options once in `vars.d2-config`.

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

You can change a property directly in a step. Give it a starting value so D2
knows where to begin. Here the worker fades in as its outline thickens and
its corners round.

```d2
vars: {d2-config: {animate-interval: 2s; animate-duration: 1200ms}}

worker: {
  style: {opacity: 0.25; stroke-width: 2; border-radius: 0}
}
steps: {
  ready: {
    worker.style: {opacity: 1; stroke-width: 8; border-radius: 24}
  }
}
```

This also works with `style.stroke-dash`, `style.font-size`, and a shape's
explicit `width` and `height`. Colors work the same way. Set `style.fill`,
`style.stroke`, or `style.font-color` to a new opaque named or hex color and
D2 blends the colors. Changing a solid color to `transparent` takes effect
immediately.

For dashes that move continuously along a single connection, use
[`style.animated`](./style.md#animated).

## Change a gradient

You can replace the whole gradient in a step. D2 matches the first stop to
the first stop, the second to the second, and so on. In this example the
green area grows from 60% to 80% and turns orange along the way.

```d2
vars: {d2-config: {animate-interval: 2s; animate-duration: 1200ms}}

capacity: {
  width: 300
  style.fill: "linear-gradient(to right, seagreen 60%, white 60%)"
}
steps: {
  busy: {
    capacity.style.fill: "linear-gradient(to right, orange 80%, white 80%)"
  }
}
```

Use the same gradient kind, direction, and number of stops at both ends of
the transition. If any of those change, the new gradient appears immediately.
