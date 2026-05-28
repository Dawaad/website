// Portfolio domain types. Hand-written barrel — the single source of truth for
// the shape of the terminal portfolio's content and navigation model.

export type SectionKey = 'about' | 'experience' | 'projects' | 'posts' | 'contact';

export type SchemeName = 'beige' | 'phosphor' | 'amber' | 'blueprint' | 'mono';

export interface Tab {
  key: SectionKey;
  label: string;
  hasList: boolean;
  href: string;
}

export interface PortfolioUser {
  handle: string;
  name: string;
  role: string;
  based: string;
  pgp: string;
}

/** A key/value pair rendered as a definition-list row. */
export type KeyValue = [label: string, value: string];

export interface AboutContent {
  intro: string[];
  bullets: KeyValue[];
}

export interface NowContent {
  updated: string;
  items: string[];
}

export interface Contact {
  email: string;
  pgp: string;
  matrix: string;
  rss: string;
  note: string;
}

export interface ExperienceEntry {
  date: string;
  org: string;
  role: string;
  tag: string;
  detail: string;
}

export interface Project {
  date: string;
  name: string;
  tag: string;
  detail: string;
}

export interface Post {
  date: string;
  title: string;
  tag: string;
  detail: string;
}

export interface PortfolioContent {
  user: PortfolioUser;
  about: AboutContent;
  now: NowContent;
  stack: KeyValue[];
  contact: Contact;
  experience: ExperienceEntry[];
  projects: Project[];
  posts: Post[];
}
