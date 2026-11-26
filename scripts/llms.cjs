const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const generateLlms = require("docusaurus-plugin-llms").default;
const inlineExamples = require("./inline-d2-examples.cjs");
const inlineGrammar = require("./inline-grammar.cjs");

// The generator logs some write failures and still resolves its postBuild hook.
async function verifyOutput(outDir) {
  const index = await fs.readFile(path.join(outDir, "llms.txt"), "utf8");
  const pages = [...index.matchAll(/^- \[.*?\]\(([^)\s]+)\)/gm)];
  if (!pages.length)
    throw new Error("llms.txt contains no documentation pages");

  const files = ["llms-full.txt"];
  for (const [, url] of pages) {
    const page = decodeURIComponent(new URL(url).pathname);
    if (!page.endsWith(".md"))
      throw new Error(`Missing Markdown page for ${url}`);
    files.push(page);
  }
  for (const file of files) {
    const stat = await fs.stat(path.join(outDir, file));
    if (!stat.isFile() || !stat.size)
      throw new Error(`Empty LLM output: ${file}`);
  }
}

async function prepareDocs(source, destination, context, ruleNotes) {
  await fs.mkdir(destination, { recursive: true });
  for (const entry of await fs.readdir(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      await prepareDocs(from, to, context, ruleNotes);
    } else if (/\.mdx?$/i.test(entry.name)) {
      const markdown = await fs.readFile(from, "utf8");
      const withExamples = inlineExamples(
        markdown,
        context.siteDir,
        context.siteConfig.url,
      );
      await fs.writeFile(
        to,
        inlineGrammar(withExamples, context.siteDir, ruleNotes),
      );
    }
  }
}

module.exports = function d2Llms(context, { ruleNotes }) {
  return {
    name: "d2-llms",
    async postBuild(props) {
      const staging = await fs.mkdtemp(path.join(os.tmpdir(), "d2-llms-"));
      try {
        await prepareDocs(
          path.join(context.siteDir, "docs"),
          path.join(staging, "docs"),
          context,
          ruleNotes,
        );
        const generator = generateLlms(
          { ...context, siteDir: staging },
          {
            docsDir: [{ path: "docs", routeBasePath: "/" }],
            excludeImports: true,
            generateMarkdownFiles: true,
            includeOrder: [
              "tour/intro.md",
              "tour/hello-world.md",
              "tour/**",
              "examples/**",
            ],
            rootContent: `[Read the full D2 documentation in one file](${context.siteConfig.url}/llms-full.txt).`,
          },
        );
        await generator.postBuild(props);
        await verifyOutput(context.outDir);
      } finally {
        await fs.rm(staging, { recursive: true, force: true });
      }
    },
  };
};
