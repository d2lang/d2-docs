import fs from "node:fs/promises";
import path from "node:path";
import { fromMarkdown } from "mdast-util-from-markdown";

// Parse fences independently of the exporter's MDX transforms. Code samples can
// themselves contain backticks or literal import statements.
function scanMarkdown(markdown) {
  const blocks = [];
  const prose = [];
  let offset = 0;
  function visit(node) {
    if (node.type === "code" || node.type === "inlineCode") {
      if (node.type === "code") blocks.push(node);
      prose.push(markdown.slice(offset, node.position.start.offset));
      offset = node.position.end.offset;
    } else {
      node.children?.forEach(visit);
    }
  }
  visit(fromMarkdown(markdown));
  prose.push(markdown.slice(offset));
  return { blocks, prose: prose.join("\n") };
}

function isD2(block) {
  return block.lang === "d2" || block.lang === "d2-incomplete";
}

async function checkExamples(siteDir, sourcePath, source, pageBlocks) {
  const rendered = new Set(pageBlocks.filter(isD2).map((block) => block.value));
  const { blocks, prose } = scanMarkdown(source);
  function expectExample(value, label) {
    if (!rendered.has(value)) {
      throw new Error(
        `${sourcePath}: missing D2 example in the Markdown export (${label})`,
      );
    }
  }
  for (const block of blocks.filter(isD2)) {
    expectExample(block.value, `line ${block.position.start.line}`);
  }

  // An unused import is not a displayed example. Check the referenced files
  // against their own page, even if another page includes the same snippet.
  const mdx = prose.replace(/\{\/\*[\s\S]*?\*\/\}|<!--[\s\S]*?-->/g, "");
  const references = new Set(
    [...mdx.matchAll(/\{\s*([\w$]+)\s*\}/g)].map((m) => m[1]),
  );
  const files = new Set();
  for (const [, name, file] of mdx.matchAll(
    /^import\s+([\w$]+)\s+from\s+["']([^"'\n]+\.d2)["']/gm,
  )) {
    if (references.has(name)) files.add(file);
  }
  for (const [, file] of mdx.matchAll(
    /\{\s*require\(\s*["']([^"'\n]+\.d2)["']\s*\)\s*\}/g,
  )) {
    files.add(file);
  }
  for (const file of files) {
    if (!file.startsWith("@site/") && !file.startsWith(".")) continue;
    const filename = file.startsWith("@site/")
      ? path.join(siteDir, file.slice("@site/".length))
      : path.resolve(siteDir, path.dirname(sourcePath), file);
    const snippet = await fs.readFile(filename, "utf8");
    expectExample(snippet.replace(/\r\n?/g, "\n").replace(/\n$/, ""), file);
  }
}

function blockKey(block) {
  return (block.lang || "") + "\n" + block.value;
}

export async function verifyOutput({ siteDir, outDir, siteConfig }, docs) {
  const index = await fs.readFile(path.join(outDir, "llms.txt"), "utf8");
  const indexed = new Set();
  for (const [, url] of index.matchAll(/^- \[.*?\]\(([^)\s]+)\)/gm)) {
    if (indexed.has(url)) throw new Error(`Duplicate page in llms.txt: ${url}`);
    indexed.add(url);
  }
  if (!indexed.size)
    throw new Error("llms.txt contains no documentation pages");

  const full = await fs.readFile(path.join(outDir, "llms-full.txt"), "utf8");
  if (!full.trim()) throw new Error("llms-full.txt is empty");
  const remaining = new Map();
  for (const block of scanMarkdown(full).blocks) {
    const key = blockKey(block);
    remaining.set(key, (remaining.get(key) || 0) + 1);
  }

  const siteRoot = new URL(siteConfig.baseUrl || "/", siteConfig.url);
  for (const doc of docs) {
    const route = new URL(doc.permalink, siteRoot).pathname;
    const relative = route.slice(siteRoot.pathname.length).replace(/\/+$/, "");
    const url = new URL((relative || "index") + ".md", siteRoot);
    if (!indexed.delete(url.href))
      throw new Error(`Missing page in llms.txt: ${url.href}`);
    const page = await fs.readFile(
      path.join(outDir, decodeURIComponent(relative || "index") + ".md"),
      "utf8",
    );
    if (!page.trim()) throw new Error(`Empty Markdown page: ${url.pathname}`);
    const { blocks } = scanMarkdown(page);
    const sourcePath = doc.source.slice("@site/".length);
    const source = await fs.readFile(path.join(siteDir, sourcePath), "utf8");
    await checkExamples(siteDir, sourcePath, source, blocks);
    for (const block of blocks) {
      const key = blockKey(block);
      const count = remaining.get(key);
      if (!count)
        throw new Error(
          `llms-full.txt is missing a code block from ${url.pathname} (line ${block.position.start.line})`,
        );
      remaining.set(key, count - 1);
    }
  }
  if (indexed.size)
    throw new Error(`Unexpected page in llms.txt: ${[...indexed][0]}`);
}
