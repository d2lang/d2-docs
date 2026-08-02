# Exports

import WebPImage from '@site/src/components/WebPImage';

On the CLI, you may export `.d2` into
* [SVG](#svg)
* [PNG](#png)
* [PDF](#pdf)
* [PPTX](#pptx)
* [GIF](#gif)
* [ASCII](#ascii)
* [Stdout](#stdout)

## SVG

```shell
d2 in.d2 out.svg
```

SVG is the default export format on the CLI. If you don't specify an output, the export
file will be the input name as an SVG file.

For example, `d2 in.d2` will produce a file named `in.svg`.

The resulting SVG has CSS injected into it. This, along with the use of HTML
`<foreignObject>`s used to make Markdown work, means that the SVG is meant to be viewed in
a web context. For example, opening it up in your browser, embedding it onto a webpage. It
may not look right without a web context, like in Inkscape or Adobe Illustrator.

On the CLI, if you pass in `-`
- for the input, it reads D2 from stdin
- for the output, it writes SVG to stdout

:::info Technical details on SVG exports This information might be useful if you're
planning on doing post-processing on the SVG exports.

**Element IDs**: All shape elements get CSS classes with base64-encoded IDs for safe CSS
targeting. For example, a shape with ID `my-shape` gets class `bXktc2hhcGU` (base64
encoding of "my-shape").

**Unique identifiers**: Each diagram gets a deterministic hash prefix (e.g.,
`d2-1234567890`) used for clip paths, gradients, and other SVG elements to prevent
conflicts when multiple diagrams are on the same page.
:::

## PNG

```shell
d2 in.d2 out.png
```

PNG exports work by [Playwright](https://github.com/microsoft/playwright) spinning up a
headless browser, putting the SVG onto it, and taking a screenshot. The first invocation
of Playwright will download its dependencies, if they don't already exist on the machine.

:::info
If you get a message like `err: failed to launch Chromium`, you can try installing
Playwright dependencies outside of D2 on your machine. For example:

```
npm install -g @playwright
npx playwright install --with-deps chromium
```

See [#744](https://github.com/d2lang/d2/issues/744#issuecomment-1446641870) for more.
:::

## PDF

```shell
d2 in.d2 out.pdf
```

PDF exports are the result of taking PNG exports and placing them on PDF pages, along with
headers and fonts. As such, dependencies needed for PNG exports are also needed for PDF
exports.

PDF is _more_ interactive than PNG, but _less_ interactive than SVG.

For example, `animate` keyword won't show up in PDF exports like they would in SVG.

But `link`s can still be clickable in PDFs.

<WebPImage src={require('@site/static/img/screenshots/linked_pdf.png').default} webpSrc={require('@site/static/img/screenshots/linked_pdf.webp').default} alt="linked PDF example in D2" width={500}/>

## PPTX

```shell
d2 in.d2 out.pptx
```

Similar to PDF exports. This export format is useful for giving presentations when used
with composition (e.g. diagram with multiple Layers, Scenarios, Steps).

## GIF

```shell
d2 in.d2 out.gif
```

This export format is useful for giving presentations when used with short compositions.
For example, show two Scenarios, show a couple of steps. Something that the audience can
digest in a loop that lasts a couple of seconds without needing to flip through it
manually.

## ASCII

:::warning Beta
ASCII outputs are new as of 0.7.1. They are to be considered in beta, and many diagrams
may not render correctly.
:::

ASCII exports render diagrams as text-based art, perfect for documentation, terminals, and environments where graphical formats aren't suitable. D2 automatically detects the `.txt` file extension and renders in ASCII format.

```shell
d2 in.d2 out.txt
```

### Character sets

D2 supports two ASCII character modes:

#### Extended mode (default)
Uses Unicode box-drawing characters for cleaner output:

```shell
d2 in.d2 out.txt
```

```
┌───────┐       ┌───────┐
│ Hello │──────▶│ World │
└───────┘       └───────┘
```

#### Standard mode
Uses basic ASCII characters for maximum compatibility:

```shell
d2 --ascii-mode standard in.d2 out.txt
```

```
+-------+       +-------+
| Hello |------>| World |
+-------+       +-------+
```

### Notes

- Renders only with ELK and TALA, due to curved lines not rendering well in ASCII. If
  Dagre (or unspecified) is chosen, it will render in ELK.
- Some shapes are supported, like Person, but some shapes are hard to represent cleanly in
  ASCII. It's best to avoid using these shapes when the output is ASCII, but if it can't
  be avoided, in these cases, an icon on the top-left corner represents what the shape is
  meant to be.
- Many styles are moot in ASCII, such as shadow or multiple or animated. It's best to keep
  it as simple box and arrow type diagrams.

## Stdout

D2 accepts `-` in place of the input and/or output arguments. SVG is used as the format
for Stdout output.

For example, this writes a D2 script of `x -> y` and outputs it to a file `example.svg`.

```shell
echo "x -> y" | d2 - - > example.svg
```
