import type { PortfolioContent } from "@/lib/types/portfolio";

// Static content source for the portfolio. Edit me — this is the single source
// of truth for everything rendered in the terminal.
export const portfolioContent: PortfolioContent = {
  user: {
    handle: "dawad0",
    name: "Jared",
    role: "Forward Embedded Engineer & Systems Architect",
    based: "Melbourne, au — utc+10",
    pgp: "0xAE12 8841",
  },

  about: {
    intro: [
      "I build small tools for small teams.",
      "Most of my recent work has been around interfaces that feel like they're on your side — predictable, keyboard-first, no surprises.",
      "Before that: 6y at a research lab making instruments for biologists. Before THAT: undergrad in cognitive science.",
    ],
    bullets: [
      ["focus", "design systems · prototyping · keyboard UX"],
      ["tools", "figma · react · swift · tailwind"],
      ["status", "currently consulting · open to small projects"],
      ["values", "fewer features · sharper defaults · respect the user"],
    ],
  },

  now: {
    updated: "2026.05.20",
    items: [
      "Consulting two days a week on a developer tools startup.",
      "Reading The Timeless Way of Building, Alexander.",
      "Learning Rust, slowly. Reading more than writing.",
      "Trying to release one small thing every month this year.",
    ],
  },

  stack: [
    ["editor", "neovim · helix"],
    ["terminal", "ghostty · tmux"],
    ["shell", "fish · starship"],
    ["browser", "arc · firefox dev"],
    ["design", "figma · linear · raycast"],
    ["lang", "ts · python · swift · rust (learning)"],
    ["server", "fly.io · cloudflare · litestream"],
    ["audio", "ableton · sm7b · sub37"],
  ],

  contact: {
    email: "kade@signal.so",
    pgp: "0xAE12 8841 7F3C 9D14",
    matrix: "@kade:signal.so",
    rss: "/feed.xml",
    note: "I read every email. Replies in 1–3 days. No recruiter pitches.",
  },

  experience: [
    {
      date: "2024 — now",
      org: "signal labs",
      role: "principal designer",
      tag: "[design]",
      detail:
        "Lead designer for a developer-tools startup. Set up the design system, shipped the v1 IDE plugin, wrote the docs. Currently 4 ICs.",
    },
    {
      date: "2022 — 2024",
      org: "vector",
      role: "senior product designer",
      tag: "[design]",
      detail:
        "Owned the data-exploration product. Led migration from Material to a custom keyboard-first system. Hired two designers.",
    },
    {
      date: "2018 — 2022",
      org: "radial research",
      role: "design engineer",
      tag: "[r&d]",
      detail:
        "Built instruments for cell biologists. Lots of XState, lots of weird sensors. Got two papers cited.",
    },
    {
      date: "2016 — 2018",
      org: "freelance",
      role: "contract",
      tag: "[contract]",
      detail: "Logos, sites, the occasional iOS app. Quietly miss this period.",
    },
    {
      date: "2012 — 2016",
      org: "northwestern",
      role: "b.s. cognitive science",
      tag: "[edu]",
      detail:
        "Minored in music tech. Honors thesis on attention and interface affordances.",
    },
  ],

  projects: [
    {
      date: "2026",
      name: "signal/cli",
      tag: "[tool]",
      detail:
        "A terminal client for our team's IDE backend. Written in Rust + Tauri.",
    },
    {
      date: "2026",
      name: "runlines",
      tag: "[oss]",
      detail: "A tiny todo-list that lives in your editor's status bar.",
    },
    {
      date: "2025",
      name: "slowpost",
      tag: "[product]",
      detail:
        "A blogging tool that intentionally limits you to one post a week.",
    },
    {
      date: "2025",
      name: "ks-icons",
      tag: "[oss]",
      detail: "A 240-glyph monoline icon set for terminal apps. Free.",
    },
    {
      date: "2024",
      name: "vector/insights",
      tag: "[work]",
      detail:
        "A keyboard-first data exploration product. Shipped to ~3k seats.",
    },
    {
      date: "2023",
      name: "plate",
      tag: "[wip]",
      detail: "Drum-machine sampler experiment. Still going.",
    },
  ],

  posts: [
    {
      date: "2026.05.12",
      title: "On small models and small teams",
      tag: "[design]",
      detail:
        "A long argument that small teams should ship more, not less. Notes from working on signal/cli for a year.",
    },
    {
      date: "2026.04.02",
      title: 'The case against the "command palette"',
      tag: "[ux]",
      detail:
        "Command palettes are great until they replace the menu. A nuanced rant.",
    },
    {
      date: "2026.02.18",
      title: "Notes from a month off",
      tag: "[notes]",
      detail:
        "I took February off. Here's what I read, what I built, what I didn't.",
    },
    {
      date: "2025.12.30",
      title: "A year in review — kept short",
      tag: "[notes]",
      detail:
        "A short list of what worked, what didn't, and what I want to do less of.",
    },
    {
      date: "2025.11.04",
      title: "Designing for keyboards first",
      tag: "[ux]",
      detail:
        "Six rules for designing keyboard-first interfaces that don't suck for mouse users.",
    },
    {
      date: "2025.09.21",
      title: "Why I left a great job",
      tag: "[notes]",
      detail: "On burning out from a job that wasn't burning me out.",
    },
    {
      date: "2025.07.10",
      title: "A defense of the dropdown",
      tag: "[ux]",
      detail: "Comboboxes are great. The hate is misplaced. A short defense.",
    },
  ],
};
