import React, { useEffect, useRef } from "react";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import styles from "./RuleNotes.module.css";

export default function RuleNotes({ id, title, children }) {
  const details = useRef(null);
  useBrokenLinks().collectAnchor(id);
  useEffect(() => {
    function revealTarget() {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target && details.current.contains(target) && !details.current.open) {
        details.current.open = true;
        target.scrollIntoView();
      }
    }
    revealTarget();
    window.addEventListener("hashchange", revealTarget);
    return () => window.removeEventListener("hashchange", revealTarget);
  }, []);

  return (
    <details ref={details} className={styles.notes} aria-labelledby={id + "-title"}>
      <summary>
        <h3 id={id + "-title"}>{title}</h3>
      </summary>
      <div id={id} className={styles.prose}>
        {children}
      </div>
    </details>
  );
}
