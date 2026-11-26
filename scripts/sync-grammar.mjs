// Update: node scripts/sync-grammar.mjs ../d2 <revision>
// Verify: node scripts/sync-grammar.mjs --check ../d2
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const check = args[0] === "--check";
const [checkout, ref] = check ? args.slice(1) : args;
if (!checkout || (!check && !ref) || args.length !== 2) {
  console.error(
    "Usage: node scripts/sync-grammar.mjs <d2-checkout> <revision>\n       node scripts/sync-grammar.mjs --check <d2-checkout>"
  );
  process.exit(1);
}

const metadata = new URL("../src/components/Grammar/source.json", import.meta.url);
const requested = check ? JSON.parse(readFileSync(metadata, "utf8")).revision : ref;
const git = (...command) => execFileSync("git", ["-C", checkout, ...command]);
const revision = git("rev-parse", "--verify", requested + "^{commit}")
  .toString()
  .trim();
// Markdown partials share the page's heading hierarchy and local reference links.
// Keep fenced examples and their contents exactly as authored upstream.
function notes(markdown) {
  const links = new Map([
    ["structure.ebnf", "#grammar-structure"],
    ["lexical.ebnf", "#grammar-lexical"],
    ["structure.md", "#structural-rules"],
    ["lexical.md", "#lexical-rules"],
    [
      "README.md",
      "https://github.com/d2lang/d2/blob/" + revision + "/docs/grammar/README.md",
    ],
  ]);
  return markdown
    .replace(/^# [^\n]*\n\n/, "")
    .split(/(^```[^\n]*\n[\s\S]*?^```[ \t]*$)/gm)
    .map((part, index) => {
      if (index % 2) return part;
      return part
        .replace(/^(#{2,4}) /gm, "##$1 ")
        .replace(/\]\(([^)]+)\)/g, (original, target) =>
          links.has(target) ? "](" + links.get(target) + ")" : original
        );
    })
    .join("");
}

const files = ["structure", "lexical"].flatMap((stem) => {
  const read = (ext) => git("show", revision + ":docs/grammar/" + stem + ext);
  return [
    {
      name: stem + ".ebnf",
      path: new URL("../static/grammar/" + stem + ".ebnf", import.meta.url),
      contents: read(".ebnf"),
    },
    {
      name: stem + ".md",
      path: new URL("../docs/tour/_grammar-" + stem + ".md", import.meta.url),
      contents: Buffer.from(notes(read(".md").toString("utf8"))),
    },
  ];
});

for (const { name, path, contents } of files) {
  if (check) {
    if (!contents.equals(readFileSync(path))) {
      throw new Error(name + " differs from D2 at " + revision);
    }
  } else {
    writeFileSync(path, contents);
  }
}
if (!check) writeFileSync(metadata, JSON.stringify({ revision }, null, 2) + "\n");
console.log(
  (check ? "Verified" : "Copied") + " grammar files and reference notes at " + revision
);
