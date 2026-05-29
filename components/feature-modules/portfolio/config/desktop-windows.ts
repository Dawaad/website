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
  /** Public-path SVG (GNOME/Papirus style) rendered on the dock tile. */
  icon: string;
  /** Brand accent (hex) the dock blends into a per-tile gradient + glow. */
  tint: string;
}

/**
 * The backdrop terminals, in dock order. The dock and window-manager provider
 * share this list; `background-terminals` keys its rendered panels by the same
 * ids so open/close state stays in sync.
 */
export const DESKTOP_WINDOWS: DesktopWindowMeta[] = [
  { id: 'nvim', title: 'nvim ~/src/coreutils/pwd.c', label: 'editor', mnemonic: 'nv', icon: '/icons/nvim.svg', tint: '#6ba63f' },
  { id: 'cmus', title: 'cmus — music', label: 'music', mnemonic: 'cm', icon: '/icons/cmus.svg', tint: '#1ed760' },
  { id: 'btop', title: 'btop — system monitor', label: 'monitor', mnemonic: 'bt', icon: '/icons/btop.svg', tint: '#00e441' },
  { id: 'imv', title: 'imv — ~/wall/current.png', label: 'viewer', mnemonic: 'iv', icon: '/icons/imv.svg', tint: '#36aca3' },
  { id: 'zfs', title: 'regn@fjell : ~ — zsh', label: 'shell', mnemonic: 'zs', icon: '/icons/zfs.svg', tint: '#c16d35' },
  { id: 'pfetch', title: 'regn@fjell : ~ — pfetch', label: 'fetch', mnemonic: 'pf', icon: '/icons/pfetch.svg', tint: '#1793d1' },
];
