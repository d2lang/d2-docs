import * as React from "react";
import clsx from "clsx";

import * as docusaurusThemeCommon from "@docusaurus/theme-common";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import PrismCodeBlock from "@theme-original/CodeBlock";

import * as vscOniguruma from "vscode-oniguruma";
import * as vscTextMate from "vscode-textmate";
import onigWasm from "vscode-oniguruma/release/onig.wasm";

import d2Grammar from "@site/src/d2-vscode/syntaxes/d2.tmLanguage.json";
import markdownGrammar from "@site/src/d2-vscode/syntaxes/markdown.tmLanguage.json";
import lightTheme from "@site/src/d2-vscode/themes/light-color-theme.json";
import darkTheme from "@site/src/d2-vscode/themes/dark-color-theme.json";
import Clipboard from "@site/static/icons/clipboard.svg";
import CheckCircle from "@site/static/icons/checkcircle.svg";
import ExternalLink from "@site/static/icons/externallink.svg";

import metadataConsts from "./metadata-consts";

import goGrammar from "shiki/languages/go.tmLanguage.json";
import jsGrammar from "shiki/languages/javascript.tmLanguage.json";
import shGrammar from "shiki/languages/shellscript.tmLanguage.json";

import pako from "pako";

import "./CodeBlock.scss";

if (!ExecutionEnvironment.canUseDOM) {
  // TODO: real static rendering
  global.window = {};
}

const prismClassNames = new Set([
  "language-bash",
  "language-html",
  "language-js",
  "language-javascript",
]);

export default function CodeBlock(props) {
  if (prismClassNames.has(props.className)) {
    return <PrismCodeBlock showLineNumbers {...props} />;
  }
  return <D2CodeBlock {...props} />;
}

