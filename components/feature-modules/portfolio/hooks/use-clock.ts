import { useEffect, useState } from 'react';

import { formatClock } from '@/components/feature-modules/portfolio/util/clock.util';

/** Ticks a `hh:mm utc` clock string, refreshing every 30s. */
export function useClock(): string {
  const [clock, setClock] = useState(() => formatClock());

  useEffect(() => {
    const id = setInterval(() => setClock(formatClock()), 30000);
    return () => clearInterval(id);
  }, []);

  return clock;
}
