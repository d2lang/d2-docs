# Export formats

Since a diagram composed of multiple boards can't be represented as a single image, the
export options are different.

- Multiple SVGs
  - The default output writes multiple SVG files to your output path.
  - They are nicely organized on the file system, with appropriate directories and file
    names.
  - Internal board links are rewritten to point to those file paths, so they work if you
    open the SVG and just click on it.
- Single animated SVG
  - This is useful for small compositions. It's great for a small number of Steps or
    flipping between some Scenarios, but if the composition has too many boards, the
    viewer may get confused or wait until a loop.
  - On the CLI, passing `--animate-interval=1200` sets the resulting SVG to be an
    animation that stays on each board for 1200ms.
  - You can also set the interval in `vars.d2-config.animate-interval`. To show a
    value changing within a step, set `animate-duration` in the same block.
    [See the battery example](./steps.md#animate-a-value-between-steps).
- Single animated GIF
  - Same as above, but useful in different contexts, like where SVG is not rendered.
- PDF
  - PDF can be multiple pages, so this medium is suitable for multi-board diagrams.
    Each board is simply another page, and objects can be linked to those pages.
  - This is the most suitable medium for layers currently.
- PowerPoint
  - Specify the output as `.pptx` to get a PowerPoint presentation.
  - Works on Google Slides, for easy web sharing of multi-board diagrams.
