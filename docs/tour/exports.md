# Exports

import WebPImage from '@site/src/components/WebPImage';

On the CLI, you may export `.d2` into
* [SVG](#svg)
* [PNG](#png)
* [PDF](#pdf)
* [PPTX](#pptx)
* [WebM](#webm)
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

The resulting SVG has CSS injected into it. You can open it in your browser or embed it
onto a webpage. Different SVG viewers may handle CSS and fonts differently.

On the CLI, if you pass in `-`
- for the input, it reads D2 from stdin
- for the output, it writes SVG to stdout by default

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

PNG exports have no external dependencies. D2 renders them directly, unlike Mermaid,
which uses a headless browser like Chromium to render diagrams and take screenshots.

## PDF

```shell
d2 in.d2 out.pdf
```

PDF exports are the result of taking PNG exports and placing them on PDF pages, along with
headers and fonts.

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

## WebM

On D2's development branch, run `d2 in.d2 out.webm` to export a VP9 video.
Install FFmpeg 5.1 or newer with the `libvpx-vp9` encoder and make sure
`ffmpeg` is on your `PATH`.

WebM uses the same video settings as MP4. Choose `low`, `medium`, `high`
(the default), or `best` with `--video-quality`. Lower settings produce smaller
files. The canvas follows the diagram by default. Use `--video-size=1920x1080`
to fit and center it at a specific resolution.

D2 plays the selected boards once. Use `--video-duration` to trim or repeat a
tour, or to record motion on a single board. In this six-second clip, a dot
reaches the price cache every 200 ms and the catalog database every 1.2 seconds.

<video controls playsInline preload="metadata" width="542" height="416" style={{maxWidth: '100%', height: 'auto'}} aria-label="Pricing API sends requests to the price cache and catalog database at different speeds">
  <source src="/img/animation/pricing.webm" type="video/webm" />
</video>

To reproduce the clip, download the [D2 source](/bespoke-d2/animate-icon-travel-time.d2) and run this command.

```shell
d2 --video-quality=medium --video-duration=6s animate-icon-travel-time.d2 pricing.webm
```

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

D2 accepts `-` in place of the input and/or output arguments. SVG is the default format
for stdout. In addition to the released formats listed below, the development branch
supports [WebM](#webm) with `d2 --stdout-format=webm in.d2 - > out.webm`.

For example, this writes a D2 script of `x -> y` and outputs it to a file `example.svg`.

```shell
echo "x -> y" | d2 - - > example.svg
```

To use a different format, pass `--stdout-format`:

```shell
echo "x -> y" | d2 --stdout-format=png - - > example.png
```

Supported formats are `svg`, `png`, `pdf`, `pptx`, `gif`, and `ascii` (`txt` also works).
