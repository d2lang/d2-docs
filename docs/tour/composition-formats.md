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
  - Set `animate-interval` in `vars.d2-config` to play the boards in a loop,
    or pass `--animate-interval=1200` on the CLI for a 1.2-second interval.
    Set `animate-duration` to animate changes between steps. See [Animation](./animation.md).
- Single animated GIF
  - Use a `.gif` output filename to export the animation as a GIF.
- PDF
  - PDF can be multiple pages, so this medium is suitable for multi-board diagrams.
    Each board is simply another page, and objects can be linked to those pages.
  - This is the most suitable medium for layers currently.
- PowerPoint
  - Specify the output as `.pptx` to get a PowerPoint presentation.
  - Works on Google Slides, for easy web sharing of multi-board diagrams.
