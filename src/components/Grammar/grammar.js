import structure from "@site/static/grammar/structure.ebnf";
import lexical from "@site/static/grammar/lexical.ebnf";
import { parseEbnf } from "./parseEbnf.mjs";

export const grammarFiles = [
  { name: "structure.ebnf", contents: structure, rules: parseEbnf(structure) },
  { name: "lexical.ebnf", contents: lexical, rules: parseEbnf(lexical) },
];
