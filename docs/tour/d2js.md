---
sidebar_label: Getting started
pagination_next: tour/d2js-imports
---

# D2.js

D2.js bundles the D2 engine as WebAssembly for browsers and Node.js.
In a browser, it renders diagrams locally in a worker. The
[D2 Playground](https://play.d2lang.com/) uses it this way.

## Install

```bash
npm install @d2lang/d2
```

For the nightly build, use `npm install @d2lang/d2@nightly`. A new nightly is
published on days when D2.js or its WebAssembly engine changes.
For changes in each version, see the [D2 release notes](/releases/intro/).

## Render a diagram

`renderSVG()` takes D2 source and returns an SVG string.

### Node.js

Save this as `diagram.mjs`. The second argument to `renderSVG()` selects the
[ELK layout engine](/tour/elk/).

```js
import { D2 } from "@d2lang/d2";

const d2 = new D2();
try {
  const svg = await d2.renderSVG("client -> server", { layout: "elk" });
  console.log(svg);
} finally {
  await d2.dispose();
}
```

Run `node diagram.mjs > diagram.svg` and open `diagram.svg` in your browser.

### Browser

Save this as `index.html` to display the SVG without a bundler.

```html
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>D2.js example</title>
<img id="diagram" alt="Client connects to server">
<script type="module">
  import { D2 } from "https://esm.sh/@d2lang/d2@0.2.0";

  const d2 = new D2();
  try {
    const svg = await d2.renderSVG("client -> server");
    document.querySelector("#diagram").src =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  } finally {
    await d2.dispose();
  }
</script>
</html>
```

Run `python3 -m http.server 8000` in the same directory and open
`http://localhost:8000` to see the diagram.

Reuse the D2 instance when rendering multiple diagrams and call `dispose()` when
you're done.

## Work with D2 source

To inspect the diagram before rendering, call `compile()` and pass its
`diagram` and `renderOptions` to `render()`. This preserves settings from
the source, such as the theme.

```js
const { diagram, renderOptions } = await d2.compile(source);
const svg = await d2.render(diagram, renderOptions);
```

Use `await d2.format(source)` to [format D2](/tour/auto-formatter/) in an editor.
To share it in the Playground, put the result of `await d2.encode(source)` in the
URL’s `script` parameter. See the [D2.js reference](https://github.com/d2lang/d2/tree/master/d2js/js#readme)
for examples and options.
