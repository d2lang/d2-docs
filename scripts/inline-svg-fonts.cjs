const { createHash } = require("node:crypto");

// D2's older SVGs use the WOFF MIME type for both WOFF and TrueType.
function fontExtension(bytes) {
  switch (bytes.toString("latin1", 0, 4)) {
    case "wOFF":
      return "woff";
    case "wOF2":
      return "woff2";
    case "\x00\x01\x00\x00":
      return "ttf";
  }
}

// Only bundled imports pass through this loader. Static SVG downloads retain
// their embedded fonts so that they still work when opened offline.
module.exports = function inlineSvgFonts(svg) {
  const { baseUrl, emitFiles } = this.getOptions();
  const fontSource =
    /(\bsrc\s*:\s*)url\(\s*(["']?)data:(?:application\/font-woff|font\/woff2?);base64,([A-Za-z0-9+/]+={0,2})\2\s*\)/gi;

  return svg.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, (style) =>
    style.replace(/@font-face\s*\{[^{}]*\}/gi, (face) =>
      face.replace(fontSource, (source, property, _quote, encoded) => {
        const bytes = Buffer.from(encoded, "base64");
        const ext = fontExtension(bytes);
        if (!ext || bytes.toString("base64") !== encoded) return source;

        const hash = createHash("sha256").update(bytes).digest("hex");
        const file = `assets/d2-fonts/${hash}.${ext}`;
        if (emitFiles) this.emitFile(file, bytes);
        return `${property}url("${baseUrl}${file}")`;
      }),
    ),
  );
};
