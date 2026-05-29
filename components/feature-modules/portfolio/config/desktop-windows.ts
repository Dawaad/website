/** Identifiers for the faux desktop terminals the dock manages. */
export type DesktopWindowId = 'nvim' | 'cmus' | 'btop' | 'imv' | 'zfs' | 'pfetch';

export interface DesktopWindowMeta {
  id: DesktopWindowId;
  /** Full title shown in the faux-terminal header (matches the rendered window). */
  title: string;
  /** Short human label surfaced as the dock tooltip. */
  label: string;
  /** Two-glyph mnemonic shown on the dock tile. */
  mnemonic: string;
}

/**
 * The backdrop terminals, in dock order. The dock and window-manager provider
 * share this list; `background-terminals` keys its rendered panels by the same
 * ids so open/close state stays in sync.
 */
export const DESKTOP_WINDOWS: DesktopWindowMeta[] = [
  { id: 'nvim', title: 'nvim ~/src/coreutils/pwd.c', label: 'editor', mnemonic: 'nv' },
  { id: 'cmus', title: 'cmus — music', label: 'music', mnemonic: 'cm' },
  { id: 'btop', title: 'btop — system monitor', label: 'monitor', mnemonic: 'bt' },
  { id: 'imv', title: 'imv — ~/wall/current.png', label: 'viewer', mnemonic: 'iv' },
  { id: 'zfs', title: 'regn@fjell : ~ — zsh', label: 'shell', mnemonic: 'zs' },
  { id: 'pfetch', title: 'regn@fjell : ~ — pfetch', label: 'fetch', mnemonic: 'pf' },
];
