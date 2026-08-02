import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { themes } from "prism-react-renderer";

const config: Config = {
  title: "D2 Documentation",
  tagline: "D2 is a modern DSL that turns text to diagrams.",
  url: "https://d2lang.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  trailingSlash: true,

  future: {
    experimental_faster: true,
    v4: true,
  },

  headTags: [
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "SoftwareApplication",
        name: "D2",
        description: "A modern DSL that turns text to diagrams",
        url: "https://d2lang.com",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cross-platform",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "Terrastruct",
          url: "https://terrastruct.com",
        },
        sameAs: [
          "https://github.com/d2lang/d2",
          "https://discord.com/invite/pbUXgvmTpU",
        ],
      }),
    },
    {
      tagName: "link",
      attributes: {
        rel: "manifest",
        href: "/manifest.json",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://DWAXJIMTZU-dsn.algolia.net",
      },
    },
  ],

  i18n: {
    defaultLocale: "en",
    locales: ["en", "ko"],
    localeConfigs: {
      en: {
        label: "English",
      },
      ko: {
        label: "Korean (한국어)",
      },
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          breadcrumbs: false,
        },
        blog: {
          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) =>
            frontMatter.hide_reading_time ? undefined : defaultReadingTime({ content }),
          blogTitle: "D2 Blog",
          blogDescription:
            "Latest news, updates, and tutorials about D2 - the modern text-to-diagram language",
          blogSidebarCount: "ALL",
          blogSidebarTitle: "Recent Posts",
          feedOptions: {
            type: "all",
            title: "D2 Blog Feed",
            description: "Stay updated with the latest D2 news and tutorials",
            copyright: `Copyright © 2026 Terrastruct, Inc.`,
            language: "en",
          },
        },
        theme: {
          customCss: ["./src/styles/custom.scss"],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/opengraph.png",
    metadata: [
      {
        name: "keywords",
        content:
          "diagrams, software architecture, text to diagram, graphviz alternative, mermaidjs alternative, plantuml alternative, d2 language, d2lang, sequence diagrams, flowcharts",
      },
      {
        name: "author",
        content: "Terrastruct",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:site_name",
        content: "D2 Documentation",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:site",
        content: "@terrastruct",
      },
      {
        name: "twitter:creator",
        content: "@terrastruct",
      },
    ],
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      logo: {
        alt: "D2",
        src: "img/logo.png",
        srcDark: "img/logo_dark.png",
        href: "/",
      },
      items: [
        {
          type: "doc",
          docId: "tour/intro",
          position: "left",
          label: "Tour",
        },
        {
          to: "blog",
          label: "Blog",
          position: "left",
        },
        {
          type: "doc",
          docId: "examples/overview",
          position: "left",
          label: "Examples",
        },
        {
          type: "doc",
          docId: "releases/intro",
          position: "left",
          label: "Releases",
        },
        {
          href: "https://play.d2lang.com",
          position: "right",
          label: "Playground",
        },
        {
          type: "custom-iconLink",
          position: "right",
          icon: {
            alt: "github logo",
            src: `/logos/github.svg`,
            href: "https://github.com/d2lang/d2",
            target: "_blank",
          },
        },
        {
          type: "custom-iconLink",
          position: "right",
          icon: {
            alt: "discord logo",
            src: `/logos/discord.svg`,
            href: "https://discord.com/invite/pbUXgvmTpU",
            target: "_blank",
          },
        },
      ],
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
    },
    footer: {
      copyright: `Copyright © 2026 <a href="https://terrastruct.com">Terrastruct, Inc.</a>`,
    },
    algolia: {
      appId: "DWAXJIMTZU",
      apiKey: "5c73ff6e63896f9a247aecc8dcecb0ef",
      indexName: "d2lang",
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    "docusaurus-plugin-sass",
    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html", "htm"],
        redirects: [
          {
            to: "/tour/intro/",
            from: ["/tour"],
          },
        ],
      },
    ],
    (ctx) => ({
      name: "wasm",
      configureWebpack: () => ({
        module: {
          rules: [
            {
              test: /\.wasm$/,
              type: "asset",
            },
            {
              test: /\.d2/,
              type: "asset/source",
            },
            {
              test: new RegExp(`d2-vscode/syntaxes/.*\.json$`),
              type: "asset",
            },
            {
              test: new RegExp(`shiki/languages/.*\.json$`),
              type: "asset",
            },
            {
              test: /\.svg2$/,
              type: "asset/source",
            },
          ],
        },
      }),
    }),
  ],

  scripts: [
    {
      src: "https://d2lang.com/js/script.js",
      defer: true,
      "data-domain": "d2lang.com",
    },
  ],
};

export default config;
