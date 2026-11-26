import React, { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import { grammarFiles } from "./grammar";
import ProductionDiagram from "./ProductionDiagram";
import { ruleNotes } from "./ruleNotes";
import styles from "./RuleAtlas.module.css";

const groups = grammarFiles.map(({ name, rules }) => ({
  label: name === "structure.ebnf" ? "Structural" : "Lexical",
  rules,
}));
const allRules = groups.flatMap(({ rules }) => rules);
const ruleNames = new Set(allRules.map(({ name }) => name));
const initialRule = "keyPath";

function diagramName(hash) {
  if (hash.startsWith("#diagram-") && ruleNames.has(hash.slice(9))) return hash.slice(9);
}

const Drawing = memo(ProductionDiagram);
const usePageLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function RulePanel({ rule, group, current, ready, previous, goBack }) {
  const { description, example } = ruleNotes[rule.name] || {};
  const id = "diagram-" + rule.name;
  if (ready && !current) return <section id={id} className={styles.panel} />;
  return (
    <section
      id={id}
      aria-labelledby={id + "-title"}
      className={styles.panel}
      data-active={current || undefined}
      data-default={rule.name === initialRule || undefined}
    >
      <div className={styles.meta}>
        <span>{group} rule</span>
        {ready && (
          <button
            className={styles.back}
            type="button"
            disabled={!previous}
            onClick={goBack}
          >
            Previous rule
          </button>
        )}
      </div>
      <h2 className={styles.title} id={id + "-title"} tabIndex={-1}>
        {rule.name}
      </h2>
      {description && <p className={styles.description}>{description}</p>}
      <Drawing rule={rule} />
      <div className={styles.legend}>
        <span>
          <i className={styles.literal} />
          Literal text
        </span>
        <span>
          <i className={styles.reference} />
          Another rule
        </span>
        {rule.source.includes("…") && (
          <span>
            <i className={styles.range} />
            Character range
          </span>
        )}
      </div>
      <details open className={styles.notation}>
        <summary>EBNF notation</summary>
        <pre>
          <code>{rule.source}</code>
        </pre>
      </details>
      {example != null && (
        <div className={styles.example}>
          <strong>D2 example</strong>
          <pre>
            <code>{example}</code>
          </pre>
        </div>
      )}
    </section>
  );
}

export default function RuleAtlas() {
  const { collectAnchor } = useBrokenLinks();
  collectAnchor("atlas");
  for (const rule of allRules) collectAnchor("diagram-" + rule.name);

  const [ready, setReady] = useState(false);
  const [path, setPath] = useState([initialRule]);
  const [query, setQuery] = useState("");
  const active = path[path.length - 1];
  const nav = useRef(null);
  const pendingScroll = useRef(null);

  useEffect(() => {
    function readLocation() {
      const name = diagramName(window.location.hash);
      if (name) {
        pendingScroll.current = name;
        const saved = window.history.state?.d2RuleAtlas;
        setPath(saved?.[saved.length - 1] === name ? saved : [name]);
        setQuery("");
      } else if (!window.location.hash || window.location.hash === "#atlas") {
        setPath([initialRule]);
        setQuery("");
      }
    }
    readLocation();
    setReady(true);
    window.addEventListener("hashchange", readLocation);
    window.addEventListener("popstate", readLocation);
    return () => {
      window.removeEventListener("hashchange", readLocation);
      window.removeEventListener("popstate", readLocation);
    };
  }, []);

  // A native fragment jump can target a hidden panel. Align it below the
  // fixed navbar once React has mounted the selected production.
  usePageLayoutEffect(() => {
    if (ready && pendingScroll.current === active) {
      document.getElementById("diagram-" + active)?.scrollIntoView({ block: "start" });
      pendingScroll.current = null;
    }
  }, [ready, path]);

  // Keep the current name in sight without scrolling the surrounding article.
  useEffect(() => {
    const list = nav.current;
    const selected = list?.querySelector('[aria-current="true"]');
    if (!selected || !list.clientHeight) return;
    const item = selected.getBoundingClientRect();
    const area = list.getBoundingClientRect();
    if (item.top < area.top) list.scrollTop -= area.top - item.top;
    if (item.bottom > area.bottom) list.scrollTop += item.bottom - area.bottom;
  }, [active, ready]);

  function go(next, { previous = false, clear = true, focus = false } = {}) {
    if (clear) setQuery("");
    if (next === active) return;
    const nextPath = previous ? path.slice(0, -1) : [...path, next];
    window.history.pushState(
      { ...window.history.state, d2RuleAtlas: nextPath },
      "",
      "#diagram-" + next
    );
    setPath(nextPath);
    if (focus) {
      requestAnimationFrame(() => {
        const panel = document.getElementById("diagram-" + next);
        const heading = document.getElementById("diagram-" + next + "-title");
        if (!heading || !panel) return;
        heading.focus({ preventScroll: true });
        const bounds = heading.getBoundingClientRect();
        const inset = parseFloat(getComputedStyle(panel).scrollMarginTop);
        if (bounds.top < inset || bounds.bottom > window.innerHeight) {
          panel.scrollIntoView({ block: "start" });
        }
      });
    }
  }

  function followRule(event) {
    if (
      !ready ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link = event.target.closest("a");
    const name = diagramName(link?.getAttribute("href") || "");
    if (!name) return;
    event.preventDefault();
    go(name, {
      clear: !nav.current?.contains(link),
      focus: Boolean(link.closest("svg")),
    });
  }

  const term = query.trim().toLowerCase();
  const visibleGroups = groups
    .map(({ label, rules }) => ({
      label,
      rules: term ? rules.filter(({ name }) => name.toLowerCase().includes(term)) : rules,
    }))
    .filter(({ rules }) => rules.length);

  return (
    <div
      id="atlas"
      className={styles.atlas}
      data-ready={ready || undefined}
      onClick={followRule}
    >
      <div className={styles.box}>
        <div className={styles.sidebar}>
          {ready && (
            <>
              <label className={styles.search}>
                Find a rule
                <input
                  type="search"
                  placeholder="e.g. edge or string"
                  autoComplete="off"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && visibleGroups.length) {
                      event.preventDefault();
                      go(visibleGroups[0].rules[0].name, { clear: false, focus: true });
                    }
                  }}
                />
              </label>
              <label className={styles.mobilePicker}>
                Grammar rule
                <select value={active} onChange={(event) => go(event.target.value)}>
                  {groups.map(({ label, rules }) => (
                    <optgroup key={label} label={label + " rules"}>
                      {rules.map(({ name }) => (
                        <option key={name}>{name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>
            </>
          )}
          <nav className={styles.list} aria-label="Grammar rules" ref={nav}>
            {visibleGroups.map(({ label, rules }) => (
              <div key={label}>
                <strong>{label} rules</strong>
                <ul>
                  {rules.map(({ name }) => (
                    <li key={name}>
                      <a
                        href={"#diagram-" + name}
                        aria-current={ready && active === name ? "true" : undefined}
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {!visibleGroups.length && <span role="status">No matching rules.</span>}
          </nav>
        </div>
        <div className={styles.panels}>
          {groups.map(({ label, rules }) =>
            rules.map((rule) => (
              <RulePanel
                key={rule.name}
                rule={rule}
                group={label}
                current={rule.name === active}
                ready={ready}
                previous={path.length > 1}
                goBack={() => go(path[path.length - 2], { previous: true, focus: true })}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
