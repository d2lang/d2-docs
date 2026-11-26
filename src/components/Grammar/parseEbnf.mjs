// Read the Go-style EBNF used by D2. Preserve literal spellings for display:
// a range such as "\\u0000" … "\\U0010FFFF" should stay legible in a diagram.
export function parseEbnf(source) {
  const lexer =
    /[ \t\r\n]+|\/\/[^\n]*|\/\*[\s\S]*?\*\/|[_\p{L}][_\p{L}\p{Nd}]*|"(?:[^"\\\n]|\\(?:[abfnrtv"\\]|[0-3][0-7]{2}|x[\da-fA-F]{2}|u[\da-fA-F]{4}|U[\da-fA-F]{8}))*"|`[^`]*`|[=.|…()[\]{}]/uy;
  const isName = (text) => /^[_\p{L}]/u.test(text);
  const isLiteral = (text) => text.startsWith('"') || text.startsWith("`");

  function fail(message, position) {
    const lines = source.slice(0, position).split("\n");
    throw new SyntaxError(`EBNF ${lines.length}:${lines.at(-1).length + 1}: ${message}`);
  }

  function nextToken() {
    while (lexer.lastIndex < source.length) {
      const start = lexer.lastIndex;
      const match = lexer.exec(source);
      if (!match) fail(`unexpected character ${JSON.stringify(source[start])}`, start);
      const text = match[0];
      if (!/^[\s/]/u.test(text)) return { text, start };
    }
    return { text: "", start: source.length };
  }

  let token = nextToken();

  function take() {
    const previous = token;
    token = nextToken();
    return previous;
  }

  function expect(text) {
    if (token.text !== text) fail(`expected ${JSON.stringify(text)}`, token.start);
    return take();
  }

  function sequence() {
    const children = [];
    while (true) {
      if (isName(token.text)) {
        children.push({ type: "ref", text: take().text });
      } else if (isLiteral(token.text)) {
        const literal = take().text;
        if (token.text === "…") {
          take();
          if (!isLiteral(token.text)) fail("expected a range endpoint", token.start);
          children.push({ type: "range", from: literal, to: take().text });
        } else {
          children.push({ type: "literal", text: literal });
        }
      } else if (token.text === "(" || token.text === "[" || token.text === "{") {
        const opener = take().text;
        const child = expression();
        expect({ "(": ")", "[": "]", "{": "}" }[opener]);
        if (opener === "(") children.push(child);
        else children.push({ type: opener === "[" ? "optional" : "repeat", child });
      } else {
        break;
      }
    }
    if (!children.length) fail("expected a term", token.start);
    return children.length === 1 ? children[0] : { type: "sequence", children };
  }

  function expression() {
    const children = [sequence()];
    while (token.text === "|") {
      take();
      children.push(sequence());
    }
    return children.length === 1 ? children[0] : { type: "choice", children };
  }

  const rules = [];
  const names = new Set();
  while (token.text) {
    if (!isName(token.text)) fail("expected a rule name", token.start);
    const { text: name, start } = take();
    if (names.has(name)) fail(`duplicate rule ${name}`, start);
    names.add(name);
    expect("=");
    const body = token.text === "." ? { type: "empty" } : expression();
    const end = expect(".").start + 1;
    rules.push({ name, expression: body, source: source.slice(start, end) });
  }
  return rules;
}
