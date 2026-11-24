import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Isometric

:::warning
Isometric mode is in alpha and may change. If you have feedback or suggestions, [open a GitHub issue](https://github.com/d2lang/d2/issues/new).
:::

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

## Enable isometric mode

```shell
d2 --isometric input.d2 output.svg
```

Or enable it in your D2 file.

```d2-incomplete
vars: {
  d2-config: {
    isometric: true
  }
}
```

## Export formats

Isometric mode supports every D2 export format except ASCII. Try it with
<a href="/bespoke-d2/printing-press.d2" download>printing-press.d2</a>.

```shell
d2 printing-press.d2 printing-press.svg
d2 printing-press.d2 printing-press.gif
```