function D2CodeBlock(props) {
  if (!ExecutionEnvironment.canUseDOM) {
    // React requires this to rerender correctly on hydration.
    // See https://github.com/facebook/react/issues/8017#issuecomment-256351955
    // To test, comment out this line and go to a docs page. Switch to dark mode and then
    // reload. The rest of the page will be rendered in dark mode but the code block will
    // still be in light mode because hydration didn't merge the preStyle object...
    return null;
  }

  let lang = props.className;
  if (props.className?.endsWith("-incomplete")) {
    lang = "d2";
  }
  let scope = "plaintext";
  if (props.className) {
    scope = `source.${lang.replace(/^language-/, "")}`;
  }

  const [isExpanded, setIsExpanded] = React.useState(!props.expandeable);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  let [tmGrammar, setTMGrammar] = React.useState(getTextMateGrammar(scope));
  const [clipboardTooltipText, setClipboardTooltipText] =
    React.useState("Copy to clipboard");

  React.useEffect(() => {
    if (tmGrammar) {
      return;
    }
    (async () => {
      try {
        const g = await initTextMateGrammar(scope);
        setTMGrammar && setTMGrammar(g);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => (setTMGrammar = undefined);
  }, []);

  let theme;
  let preStyle = {
    position: "relative",
    lineHeight: "25px",
    // Just a large enough value to fit all
    maxHeight: isExpanded ? "6000px" : "200px",
    overflow: props.expandeable ? "hidden" : "auto",
    transition: "max-height 1s ease",
  };
  const { colorMode } = docusaurusThemeCommon.useColorMode();
  switch (colorMode) {
    case "light":
      theme = lightTheme;
      preStyle.border = "solid #dee1eb 1px";
      break;
    case "dark":
      theme = darkTheme;
      preStyle.border = "solid #606770 1px";
      break;
  }
  preStyle.backgroundColor = theme.colors["editor.background"];

  const children = [];
  if (tmGrammar) {
    // vscode-textmate expects "tokenColors" as "settings".
    theme.settings = theme.tokenColors;
    window.tmRegistry.setTheme(theme);
    window.tmRegistry.ruleStack = vscTextMate.INITIAL;
  }

  const code = props.children;
  const lines = props.children.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i == lines.length - 1 && line === "") {
      continue;
    }

    children.push(
      <span
        style={{
          color: theme.colors["editorLineNumber.foreground"],
          marginRight: "20px",
          userSelect: "none",
          textAlign: "right",
          width: lines.length > 9 ? "20px" : undefined,
          display: "inline-block",
        }}
        key={`ln-${i}`}
      >
        {i + 1}
      </span>
    );

    children.push(
      <span key={`line-${i}`}>{tmGrammar ? highlightLine(tmGrammar, line) : line}</span>
    );

    if (i < lines.length - 1) {
      children.push(<br key={`br-${i}`} />);
    }
  }

  function base64url_encode(buffer) {
    return btoa(Array.from(buffer, (b) => String.fromCharCode(b)).join(""))
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }

  function compressAndEncodeScript() {
    const textEncoder = new TextEncoder();
    const uint8Array = textEncoder.encode(code);
    const deflate = new pako.Deflate({ level: 9, windowBits: -15 });
    deflate.push(uint8Array, true);

    return base64url_encode(deflate.result);
  }

  return (
    <section
      className={clsx("CodeBlock", props.containerClassName, {
        expanded: isExpanded,
        expandeable: props.expandeable,
      })}
    >
      <button
        className="Copy"
        onMouseLeave={() => setClipboardTooltipText("Copy to clipboard")}
        onClick={() => {
          navigator.clipboard.writeText(code);
          setClipboardTooltipText("Copied");
        }}
      >
        <div className="Copy--Tooltip">{clipboardTooltipText}</div>
        <div className="Copy--Arrow"></div>
        {clipboardTooltipText === "Copied" ? <CheckCircle /> : <Clipboard />}
      </button>
      {props.className === "language-d2" && !props.hidePlaygroundLink && (
        <button
          className="PlaygroundLink"
          onClick={() => {
            const playgroundURL = new URL("https://play.d2lang.com");
            playgroundURL.searchParams.set("script", compressAndEncodeScript());
            if (props.layout) {
              playgroundURL.searchParams.set("layout", props.layout);
            }
            if (props.ascii) {
              playgroundURL.searchParams.set("ascii", "1");
            }
            window.open(playgroundURL, "_blank");
          }}
        >
          <div className="PlaygroundLink--Tooltip">{"Open in Playground"}</div>
          <div className="Copy--Arrow"></div>
          <ExternalLink />
        </button>
      )}
      <pre style={preStyle}>{children}</pre>
      {props.expandeable && (
        <div className="ExpandToggleWrapper">
          <button className="ExpandToggle" onMouseDown={toggleExpand}>
            {isExpanded ? "See less" : "See more"}
          </button>
        </div>
      )}
    </section>
  );
}

window.tmGrammars = new Map();

function getTextMateGrammar(scope) {
  const g = window.tmGrammars.get(scope);
  if (g && !(g instanceof Promise)) {
    return g;
  }
  return undefined;
}

async function initTextMateGrammar(scope) {
  let g = window.tmGrammars.get(scope);
  if (g) {
    return await g;
  }

  if (!window.tmRegistry) {
    window.tmRegistry = newTextMateRegistry();
  }
  window.tmRegistry = await window.tmRegistry;

  g = window.tmRegistry.loadGrammar(scope);
  window.tmGrammars.set(scope, g);
  g = await g;
  window.tmGrammars.set(scope, g);
  return g;
}

async function newTextMateRegistry() {
  const resp = await fetch(onigWasm);
  await vscOniguruma.loadWASM(resp);

  return new vscTextMate.Registry({
    onigLib: vscOniguruma,
    loadGrammar: async (scope) => {
      switch (scope) {
        case "source.js":
          return parseRawGrammar(jsGrammar);
        case "source.go":
          return parseRawGrammar(goGrammar);
        case "source.shell":
          return parseRawGrammar(shGrammar);
        case "source.d2":
          return parseRawGrammar(d2Grammar);
        case "text.html.markdown.d2":
          return parseRawGrammar(markdownGrammar);
      }

      return undefined;
    },
  });
}

async function parseRawGrammar(path) {
  const json = await (await fetch(path)).text();
  return vscTextMate.parseRawGrammar(json, path);
}

async function fetch(path) {
  const resp = await window.fetch(path);
  if (!resp.ok) {
    throw new Error(`fetching ${path} failed: ${resp.status} ${resp.statusText}`);
  }
  return resp;
}

const fontStyles = {
  "-1": "inherit",
  0: "normal",
  1: "italic",
  2: "bold",
  3: "underline",
};

function highlightLine(tmGrammar, line) {
  const children = [];
  const colorMap = window.tmRegistry.getColorMap();
  const res = tmGrammar.tokenizeLine2(line, window.tmRegistry.ruleStack);

  for (let j = 0; j < res.tokens.length; j += 2) {
    let style = {};
    const tokenStart = res.tokens[j];
    const tokenMeta = res.tokens[j + 1];

    let tokenEnd = line.length;
    if (j + 2 < res.tokens.length) {
      // The token ends at the beginning of the next token.
      tokenEnd = res.tokens[j + 2];
    }

    const token = line.substring(tokenStart, tokenEnd);
    const fontStyleIndex =
      (tokenMeta & metadataConsts.FONT_STYLE_MASK) >>> metadataConsts.FONT_STYLE_OFFSET;
    const foregroundIndex =
      (tokenMeta & metadataConsts.FOREGROUND_MASK) >>> metadataConsts.FOREGROUND_OFFSET;
    const backgroundIndex =
      (tokenMeta & metadataConsts.BACKGROUND_MASK) >>> metadataConsts.BACKGROUND_OFFSET;

    style.color = colorMap[foregroundIndex];
    style.backgroundColor = colorMap[backgroundIndex];

    const fontStyle = fontStyles[fontStyleIndex];
    switch (fontStyle) {
      case "bold":
        style.fontWeight = fontStyle;
        break;
      case "underline":
        style.textDecoration = fontStyle;
        break;
      default:
        style.fontStyle = fontStyle;
        break;
    }
    children.push(
      <span key={`token-${j}`} style={style}>
        {token}
      </span>
    );
  }
  window.tmRegistry.ruleStack = res.ruleStack;
  return children;
}
