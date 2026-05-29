/** Query-param key that deep-links a single list entry: `?item=<slug>`. */
export const ITEM_PARAM = 'item';

/**
 * Resolve a URL slug to its index within a list of slugs. Returns `null` when
 * the slug is absent (no param) or doesn't match any entry, so callers can fall
 * back to a default and clean up the stale URL.
 */
export function indexFromSlug(slug: string | null, slugs: readonly string[]): number | null {
  if (!slug) return null;
  const index = slugs.indexOf(slug);
  return index === -1 ? null : index;
}
