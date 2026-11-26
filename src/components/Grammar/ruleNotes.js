export const ruleNotes = {
  File: {
    description: "A D2 file is a map. Write its entries directly at the top level.",
    example: "api.v1: API\ndb\napi.v1 -> db: reads",
  },
  Map: {
    description:
      "Braces enclose a map of child objects, properties, connections, and comments.",
    example: "service: {\n  api\n  db\n  api -> db\n}",
  },
  MapBody: {
    description:
      "A map contains zero or more entries separated by newlines, semicolons, or line comments.",
    example: "api; db; api -> db",
  },
  Array: {
    description:
      "Square brackets hold values in order. A semicolon or newline separates adjacent items.",
    example: "colors: [red; green; blue]",
  },
  Padding: {
    description: "Whitespace, comments, and extra semicolons can appear before an entry.",
    example: null,
  },
  Boundary: {
    description: "A newline, semicolon, or line comment separates adjacent entries.",
    example: "api; db # Two entries",
  },
  spaces: {
    description: "Zero or more whitespace characters on the same line.",
    example: null,
  },
  MapEntry: {
    description:
      "A map entry declares a key, describes a connection, or spreads an import or substitution.",
    example: "api -> db: reads",
  },
  ArrayEntry: {
    description: "An array item holds a value or spreads an import or substitution.",
    example: "colors: [red; ...${more}]",
  },
  Filter: {
    description: "An ampersand adds a condition to a glob. Use !& to negate it.",
    example: "api1: preview\napi2: stable\napi*: { &label: pre*; style.fill: blue }",
  },
  EntryKey: {
    description:
      "The subject of an entry is a key path, a chain of connections, or a grouped connection.",
    example: "(api -> db)[0].style.stroke: blue",
  },
  keyPath: {
    description:
      "Dots separate key segments. Quote or escape a dot to keep it in the name.",
    example: 'api.v1."read.me"',
  },
  Assignment: {
    description:
      "A key can take a map directly. A colon introduces a value, and a scalar can have a map of properties on the same line.",
    example: "api: Public API { shape: cloud }",
  },
  Value: {
    description: "A value can be a scalar, a map, an array, or an import.",
    example: "theme: @palette.colors",
  },
  Scalar: {
    description:
      "An unquoted scalar can be text, a number, a boolean, null, suspend, or unsuspend. Quotes keep it a string.",
    example: 'enabled: "true"',
  },
  EdgeChain: {
    description:
      "An arrow connects each pair of successive endpoints. Here, both connections share the endpoint api.",
    example: "client -> api -> db",
  },
  EdgeGroup: {
    description:
      "Parentheses group a connection so you can select an index, a property, or both.",
    example: "(api -> db)[0].style.stroke: blue",
  },
  EdgeTargets: {
    description:
      "A chain has a destination and can continue with more arrows and destinations.",
    example: "a -> b -> c -> d",
  },
  EdgeIndex: {
    description:
      "An index counts matching connections from zero. An asterisk selects all matches.",
    example: "(api -> db)[*].style.stroke: blue",
  },
  FirstArrow: {
    description:
      "The first arrow in an ungrouped chain starts with a hyphen or a less-than sign.",
    example: "client <- api",
  },
  Arrow: {
    description:
      "An arrow inside a group or after the first link in a chain. Common forms are --, ->, <-, and <->.",
    example: "client -> api <-> db",
  },
  ArrowTail: {
    description:
      "Hyphens extend an arrow’s shaft. A greater-than sign or asterisk can mark its end.",
    example: "api ---> db",
  },
  EdgeContinuation: {
    description: "A backslash continues the shaft of an arrow onto the next line.",
    example: "api --\\\n  > db",
  },
  Spread: {
    description:
      "Three dots directly before an import or substitution expand its contents into the surrounding map or array.",
    example: "...@theme",
  },
  Import: {
    description:
      "An at sign introduces a file path. Further key segments select a value from that file.",
    example: "colors: @../theme.d2.colors",
  },
  substitution: {
    description:
      "A dollar sign and braces insert a variable by key path into an unquoted or double-quoted value.",
    example: 'label: "Hello ${user.name}"',
  },
  sourceChar: {
    description: "One Unicode scalar value from the decoded source file.",
    example: null,
  },
  nonLF: {
    description: "Any Unicode scalar value except a line feed.",
    example: null,
  },
  newline: {
    description:
      "A line feed (U+000A) separates lines. A CRLF pair contains one line feed.",
    example: null,
  },
  horizontalSpace: {
    description:
      "Any Unicode whitespace character except line feed, including a space, tab, or carriage return.",
    example: null,
  },
  decimalDigit: {
    description: "One ASCII digit from 0 to 9.",
    example: "(api -> db)[2]",
  },
  lineComment: {
    description: "A hash begins a comment that runs to the end of the line.",
    example: "api -> db # reads",
  },
  blockComment: {
    description:
      "At the start of an entry, three double quotes open a comment. The next triple closes it.",
    example: '""" Notes about this diagram """\napi',
  },
  nonQuote: {
    description: "Any Unicode scalar value except a double quote.",
    example: null,
  },
  keyString: {
    description:
      "One key segment can be bare text, a single-quoted or double-quoted string, or a block string.",
    example: '"api.v1": Service',
  },
  valueString: {
    description:
      "A scalar can be written as bare text, a single-quoted or double-quoted string, or a block string.",
    example: "api: serves v1.0",
  },
  unquotedKey: {
    description:
      "Spaces inside a bare key stay in the name. An unescaped dot separates segments, and an unescaped star marks a wildcard.",
    example: "edge service.v1",
  },
  keyStart: {
    description: "The first character, escape, or line continuation of a bare key.",
    example: null,
  },
  keyUnit: {
    description:
      "A character, escape, or line continuation inside a bare key. An interior quote can be literal.",
    example: null,
  },
  unquotedValue: {
    description:
      "Dots, colons, and arrows are literal in a bare value. A dollar sign starts a substitution, and a star can match labels in a filter.",
    example: "caption: pre*\napi*: { &label: pre*; style.fill: blue }",
  },
  valueStart: {
    description:
      "The first part of a bare value can be a character, substitution, escape, or line continuation.",
    example: null,
  },
  valueUnit: {
    description:
      "One more part of a bare value. A star can act as a wildcard in a filter.",
    example: null,
  },
  commonBareChar: {
    description:
      "Characters shared by the interiors of bare keys and values, including spaces and quotes.",
    example: null,
  },
  commonBareStart: {
    description: "Characters that can start both a bare key and a bare value.",
    example: null,
  },
  nonASCIINonSpace: {
    description: "Any non-ASCII Unicode scalar value except whitespace.",
    example: null,
  },
  escape: {
    description:
      "A backslash escapes the next character. An escaped dot stays in the same key segment.",
    example: "api\\.v1: Service",
  },
  continuedLine: {
    description:
      "In bare text, a backslash immediately followed by a line feed removes the break and the next line’s indentation.",
    example: "api: first \\\n  second",
  },
  singleQuotedString: {
    description:
      "Single quotes keep dollar signs and backslashes literal, except for a backslash before a line feed. Double an apostrophe to write one.",
    example: "owner: 'Ada''s ${service}'",
  },
  singleChar: {
    description: "Any Unicode scalar value except an apostrophe or a line feed.",
    example: null,
  },
  doubleQuotedKey: {
    description:
      "Double quotes keep punctuation in one key segment. Dollar signs and braces stay literal.",
    example: '"api.v1": Service',
  },
  doubleQuotedValue: {
    description: "Double quotes preserve spaces and allow escapes and substitutions.",
    example: 'api: "Hello ${name}"',
  },
  doubleChar: {
    description:
      "An ordinary character inside double quotes. Quotes, backslashes, dollar signs, and line feeds have separate rules.",
    example: null,
  },
  blockString: {
    description:
      "A pipe opens a block of literal text. An optional fence sets its closing delimiter, and a tag identifies the content.",
    example: "code: |||ts\n  const value = a || b\n|||",
  },
  fenceChar: {
    description:
      "A fence character can follow the opening pipe. Whitespace, letters, decimal digits, and underscores end the fence.",
    example: null,
  },
  nonASCIIFenceChar: {
    description:
      "Any non-ASCII Unicode scalar value except whitespace, letters, and decimal digits.",
    example: null,
  },
  blockTag: {
    description:
      "A tag identifies the contents of a block and ends at the first whitespace character.",
    example: "label: |md\n  **Public API**\n|",
  },
  tagStart: {
    description:
      "A block tag starts with a Unicode letter, a decimal digit, or an underscore.",
    example: null,
  },
  nonASCIITagStart: {
    description: "Any non-ASCII Unicode letter or decimal digit.",
    example: null,
  },
  tagChar: {
    description:
      "After the first character, a block tag accepts any non-whitespace character.",
    example: null,
  },
};
