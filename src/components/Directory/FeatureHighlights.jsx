import React from "react";

import Features from "@site/src/components/Features/Features";

import Sketch from "@site/static/blog/sketch/main.svg2";
import Animations from "@site/static/img/generated/johnwick.svg2";
import Latex from "@site/static/img/generated/text-2.svg2";
import Language from "@site/static/img/generated/language.svg2";
import Code from "@site/static/img/generated/code.svg2";
import Markdown from "@site/static/img/screenshots/markdown-2.png";
import Tables from "@site/static/img/generated/tables-3.svg2";

import Themes from "@site/static/img/screenshots/themes/theme_overview.png";

const featureHighlights = [
  {
    title: "Production-ready themes",
    description:
      "Themes by professional designers, each unique. Effortlessly ready for blogs, wikis, and presentations.",
    img: Themes,
    href: "/tour/themes/",
  },
  {
    title: "Sketch mode",
    description: "Our take on a beautiful, hand-drawn aesthetic.",
    img: Sketch,
    href: "/tour/sketch/",
  },
  {
    title: "Animations",
    description: "D2 is the only language that can produce animated diagrams from text.",
    img: Animations,
    href: "/tour/animation/",
  },
  {
    title: "LaTeX",
    description: "Perfect for academic use and research papers.",
    img: Latex,
    href: "/tour/text/#latex",
  },
  {
    title: "Any language",
    description:
      "Make diagrams in English, Chinese, French, or even emojis, D2 supports almost all languages.",
    img: Language,
    href: "/tour/text/#most-languages-are-supported",
  },
  {
    title: "Code snippets",
    description:
      "Made for software diagrams. Syntax highlighted code right in the diagram.",
    img: Code,
    href: "/tour/text/#code",
  },
  {
    title: "Markdown",
    description: "Include longform explanations with Markdown.",
    img: Markdown,
    href: "/tour/text/#standalone-text-is-markdown",
  },
  {
    title: "Tables",
    description: "Show structured data like SQL tables.",
    img: Tables,
    href: "/tour/sql-tables/",
  },
];

const FeatureHighlights = () => {
  return <Features features={featureHighlights} />;
};

export default FeatureHighlights;
