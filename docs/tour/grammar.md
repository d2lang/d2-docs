---
description: Explore D2 syntax one rule at a time, with diagrams, examples, and the complete EBNF.
hide_table_of_contents: true
---

import RuleAtlas from '@site/src/components/Grammar/RuleAtlas';
import FullGrammar from '@site/src/components/Grammar/FullGrammar';

# Grammar

D2’s grammar defines how to write shapes, connections, and their properties in a `.d2` file.

<span id="railroad-diagrams" />

## Rule Atlas {#atlas}

Read each diagram from left to right. Branches show choices. Loops show repetition.

<RuleAtlas />

## Full grammar

In Extended Backus–Naur Form (EBNF), read `|` as *or*, `[ ]` as *optional*, and `{ }` as *zero or more*.

<FullGrammar />
