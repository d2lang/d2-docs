---
description: D2 railroad diagrams and the complete language grammar.
---

import RailroadExplorer from '@site/src/components/Grammar/RailroadExplorer';
import FullGrammar from '@site/src/components/Grammar/FullGrammar';
import grammarSource from '@site/src/components/Grammar/source.json';
import RuleNotes from '@site/src/components/Grammar/RuleNotes';
import StructuralRules from './_grammar-structure.md';
import LexicalRules from './_grammar-lexical.md';

# Grammar

`build-server` names one object. `build--server` connects two.

## Railroad diagrams

Read left to right. Branches show choices. Loops show repetition.

<RailroadExplorer />

## Full grammar

Start at `File`. In Extended Backus–Naur Form (EBNF), read `|` as *or*, `[ ]` as *optional*, and `{ }` as *zero or more*.

<FullGrammar />

<RuleNotes id="structural-rules" title="Structural rules">
  <StructuralRules components={{pre: 'pre', code: 'code'}} />
</RuleNotes>

<RuleNotes id="lexical-rules" title="Lexical rules">
  <LexicalRules components={{pre: 'pre', code: 'code'}} />
</RuleNotes>

<a href={`https://github.com/d2lang/d2/tree/${grammarSource.revision}/docs/grammar/testdata`}>Parser conformance tests</a>
