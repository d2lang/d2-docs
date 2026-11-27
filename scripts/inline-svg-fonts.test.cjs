const assert = require("node:assert/strict");
const { test } = require("node:test");
const inlineSvgFonts = require("./inline-svg-fonts.cjs");

function render(svg, emitFiles = true) {
  const files = new Map();
  const output = inlineSvgFonts.call(
    {
      getOptions: () => ({ baseUrl: "/docs/", emitFiles }),
      emitFile: (file, bytes) => files.set(file, bytes),
    },
    svg,
  );
  return { output, files };
}

test("inline imports share font URLs across diagrams and server rendering", () => {
  for (const [magic, ext] of [
    ["wOFF", "woff"],
    ["wOF2", "woff2"],
    ["\x00\x01\x00\x00", "ttf"],
  ]) {
    const bytes = Buffer.from(magic + "test font");
    const encoded = bytes.toString("base64");
    const legacy = `"data:application/font-woff;base64,${encoded}"`;
    const compact = `data:font/woff2;base64,${encoded}`;
    const svg = (name, url) =>
      `<svg><style>@font-face{font-family:${name};src:url(${url})}</style></svg>`;
    const { output, files } = render(svg("one", legacy));
    assert.equal(files.size, 1);
    const [file] = files.keys();
    assert.match(file, /^assets\/d2-fonts\/[a-f0-9]{64}\./);
    assert.ok(file.endsWith("." + ext));
    assert.deepEqual(files.get(file), bytes);
    const url = `"/docs/${file}"`;
    assert.equal(output, svg("one", url));
    assert.equal(render(svg("two", compact)).output, svg("two", url));
    const server = render(svg("one", legacy), false);
    assert.equal(server.output, output);
    assert.equal(server.files.size, 0);
  }
});

test("leaves unrelated resources and unsupported font sources as supplied", () => {
  const url = "url(data:font/woff2;base64,d09GMg==)";
  const svg =
    `<svg><text>@font-face{src:${url}}</text><style>` +
    `.example{src:${url}}@font-face{src:url(https://example.test/font.woff2)}` +
    `@font-face{src:url(data:font/woff2;base64,dW5rbm93bg==)}</style></svg>`;
  const { output, files } = render(svg);
  assert.equal(output, svg);
  assert.equal(files.size, 0);
});
