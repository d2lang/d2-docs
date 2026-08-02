---
date: 2023-04-01
---

# Text to (animated) diagrams

This is a single SVG file created purely through D2 text:

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/animated.svg2')}}></div>

> D2 source to reproduce this is here: [here](https://github.com/d2lang/d2-docs/blob/master/static/bespoke-d2/animated.d2), rendered with [these parameters](https://github.com/d2lang/d2-docs/blob/master/ci/render.sh#L12).


Brief factsheet:
- Single file, weights 88kb, the vast majority is the embedded fonts so that it looks the
  same everywhere.
- Well-formatted, readable D2 text (i.e. has newlines) is 85 lines.
- Configurable. This animation has 1400ms intervals, but if you want the animation to
  linger for longer and shorter, simply change the flags.
- Easily split into 2 separate SVGs (the default behavior of CLI when a flag is not passed
  in to animate).

<!-- truncate -->

## Use cases

### Show change

Typically, when you're making a diagram primarily to show change in a single image, you
put them side by side. And the user scans. Their eyes are darting back and forth, piecing
together the deltas.

Instead, you can overlay and switch back and forth in place, making that process much
easier and clarifying the differences.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/tax.svg2')}}></div>

Showing **versions** is a form of showing change. An example of this is conveyed in the
first example above.

### Show steps

Take the viewer through a sequence of steps

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/johnwick.svg2')}}></div>

Or a journey to build up to something.

<div className="embedSVG" dangerouslySetInnerHTML={{__html: require('@site/static/img/generated/pizza.svg2')}}></div>

## Ergonomics will be better soon

D2 is not yet 1.0. Of the many things planned in the near term, better ergonomics for
creating these are a priority. The source code for all of these diagrams can be found
[here](https://github.com/d2lang/d2-docs/tree/master/static/bespoke-d2). Some of
these are currently verbose and repetitive. We've released early to get feedback from the
community, but in-progress things like globs (being able to target objects with `*`) and
classes will make creating these animations much easier than they currently are.

`--animate-interval` is available to use in D2 0.3.0 ([install
here](https://github.com/d2lang/d2#install)), hope you can check it out and let us
know what you think!
