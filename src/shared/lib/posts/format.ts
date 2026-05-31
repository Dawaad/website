/**
 * Client-safe post formatting helpers. Kept separate from `posts.ts` (which
 * imports `fs`/`path` and is server-only) so client components can format post
 * metadata without dragging Node built-ins into the browser bundle.
 */

/** ISO `YYYY-MM-DD` → dotted terminal style `YYYY.MM.DD`. */
export const formatDate = (iso: string): string => iso.replaceAll('-', '.');
