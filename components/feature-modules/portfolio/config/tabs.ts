import type { Tab } from "@/lib/types/portfolio";

export const TABS: Tab[] = [
  { key: "about", label: "ABOUT", hasList: false, href: "/" },
  {
    key: "experience",
    label: "EXPERIENCE",
    hasList: true,
    href: "/experience",
  },
  { key: "posts", label: "POSTS", hasList: true, href: "/posts" },
  { key: "contact", label: "CONTACT", hasList: false, href: "/contact" },
];
