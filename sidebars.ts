import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

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
  // But you can create a sidebar manually
  tutorialSidebar: [
    "intro",
    "installation",
    "accounts",
    "contracts",
    "tokens",
    "executions",
    // {
    //   type: "category",
    //   label: "Accounts",
    //   items: ["accounts/accounts"],
    // },
    // {
    //   type: "category",
    //   label: "Contracts",
    //   items: [
    //     "contracts/intro",
    //     "contracts/get-contracts",
    //     "contracts/add-contract",
    //     "contracts/deploy-contract",
    //     "contracts/contract-read",
    //     "contracts/contract-webhooks"

    //   ],
    // },
  ],
};

export default sidebars;
