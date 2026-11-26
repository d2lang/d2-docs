import React, { useRef, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useIsBrowser from "@docusaurus/useIsBrowser";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import { grammarFiles } from "./grammar";
import source from "./source.json";
import styles from "./FullGrammar.module.css";

const names = new Set(
  grammarFiles.flatMap((file) => file.rules.map((rule) => rule.name))
);

function linkedSource(contents) {
  // Preserve every source character. Quoted terminals and comments are opaque,
  // even when they contain text that looks like a rule name.
  const tokens = contents.split(/(\/\/[^\n]*|"(?:\\.|[^"\\])*"|[A-Za-z][A-Za-z0-9]*)/g);
  return tokens.map((token, i) => {
    if (token.startsWith("//"))
      return (
        <span key={i} className={styles.comment}>
          {token}
        </span>
      );
    if (token.startsWith('"'))
      return (
        <span key={i} className={styles.terminal}>
          {token}
        </span>
      );
    if (!names.has(token)) return token;

    const id = "rule-" + token;
    const defines = /^[ \t]*=/.test(tokens[i + 1]);
    return (
      <a
        key={i}
        id={defines ? id : undefined}
        href={defines ? "#diagram-" + token : "#" + id}
        title={defines ? "Open " + token + " in the Rule Atlas" : undefined}
        className={defines ? styles.definition : styles.reference}
      >
        {token}
      </a>
    );
  });
}

function GrammarFile({ file }) {
  const anchor = "grammar-" + file.name.split(".")[0];
  const { collectAnchor } = useBrokenLinks();
  collectAnchor(anchor);
  for (const rule of file.rules) collectAnchor("rule-" + rule.name);
  const code = useRef(null);
  const canCopy = useIsBrowser();
  const [copyStatus, setCopyStatus] = useState("");
  const download = useBaseUrl("/grammar/" + file.name);
  async function copy() {
    try {
      await navigator.clipboard.writeText(file.contents);
      setCopyStatus("Copied");
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      setCopyStatus("Text selected. Use your copy command.");
    }
  }

  return (
    <section id={anchor} className={styles.file} aria-label={file.name}>
      <header className={styles.fileBar}>
        <div className={styles.fileLabel}>
          <span className={styles.filename}>{file.name}</span>
          <span className={styles.count}>{file.rules.length} rules</span>
        </div>
        <div className={styles.actions}>
          {canCopy && (
            <button
              type="button"
              className={styles.copy}
              aria-label={"Copy " + file.name}
              onClick={copy}
              onBlur={() => setCopyStatus("")}
            >
              {copyStatus === "Copied" ? "Copied" : "Copy"}
            </button>
          )}
          <a href={download} download={file.name} aria-label={"Download " + file.name}>
            Download
          </a>
        </div>
      </header>
      <span
        role="status"
        className={
          copyStatus.startsWith("Text") ? styles.copyFallback : styles.visuallyHidden
        }
      >
        {copyStatus}
      </span>
      <pre className={styles.listing}>
        <code ref={code}>{linkedSource(file.contents)}</code>
      </pre>
    </section>
  );
}

export default function FullGrammar() {
  return (
    <div className={styles.fullGrammar}>
      <a
        className={styles.source}
        href={"https://github.com/d2lang/d2/tree/" + source.revision + "/docs/grammar"}
      >
        D2 source · <span>{source.revision.slice(0, 7)}</span>
      </a>
      {grammarFiles.map((file) => (
        <GrammarFile key={file.name} file={file} />
      ))}
    </div>
  );
}
