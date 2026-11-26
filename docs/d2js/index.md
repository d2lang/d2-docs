---
slug: /d2js
sidebar_label: Getting started
---

# D2.js

D2.js renders D2 diagrams in browsers and Node.js using WebAssembly.
It powers the [D2 Playground](https://play.d2lang.com/).

## Install

```shell
npm install @d2lang/d2
```

For the nightly build, use `npm install @d2lang/d2@nightly`. A new nightly is
published on days when D2.js or its WebAssembly engine changes.

## Render a diagram

`compile` lays out the diagram. Pass the result to `render` to get an SVG string.

```js
import { D2 } from "@d2lang/d2";

const d2 = new D2();
try {
  const { diagram, renderOptions } = await d2.compile("client -> server");
  console.log(await d2.render(diagram, renderOptions));
} finally {
  await d2.dispose();
}
```

In Node.js, save this as `diagram.mjs` and run `node diagram.mjs > diagram.svg`.
Open `diagram.svg` in your browser to see the result.

To try the example in a browser without a bundler, put it in a
`<script type="module">` block and replace the import with this line.

```js
import { D2 } from "https://esm.sh/@d2lang/d2@0.1.34";
```

Reuse the same D2 instance when rendering multiple diagrams. Call `dispose()`
when you're done to stop its worker.

Pass options to `compile` to change how the diagram looks. For example,
`d2.compile("client -> server", { sketch: true })` turns on [sketch mode](/tour/sketch/).
See the [package README](https://www.npmjs.com/package/@d2lang/d2) for all options.
