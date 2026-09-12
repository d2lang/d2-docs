import React from "react";

import Features from "@site/src/components/Features/Features";

const moreFeatures = [
  {
    title: "Local CLI",
    description: "Robust CLI with watch mode. Completely offline workflow.",
    icon: "cli.svg",
    href: "/tour/install/",
  },
  {
    title: "Most major OS's",
    description:
      "MacOS, Linux, and Windows. D2 is included in many popular package managers like Homebrew and Winget.",
    icon: "os.svg",
    href: "https://github.com/d2lang/d2/releases",
  },
  {
    title: "VSCode and Vim",
    description: "Official editor support for VSCode and Vim, with more coming soon.",
    icon: "vscode.svg",
    href: "/tour/extensions/#official",
  },
  {
    title: "Online playground",
    description: "Create and share diagrams quickly by going to our hosted Playground.",
    icon: "playground.svg",
    href: "https://play.d2lang.com",
  },
  {
    title: "Containers",
    description: "First-class support for containers (grouping shapes in other shapes).",
    icon: "containers.svg",
    href: "/tour/containers/",
  },
  {
    title: "Images and Icons",
    description: "Import any image or icon online into your diagram",
    icon: "images.svg",
    href: "/tour/icons/",
  },
  {
    title: "Multiple layout engines",
    description:
      "Choose from 3 layout engines that uniquely handle different types of diagrams.",
    icon: "engines.svg",
    href: "/tour/layouts/",
  },
  {
    title: "Use any font",
    description: "To customize the font, simply pass in your own .ttf files.",
    icon: "fonts.svg",
    href: "/tour/fonts/",
  },
  {
    title: "Imports",
    description:
      "Modularize your diagrams like your code. Split models from views or dice it any way you want.",
    icon: "import.svg",
    href: "/tour/imports/",
  },
  {
    title: "Variables",
    description:
      "Reuse values like colors, labels, and anything else for clean diagram code.",
    icon: "variables.svg",
    href: "/tour/vars/",
  },
  {
    title: "Globs",
    description: "All the power of wildcard globs you're already familiar with.",
    icon: "globs.svg",
    href: "/tour/globs/",
  },
  {
    title: "Autoformat",
    description:
      "Don't sweat style decisions like indentations and spacing, D2 has a built-in autoformatter.",
    icon: "autoformat.svg",
    href: "/tour/auto-formatter/",
  },
  {
    title: "Language API",
    description: "Programmatically create diagrams by calling D2's language API.",
    icon: "api.svg",
    href: "/tour/api/",
  },
  {
    title: "Interactive tooltips and links",
    description: "Hover over shapes to learn more, or click through to another page.",
    icon: "tooltip.svg",
    href: "/tour/interactive/",
  },
  {
    title: "Class shape",
    description: "UML Class diagrams are fully supported",
    icon: "classes.svg",
    href: "/tour/classes/",
  },
  {
    title: "Sequence diagrams",
    description: "Sequence diagrams are created by setting shape: sequence_diagram",
    icon: "sequence_diagram.svg",
    href: "/tour/sequence-diagrams/",
  },
  {
    title: "Adaptive dark mode",
    description:
      "Diagrams adjust color schemes to fit user preferences automatically, anywhere on the web.",
    icon: "dark_mode.svg",
    href: "/tour/themes/#dark-theme",
  },
  {
    title: "Extensions",
    description: "Explore official and community developed plugins and extensions",
    icon: "extension.svg",
    href: "/tour/extensions/",
  },
  {
    title: "Exports",
    description: "Export .d2 into SVG, PNG, PDF, PPTX, GIF, and ASCII.",
    icon: "exports.svg",
    href: "/tour/exports/",
  },
  {
    title: "Cheat sheet",
    description: "Download our handy one-pager D2 syntax cheat sheet",
    icon: "cheat-sheet.svg",
    href: "/tour/cheat-sheet/",
  },
];

const MoreFeatures = () => {
  return (
    <>
      <Features features={moreFeatures} />
      <div className="Separator" />
    </>
  );
};

export default MoreFeatures;
