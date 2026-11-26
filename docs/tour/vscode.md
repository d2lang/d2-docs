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

[Install the D2 CLI](/tour/install/) and open a `.d2` file. Run **Show D2 Preview**
from the Command Palette to see the diagram beside your code. Use **Format Document**
to format the file.

For completions, diagnostics, go-to-definition, and rename, use a D2 CLI that
supports `d2 lsp`. If your CLI is installed outside your `PATH`, set `D2.execPath`
in VS Code to the D2 executable.

[Extension source on GitHub](https://github.com/d2lang/d2-vscode)
