import React, { memo, useEffect, useRef, useState } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import { grammarFiles } from "./grammar";
import ProductionDiagram, { diagramSize } from "./ProductionDiagram";
import styles from "./GrammarDiagram.module.css";

const Drawing = memo(ProductionDiagram);
const groups = grammarFiles.map(({ name, rules }) => ({
  label: name === "structure.ebnf" ? "Structural" : "Lexical",
  names: rules.map((rule) => rule.name),
}));
const names = new Set(groups.flatMap((group) => group.names));
const maxZoom = 3;

function fitScale(frame) {
  return Math.min(
    frame.clientWidth / diagramSize.width,
    frame.clientHeight / diagramSize.height,
    1
  );
}

// Measure in SVG coordinates so the same point stays under the cursor as the
// drawing zooms, including when a fitted drawing is centered in the viewport.
function setView(frame, svg, scale, point, offset) {
  svg.style.width = diagramSize.width * scale + "px";
  svg.style.height = diagramSize.height * scale + "px";
  const drawing = svg.getBoundingClientRect();
  const viewport = frame.getBoundingClientRect();
  frame.scrollLeft += drawing.left - viewport.left + point.x * scale - offset.x;
  frame.scrollTop += drawing.top - viewport.top + point.y * scale - offset.y;
}

function zoomAt(frame, svg, requested, clientX, clientY) {
  const scale = Math.max(fitScale(frame), Math.min(maxZoom, requested));
  const viewport = frame.getBoundingClientRect();
  const drawing = svg.getBoundingClientRect();
  const current = drawing.width / diagramSize.width;
  const x = clientX ?? viewport.left + frame.clientWidth / 2;
  const y = clientY ?? viewport.top + frame.clientHeight / 2;
  setView(
    frame,
    svg,
    scale,
    { x: (x - drawing.left) / current, y: (y - drawing.top) / current },
    { x: x - viewport.left, y: y - viewport.top }
  );
  return scale;
}

function focusRule(frame, svg, name) {
  if (name === "File") {
    setView(
      frame,
      svg,
      1,
      { x: 0, y: diagramSize.entryY },
      { x: 0, y: frame.clientHeight * 0.43 }
    );
    return;
  }
  const marker = svg.querySelector(`[data-production="${name}"] [data-rule-focus]`);
  if (!marker) return;
  const box = marker.getBoundingClientRect();
  const drawing = svg.getBoundingClientRect();
  const current = drawing.width / diagramSize.width;
  const point = {
    x: (box.left - drawing.left) / current,
    y: (box.bottom - drawing.top) / current,
  };
  setView(frame, svg, 1, point, {
    x: Math.min(42, frame.clientWidth * 0.1),
    y: frame.clientHeight * 0.43,
  });
}

