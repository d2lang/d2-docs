---
pagination_next: tour/exports
---

# CLI manual

This is the CLI manual for D2 v0.10.0. Run `man d2` to see the manual for your installed version.

To connect an AI client, see [MCP server](/tour/mcp/).

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
     d2 mcp [--root dir] [--no-ui] [--timeout seconds]

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

     --scale -1  Scale the output. For example, 0.5 halves the default size.
		 The default of -1 fits SVGs to the screen and uses the
		 default render size for other exports.  Use 1 for an SVG with
		 explicit dimensions.  Set the scale in the diagram with vars:
		 {d2-config: {scale: 0.5}}.  An explicit flag or SCALE
		 environment variable overrides the diagram..

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
		 Set the time each board is displayed in an animated SVG or
		 GIF. The flag takes milliseconds.  Set the same interval in
		 D2 source with vars: {d2-config: {animate-interval: 800ms}}.
		 The source value accepts integer milliseconds or a duration
		 such as 1.5s.	The flag takes precedence over
		 D2_ANIMATE_INTERVAL, which takes precedence over the file.
		 Zero selects ordinary SVG export or the default GIF interval
		 of 1000ms..

     --animate-duration 0
		 Set the transition duration for changes to numeric
		 properties, colors, and grid layouts between steps.  Changes
		 can be authored directly or through variables.  Direct
		 numeric changes include opacity, stroke-width, stroke-dash,
		 border-radius, font-size, width, and height.  Compatible
		 gradients have the same kind, direction, and number of stops.
		 Each stop interpolates its color and position.  In grids,
		 cells with the same ID move to their new positions.  New
		 cells grow in and removed cells shrink away.  D2 also
		 animates complete row or column changes, replacements in a
		 fixed slot, and cells that expand or collapse a nested grid.
		 In TALA steps, connections can draw toward arriving nodes,
		 containers can form around their contents, and services can
		 move between containers.  Appended SQL rows can drop into
		 place and sequence messages can trace from sender to
		 receiver.  The flag takes milliseconds. The file also accepts
		 durations, for example vars: {d2-config: {animate-interval:
		 800ms; animate-duration: 300ms}}.  All interpolated values
		 change together for 300ms, then hold their values for the
		 remaining 500ms.  A longer transition extends the step to its
		 duration.  The duration defaults to zero, which disables
		 interpolation, and accepts values up to ten minutes.  The
		 flag takes precedence over D2_ANIMATE_DURATION, which takes
		 precedence over the file.  Static exports show the authored
		 values..

     --browser true
		 Browser executable that watch opens. Setting to 0 opens no
		 browser.

     -l, --layout dagre
		 Set the diagram layout engine to the passed string. For a
		 list of available options, run layout.

     --dagre-nodesep pixels
		 Set the spacing between nodes in a Dagre rank.

     --dagre-edgesep pixels
		 Set the spacing between edges in a Dagre layout.  Both Dagre
		 settings accept nonnegative whole pixels.  Values in the
		 diagram take precedence over the corresponding flags, for
		 example vars: {d2-config: {data: {dagre-nodesep: 200;
		 dagre-edgesep: 30}}}.

     --elk-algorithm algorithm
		 Select the ELK layout algorithm. The default is layered.
		 Other choices for connected diagrams are force, stress,
		 mrtree and radial.

     --elk-forceModel model
		 Use the fruchterman_reingold (default) or eades force model.

     --elk-forceRepulsion strength
		 Set repulsion between unconnected nodes in the eades force
		 model. The default is 5.

     --elk-stressDesiredEdgeLength distance
		 Set the target center-to-center distance between connected
		 nodes in stress layout. The default is 100.

     --elk-mrtreeSearchOrder order
		 Build the spanning tree depth-first (dfs, the default) or
		 breadth-first (bfs).

     --elk-mrtreeWeighting order
		 Order sibling branches by model_order (the default),
		 descendants or fan.

     --elk-radialRadius distance
		 Set the initial spacing between tree levels in radial layout.
		 The default, 0, chooses it automatically.

     --elk-radialWedgeCriteria criterion
		 Divide angular space between radial branches by node_size
		 (the default) or leaf_number.

     --elk-radialCompactor mode
		 Pack radial rings with radial_compaction or individual
		 branches with wedge_compaction. The default is none.

     --elk-nodeNode, --elk-edgeNode, --elk-edgeEdge distance
		 Minimum spacing between nodes, between edges and nodes, or
		 between edges in the same ELK layer.

     --elk-edgeRouting style
		 Route ELK edges with orthogonal or polyline segments.

     --elk-wrappingStrategy strategy
		 Wrap a long ELK pipeline with single_edge or multi_edge. The
		 default is off.

     --elk-forceNodeModelOrder
		 Preserve the declaration order of nodes within layers at the
		 root of the diagram.

     --elk-feedbackEdges
		 Route backward connections around the main flow.

     --elk-mergeEdges
		 Share attachment points for ordinary incoming or outgoing
		 edges.  Set these options in a diagram with the flag name
		 inside vars.d2-config.data.  Diagram settings take precedence
		 over the CLI.	Set elk-layer-constraint on a shape to first,
		 last or none.	These option values are case-insensitive.

     -b, --bundle true
		 Bundle all assets and layers into the output svg.

     --allow-private-network false
		 Allow remote image assets to access private, loopback, and
		 link-local networks. Only enable this for trusted diagrams.

     --allow-local-files true
		 Allow the diagram to read local files: imports, and images
		 bundled into or rendered in the output. Disable it to render
		 untrusted diagrams.

     --force-appendix false
		 Add a numbered appendix for tooltips and links to SVG
		 exports, including each frame of an animated SVG.  PNG
		 exports include an appendix by default.  Set the SVG
		 preference in the diagram with vars: {d2-config:
		 {force-appendix: true}}.  An explicit flag or
		 D2_FORCE_APPENDIX environment variable overrides the
		 diagram..

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

     mcp         Run the Model Context Protocol server on standard input and
                 output. Use --root to allow diagram files and local images
                 under a directory, --no-ui to disable the inline viewer, and
                 --timeout to set the per-call deadline in seconds (default 60).

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

     D2_ALLOW_PRIVATE_NETWORK
	     See --allow-private-network flag.

     D2_ALLOW_LOCAL_FILES
	     See --allow-local-files flag.

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

     D2_ANIMATE_DURATION
	     See --animate-duration flag.

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
