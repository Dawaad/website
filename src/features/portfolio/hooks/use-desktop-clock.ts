import { useSyncExternalStore } from "react";

import { formatDeskStamp } from "@/src/features/portfolio/lib/clock.util";

/** Static server snapshot so SSR and the first client render agree. */
const PLACEHOLDER = "--- -- --- · --:--";

/** Re-reads the stamp every 30s, notifying React via the store callback. */
function subscribe(onChange: () => void): () => void {
  const id = setInterval(onChange, 30000);
  return () => clearInterval(id);
}

/**
 * Ticks a `thu 29 may · hh:mm` local stamp for the desktop top bar, refreshing
 * every 30s. Backed by `useSyncExternalStore` so the live value is read only
 * after hydration — the server render shows a placeholder, avoiding a mismatch.
 */
export function useDeskStamp(): string {
  return useSyncExternalStore(subscribe, formatDeskStamp, () => PLACEHOLDER);
}
