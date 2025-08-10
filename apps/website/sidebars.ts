import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    "intro",
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/installation",
        "getting-started/quickstart",
        "getting-started/concepts",
      ],
    },
    {
      type: "category",
      label: "Core Concepts",
      items: [
        "concepts/trusted-setup",
        "concepts/ceremonies",
        "concepts/circuits",
        "concepts/participants",
        "concepts/contributions",
      ],
    },
    {
      type: "category",
      label: "User Guide",
      items: ["user-guide/creating-ceremony"],
    },
    {
      type: "category",
      label: "API Reference",
      items: ["api/backend-api", "api/actions"],
    },
    {
      type: "category",
      label: "Examples",
      items: ["examples/basic-ceremony"],
    },
    {
      type: "category",
      label: "Contributing",
      items: ["contributing/development-setup"],
    },
  ],
};

export default sidebars;
