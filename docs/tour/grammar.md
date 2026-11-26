---
description: D2 railroad diagrams and the complete language grammar.
---

import RailroadExplorer from '@site/src/components/Grammar/RailroadExplorer';
import DiagramAtlas from '@site/src/components/Grammar/DiagramAtlas';
import FullGrammar from '@site/src/components/Grammar/FullGrammar';
import grammarSource from '@site/src/components/Grammar/source.json';
import RuleNotes from '@site/src/components/Grammar/RuleNotes';
import StructuralRules from './_grammar-structure.md';
import LexicalRules from './_grammar-lexical.md';

# Grammar

D2’s grammar defines how to write shapes, connections, and their properties in a `.d2` file.

## Railroad diagrams

Read left to right. Branches show choices. Loops show repetition.

<DiagramAtlas />

<RuleNotes id="worked-examples" title="Worked examples">
  <RailroadExplorer />
</RuleNotes>

## Full grammar

Start at [`File`](#diagram-File). In Extended Backus–Naur Form (EBNF), read `|` as *or*, `[ ]` as *optional*, and `{ }` as *zero or more*.

<FullGrammar />

<RuleNotes id="structural-rules" title="Structural rules">
  <StructuralRules components={{pre: 'pre', code: 'code'}} />
</RuleNotes>

<RuleNotes id="lexical-rules" title="Lexical rules">
  <LexicalRules components={{pre: 'pre', code: 'code'}} />
</RuleNotes>

<a href={`https://github.com/d2lang/d2/tree/${grammarSource.revision}/docs/grammar/testdata`}>Parser conformance tests</a>
