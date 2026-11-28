const fs = require("node:fs");
const path = require("node:path");

function codeFence(source) {
  const runs = source.match(/`+/g) || [];
  const length = runs.reduce((n, run) => Math.max(n, run.length + 1), 3);
  const fence = "`".repeat(length);
  return fence + "d2\n" + source + (source.endsWith("\n") ? "" : "\n") + fence;
}

// Only edit prose between Markdown fences. Keep every original line ending.
function proseRanges(markdown) {
  const ranges = [];
  let start = 0;
  let fence = "";
  for (const line of markdown.matchAll(
    /^([ \t]*)(`{3,}|~{3,})([^\r\n]*)(?:\r?\n|$)/gm,
  )) {
    const [, , mark, rest] = line;
    if (!fence) {
      if (mark[0] === "`" && rest.includes("`")) continue;
      ranges.push([start, line.index]);
      fence = mark;
    } else if (mark.startsWith(fence) && !rest.trim()) {
      start = line.index + line[0].length;
      fence = "";
    }
  }
  if (!fence) ranges.push([start, markdown.length]);
  return ranges;
}

function expandElk(block, read) {
  const variants = [
    ...block.matchAll(
      /\bfile:\s*"([\w-]+)",\s*label:\s*("(?:\\.|[^"\\])*"),\s*alt:\s*("(?:\\.|[^"\\])*")/g,
    ),
  ];
  if (
    !variants.length ||
    variants.length !== (block.match(/\bfile:\s*/g) || []).length
  ) {
    throw new Error("Unrecognized ElkOptionExample variants");
  }
  return variants
    .map(
      ([, file, label, alt]) =>
        JSON.parse(label) +
        " — " +
        JSON.parse(alt) +
        "\n\n" +
        codeFence(read("d2/elk-" + file + ".d2")),
    )
    .join("\n\n");
}

function expandGrid(block) {
  // ci/examples/examples.sh writes one quoted title and one JSON string per example.
  const entries = [
    ...block.matchAll(
      /^\s*name:\s*'([^'\n]+)',\s*svgContent:[^\n]+\n\s*code:\s*("(?:\\.|[^"\\])*")/gm,
    ),
  ];
  if (
    !entries.length ||
    entries.length !== (block.match(/^\s*name:/gm) || []).length
  ) {
    throw new Error("Unrecognized ExampleGrid entries");
  }
  return entries
    .map(
      ([, name, code]) => "## " + name + "\n\n" + codeFence(JSON.parse(code)),
    )
    .join("\n\n");
}

// The site serves static/ from its root, including the original .svg2 files.
function mediaMarkdown(block, siteUrl) {
  const requiredPath =
    /(?:\bsrc=\{|__html:\s*)require\(['"]@site\/static\/([^'"]+)['"]\)/.exec(
      block,
    )?.[1];
  const literalSrc = /\bsrc=["']([^"']+)["']/.exec(block)?.[1];
  const src = requiredPath ? "/" + requiredPath : literalSrc;
  if (!src) return block;
  const url = new URL(src, siteUrl);
  const ext = path.extname(url.pathname).toLowerCase();
  const alt = /\balt="([^"]*)"/.exec(block)?.[1];
  const name = path.basename(url.pathname, ext).replace(/[-_]/g, " ");
  const label = (alt || name).replace(/[\\\[\]]/g, "\\$&");
  const dest = url.href.replace(/\(/g, "%28").replace(/\)/g, "%29");
  if (ext === ".pdf") return "[" + label + " (PDF)](" + dest + ")";
  if (block.startsWith("<video"))
    return "[" + label + " (video)](" + dest + ")";
  if (ext === ".svg2") return "[" + label + " (SVG)](" + dest + ")";
  return "![" + label + "](" + dest + ")";
}

function anchorMarkdown(block, siteUrl) {
  const openingTag = block.slice(0, block.indexOf(">") + 1);
  const href = /\bhref\s*=\s*(["'])(.*?)\1/s.exec(openingTag)?.[2];
  if (!href) return block;
  const body = block.slice(openingTag.length, block.lastIndexOf("</a>"));
  const label = body
    .replace(/<(?:WebPImage|img)\b[^>]*\/?>/g, (tag) =>
      mediaMarkdown(tag, siteUrl),
    )
    .replace(/<\/?(?:span|picture)\b[^>]*>|<source\b[^>]*\/?>/g, "")
    .trim();
  const destination = href.startsWith("/") ? new URL(href, siteUrl).href : href;
  return (
    "[" +
    label +
    "](" +
    destination.replace(/\(/g, "%28").replace(/\)/g, "%29") +
    ")"
  );
}

module.exports = function transform(
  markdown,
  siteDir,
  siteUrl = "https://d2lang.com",
) {
  const imports = new Map();
  const read = (file) =>
    fs.readFileSync(path.join(siteDir, "static", file), "utf8");
  const importLine =
    /^import\s+([\w$]+)\s+from\s+['"]@site\/static\/((?:bespoke-d2|d2)\/[\w.-]+\.d2)['"];?[ \t]*(?:\r?\n|$)/gm;
  const ranges = proseRanges(markdown);
  const replacements = [];
  for (const [start, end] of ranges) {
    const text = markdown.slice(start, end);
    for (const match of text.matchAll(importLine))
      imports.set(match[1], match[2]);
  }

  const components =
    /^<CodeBlock\b[^>]*>\s*\{([\w$]+)\}\s*<\/CodeBlock>|^<(AnimationExample|AnnotationExample|ElkOptionExample|ExampleGrid|DonorList)\b[\s\S]*?\/>[ \t]*(?=\r?$)/gm;
  // Consume each anchor as a unit so an image inside it keeps its link.
  // Skip inline code showing literal HTML. Block code is excluded by proseRanges.
  const mediaAndLinks =
    /(`+)[^\n]*?\1|(<a\b[^>]*>[\s\S]*?<\/a>)|^[ \t]*(<(?:WebPImage|img|embed)\b[^>]*\/>|<video\b[^>]*>[\s\S]*?<\/video>|<div\b[^>]*\bdangerouslySetInnerHTML=[^>]*>\s*<\/div>)/gm;
  for (const [start, end] of ranges) {
    const text = markdown.slice(start, end);
    for (const match of text.matchAll(mediaAndLinks)) {
      const [, code, anchor, media] = match;
      if (code) continue;
      replacements.push({
        at: start + match.index,
        length: match[0].length,
        value: anchor
          ? anchorMarkdown(anchor, siteUrl)
          : mediaMarkdown(media, siteUrl),
      });
    }
    for (const match of text.matchAll(components)) {
      const [block, alias, component] = match;
      let value;
      if (alias) {
        if (!imports.has(alias)) continue;
        value = codeFence(read(imports.get(alias)));
      } else if (component === "AnimationExample") {
        const name = /\bname="([\w-]+)"/.exec(block)?.[1];
        const alt = /\balt="([^"]*)"/.exec(block)?.[1];
        if (!name || !alt)
          throw new Error("Unrecognized AnimationExample attributes");
        value =
          alt + "\n\n" + codeFence(read("bespoke-d2/animate-" + name + ".d2"));
      } else if (component === "AnnotationExample") {
        const name = /\bname="([\w-]+)"/.exec(block)?.[1];
        const alt = /\balt="([^"]*)"/.exec(block)?.[1];
        if (!name || !alt)
          throw new Error("Unrecognized AnnotationExample attributes");
        value =
          alt +
          "\n\n" +
          codeFence(read("bespoke-d2/annotation-" + name + ".d2"));
      } else if (component === "ElkOptionExample") {
        value = expandElk(block, read);
      } else if (component === "DonorList") {
        value = `[View the current donor list](${siteUrl}/donors/)`;
      } else {
        value = expandGrid(block);
      }
      replacements.push({
        at: start + match.index,
        length: block.length,
        value,
      });
    }
  }
  let cursor = 0;
  const output = [];
  for (const { at, length, value } of replacements.sort(
    (a, b) => a.at - b.at,
  )) {
    output.push(markdown.slice(cursor, at), value);
    cursor = at + length;
  }
  return output.join("") + markdown.slice(cursor);
};
