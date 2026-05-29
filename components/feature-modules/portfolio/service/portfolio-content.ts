import type { PortfolioContent } from "@/lib/types/portfolio";

// Static content source for the portfolio. Edit me — this is the single source
// of truth for everything rendered in the terminal.
export const portfolioContent: PortfolioContent = {
  user: {
    handle: "dawad",
    name: "Jared",
    role: "Forward Deployed Engineer & Systems Architect",
    based: "Melbourne, au — utc+10",
  },

  about: {
    intro: [
      "I build and design systems",
      "Most of my recent work has been around interfaces that feel like they're on your side — predictable, keyboard-first, no surprises.",
      "Before that: 6y at a research lab making instruments for biologists. Before THAT: undergrad in cognitive science.",
    ],
    bullets: [
      [
        "focus",
        "systems design & architecture · ai augmented pattern recognition · videography",
      ],
      ["status", "start-up founder · forward deployed engineer"],
    ],
  },

  now: {
    updated: "29.05.2026",
    items: [
      "embedded in a YC backed startup building AI governance and alignment infrastructure for critical systems",
      "researching and developing a programmable extension of the LLM wiki for 10k+ documents.",
      "learning videography, content creation and blog writing.",
      "building a home server/nas for large scale media storage/editing & local model hosting.",
      "trying to build more TUIs.",
    ],
  },

  stack: [
    ["lang", "kotlin · ts · python"],
    [
      "backend",
      "spring boot · distributed systems · kafka · graphql · postgres · redis",
    ],
    [
      "ml/ai",
      "mcp development · knowledge base construction · semantic/pattern extraction · information retrieval accuracy management",
    ],

    ["editor", "vscode · intellij"],
    ["terminal", "ghostty · kitty"],
  ],

  contact: {
    email: "jared@rmr.studio",
    note: "I read every email. Replies in 1–3 days.",
  },

  experience: [
    {
      slug: "lyra",
      date: "2026 — now",
      org: "lyra",
      role: "forward deployed engineer",
      tag: "[engineering]",
      detail:
        "Shipping exceptional products for Silicon Valley startups. Currently embedded in a YC backed startup building the deterministic layer for frontier intelligence",
    },
    {
      slug: "cranium",
      date: "2026 — now",
      org: "cranium",
      role: "technical founder",
      tag: "[architecture]",
      detail:
        "The Open Sourced Self Adapting Hive Mind for Engineering Teams. Building the allignment substrate for AI-Augmented engineering teams. Infrastructure that embeds system design, team standards and interactions as context for agentic development and orchestration.",
    },
    {
      slug: "leidos",
      date: "2023 — 2026",
      org: "leidos",
      role: "software engineer",
      tag: "[engineering]",
      detail:
        "Solving the toughest challenges in government intelligence. Worked across a major engineering team to transform and modernise critical government capabilities. Lead the design and development of some critical domains and functionality with distributed systems, data pipelines, and internal tools.",
    },
    {
      slug: "monash",
      date: "2018 — 2022",
      org: "monash university",
      role: "student",
      tag: "[education]",
      detail:
        "Bachelor of Computer Science. This is where I learned to code, and where I fell in love with systems design and architecture.",
    },
  ],

  projects: [
    {
      slug: "signal-cli",
      date: "2026",
      name: "signal/cli",
      tag: "[tool]",
      detail:
        "A terminal client for our team's IDE backend. Written in Rust + Tauri.",
    },
    {
      slug: "runlines",
      date: "2026",
      name: "runlines",
      tag: "[oss]",
      detail: "A tiny todo-list that lives in your editor's status bar.",
    },
    {
      slug: "slowpost",
      date: "2025",
      name: "slowpost",
      tag: "[product]",
      detail:
        "A blogging tool that intentionally limits you to one post a week.",
    },
    {
      slug: "ks-icons",
      date: "2025",
      name: "ks-icons",
      tag: "[oss]",
      detail: "A 240-glyph monoline icon set for terminal apps. Free.",
    },
    {
      slug: "vector-insights",
      date: "2024",
      name: "vector/insights",
      tag: "[work]",
      detail:
        "A keyboard-first data exploration product. Shipped to ~3k seats.",
    },
    {
      slug: "plate",
      date: "2023",
      name: "plate",
      tag: "[wip]",
      detail: "Drum-machine sampler experiment. Still going.",
    },
  ],

  posts: [
    {
      slug: "on-small-models-and-small-teams",
      date: "2026.05.12",
      title: "On small models and small teams",
      tag: "[design]",
      detail:
        "A long argument that small teams should ship more, not less. Notes from working on signal/cli for a year.",
    },
    {
      slug: "the-case-against-the-command-palette",
      date: "2026.04.02",
      title: 'The case against the "command palette"',
      tag: "[ux]",
      detail:
        "Command palettes are great until they replace the menu. A nuanced rant.",
    },
    {
      slug: "notes-from-a-month-off",
      date: "2026.02.18",
      title: "Notes from a month off",
      tag: "[notes]",
      detail:
        "I took February off. Here's what I read, what I built, what I didn't.",
    },
    {
      slug: "a-year-in-review",
      date: "2025.12.30",
      title: "A year in review — kept short",
      tag: "[notes]",
      detail:
        "A short list of what worked, what didn't, and what I want to do less of.",
    },
    {
      slug: "designing-for-keyboards-first",
      date: "2025.11.04",
      title: "Designing for keyboards first",
      tag: "[ux]",
      detail:
        "Six rules for designing keyboard-first interfaces that don't suck for mouse users.",
    },
    {
      slug: "why-i-left-a-great-job",
      date: "2025.09.21",
      title: "Why I left a great job",
      tag: "[notes]",
      detail: "On burning out from a job that wasn't burning me out.",
    },
    {
      slug: "a-defense-of-the-dropdown",
      date: "2025.07.10",
      title: "A defense of the dropdown",
      tag: "[ux]",
      detail: "Comboboxes are great. The hate is misplaced. A short defense.",
    },
  ],
};
