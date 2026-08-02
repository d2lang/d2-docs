# Frequently asked questions (FAQ)

* [General](#general)
  + [How does this compare to Mermaid, Graphviz, PlantUML?](#how-does-this-compare-to-mermaid-graphviz-plantuml)
  + [Is this designed for small diagrams or complex ones?](#is-this-designed-for-small-diagrams-or-complex-ones)
  + [Does the D2 CLI collect telemetry?](#does-the-d2-cli-collect-telemetry)
  + [Does D2 need a browser to run?](#does-d2-need-a-browser-to-run)
  + [Can D2 run on a browser?](#can-d2-run-on-a-browser)
  + [Can I use D2 online?](#can-i-use-d2-online)
* [Layouts](#layouts)
  + [Can an object be part of more than 1 container?](#can-an-object-be-part-of-more-than-1-container)
  + [Can I specify ports?](#can-i-specify-ports)
* [Exports](#exports)
  + [No interactivity in SVG export](#no-interactivity-in-svg-export)

## General

### How does this compare to Mermaid, Graphviz, PlantUML?

We've created a website with detailed comparisons:
[https://text-to-diagram.com](https://text-to-diagram.com). It is a community effort where
anyone can add examples or request changes or compare features. The maintainers of Mermaid
have contributed to it.

### Is this designed for small diagrams or complex ones?

Both. The syntax is kept minimal and unstructured to make small diagrams with as little
lines as possible. At the same time, the language includes IDE features like an
autoformatter, error messages, and comments to maintain large diagrams.

However, it is not designed for "big data". We do not test D2 on thousands of nodes.

### Does the D2 CLI collect telemetry?

No, D2 does not use an internet connection after installation, except to check for version
updates from GitHub periodically.

### Does D2 need a browser to run?

No, D2 can run entirely server-side.

### Can D2 run on a browser?

Yes, with WebAssembly. D2 runs on [https://play.d2lang.com](https://play.d2lang.com) this
way.We are working on including the build with the releases, as well as provide
instructions and examples so you can include it in your browser projects.

### Can I use D2 online?

[https://play.d2lang.com](https://play.d2lang.com)

## Layouts

### Can an object be part of more than 1 container?

...e.g., an item in the middle of a venn diagram.

Not currently and not in the near future. See
[discussion](https://github.com/d2lang/d2/discussions/328) for more.

### Can I specify ports?

Not currently, but in the near future. See
[discussion](https://github.com/d2lang/d2/discussions/605) for more.

## Exports

### No interactivity in SVG export

SVG exports can have some interactive elements when using links and tooltips. However,
interactivity in SVG can be disabled depending on environment. There are several ways to
include SVGs on a web page.

tldr; when it's treated as an image, the interactivity is lost.

<table>
  <thead>
    <tr>
      <th>Embedding Method</th>
      <th>Link Clickable</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Inline SVG (&lt;svg&gt;)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>&lt;img&gt; tag</td>
      <td>No</td>
    </tr>
    <tr>
      <td>&lt;object&gt; tag</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>&lt;iframe&gt; tag</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>CSS background image</td>
      <td>No</td>
    </tr>
    <tr>
      <td>&lt;embed&gt; tag</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>
