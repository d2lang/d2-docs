import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Isometric

:::warning
Isometric mode is in alpha and may change. If you have feedback or suggestions, [open a GitHub issue](https://github.com/d2lang/d2/issues/new).
:::

Follow a sheet of paper through a four-color printing press. The colored lines carry
ink to the rollers. The dark arrows trace the paper from the stack to the finished proof.

<Tabs lazy>
  <TabItem value="svg" label="Still (SVG)" default>
    <a href="/img/generated/printing-press.svg" aria-label="Open the full-size printing press diagram">
      <img src="/img/generated/printing-press.svg" width="1610" height="1020" style={{height: "auto"}} alt="Four ink fountains feed cyan, magenta, yellow, and black rollers. A sheet passes through all four and emerges with an overlapping color print." />
    </a>
  </TabItem>
  <TabItem value="gif" label="In motion (GIF)">
    <img src="/img/generated/printing-press.gif" width="994" height="625" style={{height: "auto"}} alt="Moving dots follow each ink supply and the paper path through the four rollers to the finished print." />
  </TabItem>
</Tabs>

The fountains are D2 `cylinder` shapes, the rollers are `queue` shapes, and the paper
uses the `page` shape. Your layout engine places them and routes the arrows. Isometric
mode projects that layout into three dimensions, turning the containers into raised
platforms. <a href="/bespoke-d2/printing-press.d2" download>Download the D2 source</a>.

## Enable isometric mode

To render an existing diagram in isometric mode, pass `--isometric` to the CLI.

```shell
d2 --isometric input.d2 output.svg
```

:::info
Isometric mode was added after D2 v0.9.0. If your CLI doesn't recognize the flag,
you can install the development version with `go install github.com/d2lang/d2@master`.
:::

To keep the setting with the diagram, add this to your D2 file.

```d2-incomplete
vars: {
  d2-config: {
    isometric: true
  }
}
```

Use `--isometric=false` to render the same file in the regular style. You can also set
the mode with the `D2_ISOMETRIC` environment variable. A CLI flag takes precedence over
the environment, and both take precedence over the file.

## Export formats

Choose the format by changing the output filename. SVG and PNG produce still images.
Use GIF to animate connections marked with `style.animated: true`, or PDF and PPTX
to export one page or slide per board.

To render both versions of the press, run these commands with the downloaded source.

```shell
d2 printing-press.d2 printing-press.svg
d2 printing-press.d2 printing-press.gif
```

Choose either isometric mode or [Sketch](/tour/sketch/) for a diagram. For a dark isometric
diagram, choose a single [theme](/tour/themes/) with `--theme`. Responsive switching
with `--dark-theme` is unavailable in isometric mode.
