---
description: Explore the D2 grammar in one interactive railroad diagram or read the complete EBNF.
---

import GrammarDiagram from '@site/src/components/Grammar/GrammarDiagram';
import FullGrammar from '@site/src/components/Grammar/FullGrammar';
import grammarSource from '@site/src/components/Grammar/source.json';

# Grammar

D2’s grammar defines how to write shapes, connections, and their properties in a `.d2` file.

## Railroad diagram {#railroad-diagrams}

Start at [`File`](#diagram-File) and follow the track. Branches show choices. Loops show repetition.

<GrammarDiagram />

## Full grammar

In Extended Backus–Naur Form (EBNF), read `|` as *or*, `[ ]` as *optional*, and `{ }` as *zero or more*.

<FullGrammar />

<a href={`https://github.com/d2lang/d2/tree/${grammarSource.revision}/docs/grammar/testdata`}>Conformance cases</a>
