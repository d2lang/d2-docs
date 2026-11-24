import CodeBlock from '@theme/CodeBlock';
import OrderService from '@site/static/bespoke-d2/order-service.d2';

# Isometric

Isometric mode gives your diagram depth. Your layout engine still places the shapes and
routes the arrows. D2 then draws them from an angle, turning containers into raised
platforms. Here, the API writes to the Orders database and queues receipts.

<img src="/img/generated/order-service.svg" width="640" alt="An isometric platform labeled Order service. Arrows lead from the API to the Orders cylinder and the Receipts queue." />

## Enable isometric mode

To render an existing diagram in isometric mode, pass `--isometric` to the CLI.

```shell
d2 --isometric input.d2 output.svg
```

:::info
Isometric mode was added after D2 v0.9.0. If your CLI doesn't recognize the flag,
you can install the development version with `go install github.com/d2lang/d2@master`.
:::

To keep the setting with the diagram, set `isometric: true` under `vars.d2-config`.
Save this example as `order-service.d2` and run `d2 order-service.d2` to produce the
SVG above.

<CodeBlock className="language-d2" hidePlaygroundLink>{OrderService}</CodeBlock>

Use `--isometric=false` to render the same file in the regular style. You can also set
the mode with the `D2_ISOMETRIC` environment variable. A CLI flag takes precedence over
the environment, and both take precedence over the file.

## Export formats

Choose the format by changing the output filename. SVG and PNG produce still images.
Use GIF to animate connections marked with `style.animated: true`, or PDF and PPTX
to export one page or slide per board.

Choose either isometric mode or [Sketch](/tour/sketch/) for a diagram. For a dark isometric
diagram, choose a single [theme](/tour/themes/) with `--theme`. Responsive switching
with `--dark-theme` is unavailable in isometric mode.
