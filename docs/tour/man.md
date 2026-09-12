---
pagination_next: tour/exports
---

# CLI manual

The following is a copy of the `man` (manual) for D2 v0.9.0. Run `man d2` to view the
manual for your installed version.

```text
NAME
     d2 – compiles and renders d2 diagrams into svgs.

SYNOPSIS
     d2 [--watch false] [--theme 0] [--salt string] file.d2
	[file.svg | file.png | file.pdf | file.pptx | file.gif | file.txt]
     d2 layout [name]
     d2 fmt file.d2 ...
     d2 play file.d2
     d2 validate file.d2

DESCRIPTION
     d2 compiles and renders file.d2 to file.svg | file.png | file.pdf |
     file.pptx | file.gif | file.txt.

     It defaults to file.svg if no output path is passed.

     Pass - to have d2 read from stdin or write to stdout.

     PNG exports support up to 32768 pixels per dimension, subject to
     rendering resource limits.

     Never use the presence of the output file to check for success.  Always
     use the exit status of d2.  This is because sometimes when errors occur
     while rendering, d2 still write out a partial render anyway to enable
     iteration on a broken diagram.

     See more docs, the source code and license at
     https://github.com/d2lang/d2.

     Hosted icons at https://icons.d2lang.com.

     Playground runner at https://play.d2lang.com.

OPTIONS
     -w, --watch false
		 Watch for changes to input and live reload. Use $PORT and
		 $HOST to specify the listening address.

     -h, --host localhost
		 Host listening address when used with watch.

     -p, --port 0
		 Port listening address when used with watch.

     -t, --theme 0
		 Set the diagram theme ID.

     --dark-theme -1
		 The theme to use when the viewer's browser is in dark mode.
		 When left unset --theme is used for both light and dark mode.
		 Be aware that explicit styles set in D2 code will still be
		 applied and this may produce unexpected results. We plan on
		 resolving this by making style maps in D2 light/dark mode
		 specific. See https://github.com/d2lang/d2/issues/831.

     -s, --sketch false
		 Renders the diagram to look like it was sketched by hand.

     --center flag
		 Center the SVG in the containing viewbox, such as your
		 browser screen.

     --scale -1  Scale the output. E.g., 0.5 to halve the default size.
		 Default -1 means that SVG's will fit to screen and all others
		 will use their default render size. Setting to 1 turns off
		 SVG fitting to screen.

     --font-regular
		 Path to .ttf file to use for the regular font. If none
		 provided, Source Sans Pro Regular is used.

     --font-italic
		 Path to .ttf file to use for the italic font. If none
		 provided, Source Sans Pro Regular-Italic is used.

     --font-bold
		 Path to .ttf file to use for the bold font. If none provided,
		 Source Sans Pro Bold is used.

     --font-semibold
		 Path to .ttf file to use for the semibold font. If none
		 provided, Source Sans Pro Semibold is used.

     --font-mono
		 Path to .ttf file to use for the monospace font. If none
		 provided, Source Code Pro Regular is used.

     --font-mono-bold
		 Path to .ttf file to use for the monospace bold font. If none
		 provided, Source Code Pro Bold is used.

     --font-mono-italic
		 Path to .ttf file to use for the monospace italic font. If
		 none provided, Source Code Pro Italic is used.

     --font-mono-semibold
		 Path to .ttf file to use for the monospace semibold font. If
		 none provided, Source Code Pro Semibold is used.

     --pad 100	 Pixels padded around the rendered diagram.

     --animate-interval 0
		 If given, multiple boards are packaged as 1 SVG which
		 transitions through each board at the interval (in
		 milliseconds). Can only be used with SVG or GIF exports. For
		 GIF exports, defaults to 1000ms if not specified.

     --browser true
		 Browser executable that watch opens. Setting to 0 opens no
		 browser.

     -l, --layout dagre
		 Set the diagram layout engine to the passed string. For a
		 list of available options, run layout.

     -b, --bundle true
		 Bundle all assets and layers into the output svg.

     --force-appendix false
		 An appendix for tooltips and links is added to PNG exports
		 since they are not interactive. Setting this to true adds an
		 appendix to SVG exports as well.

     --target	 Target board to render. Pass an empty string to target root
		 board. If target ends with '*', it will be rendered with all
		 of its scenarios, steps, and layers. Otherwise, only the
		 target board will be rendered. E.g. --target='' to render
		 root board only or --target='layers.x.*' to render layer 'x'
		 with all of its children.

     -d, --debug
		 Print debug logs.

     --img-cache true
		 In watch mode, images used in icons are cached for subsequent
		 compilations. This should be disabled if images might change.

     --timeout 120
		 The maximum number of seconds that D2 runs for before timing
		 out and exiting. When rendering a large diagram, it is
		 recommended to increase this value.

     --check false
		 Check that the specified files are formatted correctly.

     --salt string
		 Add a salt value to ensure the output uses unique IDs. This
		 is useful when generating multiple identical diagrams to be
		 included in the same HTML doc, so that duplicate id's do not
		 cause invalid HTML. The salt value is a string that will be
		 appended to IDs in the output..

     -h, --help  Print usage information and exit.

     -v, --version
		 Print version information and exit.

     --stdout-format string
		 Set the output format when writing to stdout. Supported
		 formats are: png, svg, ascii, txt, pdf, pptx, gif. Only used
		 when output is set to stdout (-).

     --no-xml-tag false
		 Omit XML tag (<?xml ...?>) from output SVG files. Useful when
		 generating SVGs for direct HTML embedding.

     --omit-version false
		 omit D2 version from generated image.

     --ascii-mode extended
		 ASCII rendering mode for text outputs. Options: 'standard'
		 (basic ASCII chars) or 'extended' (Unicode chars).

SUBCOMMANDS
     layout	 Lists available layout engine options with short help.

     layout [name]
		 Display long help for a particular layout engine, including
		 its configuration options.

     themes	 Lists available themes.

     fmt file.d2 ...
		 Format all passed files

     play file.d2
		 Opens the file in playground, an online web viewer
		 (https://play.d2lang.com)

     validate file.d2
		 Validates file.d2

ENVIRONMENT VARIABLES
     Many flags can also be set with environment variables.

     D2_WATCH
	     See -w[atch] flag.

     D2_LAYOUT
	     See -l[ayout] flag.

     D2_THEME
	     See -t[heme] flag.

     D2_DARK_THEME
	     See --dark-theme flag.

     D2_PAD  See --pad flag.

     D2_CENTER
	     See --center flag.

     D2_SKETCH
	     See -s[ketch] flag.

     D2_BUNDLE
	     See -b[undle] flag.

     D2_FORCE_APPENDIX
	     See --force-appendix flag.

     D2_FONT_REGULAR
	     See --font-regular flag.

     D2_FONT_ITALIC
	     See --font-italic flag.

     D2_FONT_BOLD
	     See --font-bold flag.

     D2_FONT_SEMIBOLD
	     See --font-semibold flag.

     D2_FONT_MONO
	     See --font-mono flag.

     D2_FONT_MONO_BOLD
	     See --font-mono-bold flag.

     D2_FONT_MONO_ITALIC
	     See --font-mono-italic flag.

     D2_FONT_MONO_SEMIBOLD
	     See --font-mono-semibold flag.

     D2_ANIMATE_INTERVAL
	     See --animate-interval flag.

     D2_TIMEOUT
	     See --timeout flag.

     D2_CHECK
	     See --check flag.

     D2_ASCII_MODE
	     See --ascii-mode flag.

     DEBUG   See -d[ebug] flag.

     IMG_CACHE
	     See --img-cache flag.

     HOST    See -h[ost] flag.

     PORT    See -p[ort] flag.

     BROWSER
	     See --browser flag.

     D2_STDOUT_FORMAT
	     See --stdout-format flag.

     D2_NO_XML_TAG
	     See --no-xml-tag flag.

     OMIT_VERSION
	     See --omit-version

AUTHORS
     D2 contributors
```
