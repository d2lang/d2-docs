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

const files = ["structure.ebnf", "lexical.ebnf"].map((name) => ({
  name,
  path: new URL("../static/grammar/" + name, import.meta.url),
  contents: git("show", revision + ":docs/grammar/" + name),
}));

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
console.log((check ? "Verified" : "Copied") + " grammar files at " + revision);
