const { readFileSync } = require("node:fs");
const path = require("node:path");

module.exports = function transformGrammar(markdown, siteDir, ruleNotes) {
  // Use the same rule descriptions and examples as the interactive Rule Atlas.
  const withRules = markdown.replace(/^<RuleAtlas\s*\/>$/m, () => {
    const rules = Object.entries(ruleNotes).map(([name, rule]) => {
      const entries = ["### " + name, rule.description];
      if (rule.example != null)
        entries.push("```d2\n" + rule.example + "\n```");
      return entries.join("\n\n");
    });
    return ["## Rule Atlas", ...rules].join("\n\n");
  });

  return withRules.replace(/^<FullGrammar\s*\/>$/m, () =>
    ["structure.ebnf", "lexical.ebnf"]
      .map((name) => {
        const content = readFileSync(
          path.join(siteDir, "static/grammar", name),
          "utf8",
        ).trimEnd();
        return "### " + name + "\n\n```ebnf\n" + content + "\n```";
      })
      .join("\n\n"),
  );
};
