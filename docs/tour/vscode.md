---
pagination_next: tour/vim
---
# VS Code extension

[d2lang](https://marketplace.visualstudio.com/items?itemName=d2lang.d2lang) is the
official D2 extension for VS Code. You can also install it from the command line.

```shell
code --install-extension d2lang.d2lang
```

If you have the old `terrastruct.d2` extension, uninstall it when you switch.
VS Code treats the two listings as separate extensions.

The extension includes D2.js and the D2 language server. Open a `.d2` file and
run **Show D2 Preview** from the Command Palette to see the diagram beside your
code. Use **Format Document** to format the file or **Export Diagram As...** to
save it as SVG, PNG, PDF, PowerPoint, GIF, or text. These commands work offline.

The language server starts when you open a D2 file and provides completions,
diagnostics, go-to-definition, references, and rename. To draw diagrams with
your AI assistant, use the bundled [MCP server](/tour/mcp/).

[Extension source on GitHub](https://github.com/d2lang/d2-vscode)
