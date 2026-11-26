---
description: Explore D2 syntax with railroad diagrams, worked examples, and the complete structural and lexical grammar.
---

import RailroadExplorer from '@site/src/components/Grammar/RailroadExplorer';
import FullGrammar from '@site/src/components/Grammar/FullGrammar';
import grammarSource from '@site/src/components/Grammar/source.json';
import RuleNotes from '@site/src/components/Grammar/RuleNotes';
import StructuralRules from './_grammar-structure.md';
import LexicalRules from './_grammar-lexical.md';

# Grammar

`build-server` names one object. Add a second hyphen, `build--server`, and D2 reads two objects joined by a connection. A **grammar** describes how to read characters like these as names, connections, and values. You can explore individual rules below or jump to the [full grammar](#full-grammar).

## Read a railroad diagram

Start on the left and follow the track to the right. At a fork, choose one path. A track that loops back lets you read another item. Choose an example to trace its route.

<RailroadExplorer />

## Read the notation

D2 writes its grammar in **Extended Backus–Naur Form (EBNF)**. Each rule, also called a *production*, gives a name to a pattern. The equals sign introduces the pattern and the final period ends the rule. Here is the rule for one entry in a map.

```text
MapEntry = Spread | [ Filter spaces ] EntryKey [ spaces Assignment ] .
```

The vertical bar gives two choices. Take `Spread` for an entry such as `...@theme`. Or take the other path and read an `EntryKey`, with an optional filter before it and an optional assignment after it. That's why both `worker` and `worker: ready` are complete entries.

| Notation | How to read it |
| --- | --- |
| `"."` | Match a literal period in the D2 source. Quotes in the grammar mark characters to type. |
| `A B` | Read rule `A`, then rule `B`. Whitespace in D2 must be allowed by a rule such as `spaces`. |
| `[ A ]` | Read `A` once, or skip it. |
| `{ A }` | Read `A` zero or more times. |
| `( A B )` | Group terms so another operator can apply to the whole group. |
| `"0" … "9"` | Match one character in the inclusive range. |

## Where punctuation changes meaning

The parser keeps track of whether it's reading a key, a value, or a new entry. The same character can do different jobs in each position.

```d2
api.v1: serves v1.0
"api.v1": a single object
```

In the first line, the dot on the left puts `v1` inside `api`. The dot on the right is part of the label. Quoting the key on the second line gives the object the literal name `api.v1`. Escaping the dot as `api\.v1` also works.

| When reading… | What D2 does |
| --- | --- |
| A map or array | A newline or semicolon separates entries. The last entry can end at the closing delimiter or at the end of the file's outer map. A comma is ordinary text, so `[red, blue]` holds one value and `[red; blue]` holds two. |
| An assignment | After a colon, a value starts on the same logical line. A scalar can be followed by a map. In `api: Gateway {shape: cloud}`, the object has both a label and a shape. |
| A connection | An unquoted source name stops before an arrow such as `--` or `->`. Parentheses let you refer to an existing connection. In `(api -> db)[0].style.stroke`, `[0]` selects the first matching connection and `style.stroke` is its property path. |
| A comment | `#` consumes the rest of the line, including any closing brace on that line. Triple double quotes open a block comment at the start of a map or array item. To put a literal hash in a label, quote the label or write `\#`. |
| A string value | Bare text is trimmed at the edges. Both bare and double-quoted values allow `${name}` substitutions. Double quotes preserve spaces. Single quotes keep the dollar sign literal. Write `'Ada''s notebook'` for an apostrophe inside single quotes. |
| A scalar value | A single bare literal can become a number, boolean, `null`, `suspend`, or `unsuspend`. For example, `1/2` is a number and `"1/2"` is a string. In `10${unit}` the parser keeps both the literal text and the substitution. |
| A path or pattern | Each dot in a path needs a following segment. An unquoted `*` can act as a wildcard in a key or a filter value. A quoted or escaped star is literal. A leading `&` or `!&` introduces a filter and needs a condition, such as `&shape: circle`. |
| An import or spread | At the start of a value, `@theme.colors` reads the `colors` field from a file. At the start of an entry, `...@theme` spreads its contents into the surrounding map or array. Quote an object name like `"@theme"` to use the leading `@` literally. |

### Matching a block string's fence

A block string can contain characters that would otherwise end a label. Choose a fence when the body needs a literal pipe. In this example the opening `|` is followed by a fence of two more pipes and a language tag, `ts`. The body can now contain `||`. The first exact copy of the fence followed by a final pipe, `|||`, closes the string.

```d2
example: |||ts
  const chosen = left || right
|||
```

The body is literal, including any dollar signs or hashes. D2 removes common indentation. An omitted tag defaults to Markdown.

## Full grammar

Start at `File` to see how entries fit together. The EBNF and its companion notes define the grammar together. The [structural rules](#structural-rules) explain how to choose between overlapping forms such as keys and connections. The [lexical rules](#lexical-rules) specify details such as Unicode whitespace and how a closing fence matches its opener.

<FullGrammar />

<RuleNotes id="structural-rules" title="Structural rules">
  <StructuralRules components={{pre: 'pre', code: 'code'}} />
</RuleNotes>

<RuleNotes id="lexical-rules" title="Lexical rules">
  <LexicalRules components={{pre: 'pre', code: 'code'}} />
</RuleNotes>

## Checking an implementation

Parsing answers questions about structure. For example, `api.shape: waffle` has a two-part key and a string value. The compiler checks whether `waffle` names a supported shape. It also resolves imports and substitutions and applies styles.

If you're building a parser or editor, check the tree your parser produces as well as which files it accepts. The shared tests specify expected nodes for valid inputs and require a syntax error for invalid ones. Use the reference from the D2 version you're targeting. <a href={`https://github.com/d2lang/d2/tree/${grammarSource.revision}/docs/grammar/testdata`}>Conformance cases</a>
