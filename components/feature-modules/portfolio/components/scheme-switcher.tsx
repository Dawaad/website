import { SCHEMES } from '@/components/feature-modules/portfolio/config/schemes';
import type { SchemeName } from '@/lib/types/portfolio';
import { cn } from '@/lib/util/utils';

interface SchemeSwitcherProps {
  scheme: SchemeName;
  setScheme: (scheme: SchemeName) => void;
}

/** Corner control for swapping color schemes — remove for production. */
export function SchemeSwitcher({ scheme, setScheme }: SchemeSwitcherProps) {
  return (
    <div className="fixed right-4 bottom-4 z-[100] flex items-center gap-2 border border-fg-4 bg-bg-0 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-fg-2">
      <span className="text-fg-3">scheme:</span>
      {SCHEMES.map((s) => (
        <button
          key={s}
          onClick={() => setScheme(s)}
          className={cn(
            'cursor-pointer border-none bg-transparent p-0 uppercase tracking-[inherit]',
            scheme === s ? 'text-amber' : 'text-fg-2',
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
