---
sidebar_label: Getting started
pagination_next: tour/d2js-imports
---

# D2.js

D2.js bundles the D2 engine as WebAssembly for browsers and Node.js.
In a browser, it renders diagrams locally in a worker. The
[D2 Playground](https://play.d2lang.com/) uses it this way.

## Install

```shell
npm install @d2lang/d2
```

For the nightly build, use `npm install @d2lang/d2@nightly`. A new nightly is
published on days when D2.js or its WebAssembly engine changes. The
[D2.js changelog](https://github.com/d2lang/d2/blob/master/d2js/js/CHANGELOG.md)
lists the D2 engine version included in each recent release.

## Render a diagram

`compile` lays out the diagram. Pass its `diagram` and `renderOptions` to
`render` so the SVG uses settings from your D2 source, such as the theme.

### Node.js

Save this as `diagram.mjs`. The second argument to `compile` selects the
[ELK layout engine](/tour/elk/).

```js
import { D2 } from "@d2lang/d2";

const d2 = new D2();
try {
  const { diagram, renderOptions } = await d2.compile("client -> server", { layout: "elk" });
  console.log(await d2.render(diagram, renderOptions));
} finally {
  await d2.dispose();
}
```

Run `node diagram.mjs > diagram.svg` and open `diagram.svg` in your browser.

### Browser

Save this as `index.html`. It uses a nightly build that includes the
[Safari worker fix](https://github.com/d2lang/d2/pull/2965).

```html
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>D2.js example</title>
<img id="diagram" alt="Client connects to server">
<script type="module">
  import { D2 } from "https://esm.sh/@d2lang/d2@0.2.0-nightly.20261126.ga29b8604efa0";

  const d2 = new D2();
  try {
    const { diagram, renderOptions } = await d2.compile("client -> server");
    const svg = await d2.render(diagram, renderOptions);
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
you're done. See the [package README](https://www.npmjs.com/package/@d2lang/d2)
for all options.
