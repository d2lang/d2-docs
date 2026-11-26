const fs = require("node:fs/promises");
const os = require("node:os");
const { escape } = require("minimatch");
const path = require("node:path");
const generateLlms = require("docusaurus-plugin-llms").default;
const inlineExamples = require("./inline-d2-examples.cjs");
const inlineGrammar = require("./inline-grammar.cjs");

async function prepareDocs(context, staging, ruleNotes, docs) {
  const publicSources = new Set(docs.map((doc) => doc.source));
  const ignoreFiles = [];
  async function visit(directory) {
    const source = path.join(context.siteDir, directory);
    await fs.mkdir(path.join(staging, directory), { recursive: true });
    for (const entry of await fs.readdir(source, { withFileTypes: true })) {
      const file = path.posix.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(file);
      } else if (/\.mdx?$/i.test(entry.name)) {
        // Keep partials available to imported pages, but only index public docs.
        if (!publicSources.has("@site/" + file)) {
          ignoreFiles.push(escape(file));
        }
        const markdown = await fs.readFile(
          path.join(context.siteDir, file),
          "utf8",
        );
        const withExamples = inlineExamples(
          markdown,
          context.siteDir,
          context.siteConfig.url,
        );
        await fs.writeFile(
          path.join(staging, file),
          inlineGrammar(withExamples, context.siteDir, ruleNotes),
        );
      }
    }
  }
  await visit("docs");
  return ignoreFiles;
}

module.exports = function d2Llms(context, { ruleNotes }) {
  return {
    name: "d2-llms",
    async postBuild(props) {
      const staging = await fs.mkdtemp(path.join(os.tmpdir(), "d2-llms-"));
      try {
        const docsPlugin = props.plugins.find(
          (plugin) =>
            plugin.name === "docusaurus-plugin-content-docs" &&
            plugin.options.id === "default",
        );
        const { docs } = docsPlugin.content.loadedVersions.find(
          (version) => version.versionName === "current",
        );
        const publicDocs = docs.filter((doc) => !doc.unlisted);
        const ignoreFiles = await prepareDocs(
          context,
          staging,
          ruleNotes,
          publicDocs,
        );
        const generator = generateLlms(
          { ...context, siteDir: staging },
          {
            docsDir: [{ path: "docs", routeBasePath: "/" }],
            ignoreFiles,
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
        const { verifyOutput } = await import("./verify-llms.mjs");
        await verifyOutput(context, publicDocs);
      } finally {
        await fs.rm(staging, { recursive: true, force: true });
      }
    },
  };
};