export default function GrammarDiagram() {
  const { collectAnchor } = useBrokenLinks();
  for (const name of names) collectAnchor("diagram-" + name);
  const isBrowser = useIsBrowser();
  const frame = useRef(null);
  const svg = useRef(null);
  const drag = useRef(null);
  const [scale, setScale] = useState(1);

  function zoom(requested) {
    setScale(zoomAt(frame.current, svg.current, requested));
  }
  function go(name) {
    const hash = "#diagram-" + name;
    if (window.location.hash !== hash) {
      window.history.pushState(window.history.state, "", hash);
    }
    focusRule(frame.current, svg.current, name);
    setScale(1);
  }

  useEffect(() => {
    const viewport = frame.current;
    const drawing = svg.current;
    function followHash() {
      const hash = window.location.hash;
      const name = hash.startsWith("#diagram-") && hash.slice(9);
      if (name && names.has(name)) {
        focusRule(viewport, drawing, name);
        setScale(1);
        viewport.parentElement.scrollIntoView({ block: "nearest" });
      } else if (!hash) {
        focusRule(viewport, drawing, "File");
        setScale(1);
      }
    }
    // Initialize the canvas even when the initial page URL points to the EBNF.
    focusRule(viewport, drawing, "File");
    followHash();
    window.addEventListener("hashchange", followHash);
    function onWheel(event) {
      if (!event.ctrlKey) return; // Ordinary wheel and trackpad gestures pan natively.
      event.preventDefault();
      const current = drawing.getBoundingClientRect().width / diagramSize.width;
      setScale(
        zoomAt(
          viewport,
          drawing,
          current * Math.exp(-event.deltaY / 180),
          event.clientX,
          event.clientY
        )
      );
    }
    viewport.addEventListener("wheel", onWheel, { passive: false });
    let pinch;
    function onTouch(event) {
      if (event.touches.length !== 2) {
        pinch = null;
        return;
      }
      const [a, b] = event.touches;
      const x = (a.clientX + b.clientX) / 2;
      const y = (a.clientY + b.clientY) / 2;
      const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      if (!distance) return;
      if (event.cancelable) event.preventDefault();
      if (!pinch) {
        const box = drawing.getBoundingClientRect();
        const scale = box.width / diagramSize.width;
        pinch = {
          distance,
          scale,
          point: { x: (x - box.left) / scale, y: (y - box.top) / scale },
        };
        return;
      }
      const box = viewport.getBoundingClientRect();
      const scale = Math.min(
        maxZoom,
        Math.max(fitScale(viewport), (pinch.scale * distance) / pinch.distance)
      );
      setView(viewport, drawing, scale, pinch.point, { x: x - box.left, y: y - box.top });
      setScale(scale);
    }
    const touchEvents = ["touchstart", "touchmove", "touchend", "touchcancel"];
    for (const type of touchEvents)
      viewport.addEventListener(type, onTouch, { passive: false });
    return () => {
      window.removeEventListener("hashchange", followHash);
      viewport.removeEventListener("wheel", onWheel);
      for (const type of touchEvents) viewport.removeEventListener(type, onTouch);
    };
  }, []);

  function startDrag(event) {
    if (event.pointerType !== "mouse" || event.button !== 0 || event.target.closest("a"))
      return;
    const viewport = frame.current;
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop,
    };
    viewport.setPointerCapture(event.pointerId);
    viewport.focus({ preventScroll: true });
    viewport.dataset.dragging = "true";
    event.preventDefault();
  }
  function moveDrag(event) {
    if (!drag.current) return;
    frame.current.scrollLeft = drag.current.left + drag.current.x - event.clientX;
    frame.current.scrollTop = drag.current.top + drag.current.y - event.clientY;
  }
  function endDrag() {
    drag.current = null;
    delete frame.current.dataset.dragging;
  }
  function onKey(event) {
    if (event.target !== frame.current || event.ctrlKey || event.metaKey || event.altKey)
      return;
    switch (event.key) {
      case "+":
      case "=":
        zoom(scale * 1.5);
        break;
      case "-":
        zoom(scale / 1.5);
        break;
      case "0":
        zoom(fitScale(frame.current));
        break;
      case "Home":
        go("File");
        break;
      default:
        return; // Arrow and Page keys scroll the focused viewport.
    }
    event.preventDefault();
  }

  return (
    <div className={styles.viewer}>
      <div className={styles.toolbar}>
        {isBrowser ? (
          <>
            <select
              aria-label="Go to rule"
              value=""
              onChange={(event) => go(event.target.value)}
            >
              <option value="" disabled>
                Go to rule…
              </option>
              {groups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.names.map((name) => (
                    <option key={name}>{name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <div className={styles.controls}>
              <button
                type="button"
                title="Start at File"
                aria-label="Start at File"
                onClick={() => go("File")}
              >
                Start
              </button>
              <button
                type="button"
                className={styles.step}
                aria-label="Zoom out"
                title="Zoom out"
                onClick={() => zoom(scale / 1.5)}
              >
                −
              </button>
              <output aria-label="Zoom level">{Math.round(scale * 100)}%</output>
              <button
                type="button"
                className={styles.step}
                aria-label="Zoom in"
                title="Zoom in"
                disabled={scale >= maxZoom}
                onClick={() => zoom(scale * 1.5)}
              >
                +
              </button>
              <button
                type="button"
                aria-label="Fit diagram"
                title="Fit diagram"
                onClick={() => zoom(fitScale(frame.current))}
              >
                Fit
              </button>
            </div>
          </>
        ) : (
          <>
            <details className={styles.index}>
              <summary>Go to rule</summary>
              {groups.map((group) => (
                <div key={group.label}>
                  <strong>{group.label}</strong>
                  <ul>
                    {group.names.map((name) => (
                      <li key={name}>
                        <a href={"#diagram-" + name}>{name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </details>
            <a href="#diagram-File">Start at File</a>
          </>
        )}
      </div>
      <div
        className={styles.frame}
        ref={frame}
        role="region"
        aria-label="D2 grammar diagram"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onLostPointerCapture={endDrag}
      >
        <div className={styles.sheet}>
          <Drawing svgRef={svg} />
        </div>
      </div>
    </div>
  );
}
