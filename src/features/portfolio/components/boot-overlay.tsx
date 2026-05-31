import { useEffect, useState } from 'react';
import type { FC } from 'react';

interface BootOverlayProps {
  onDone: () => void;
  /** Inset from the body top so the static pane-header strip stays visible. */
  topOffset?: number;
}

const LINES = [
  '> portfolio.os v3.0.2 — booting…',
  '> mounting ~/portfolio                              [ ok ]',
  '> loading panes: about · experience · projects     [ ok ]',
  '> negotiating tls 1.3                               [ ok ]',
  '> verifying pgp 0xAE12 8841                         [ ok ]',
  '> session opened — peer: kade@signal',
  '> ready. press [tab] to switch · [1-5] for sections',
];

/** Fake boot sequence that reveals one line every 80ms, then dismisses. */
export const BootOverlay: FC<BootOverlayProps> = ({ onDone, topOffset = 0 }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => {
        if (p >= LINES.length) {
          clearInterval(id);
          return p;
        }
        return p + 1;
      });
    }, 80);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (phase >= 7) {
      const t = setTimeout(onDone, 140);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-40 px-[60px] py-10 font-mono text-fg-1"
      style={{ top: topOffset }}
    >
      {/* Transparent — the intro's opaque cover sits behind the boot log, so no
          jumble shows during boot; the jumble starts once the log finishes. */}
      <pre className="m-0 whitespace-pre text-[12px] leading-[1.7] text-fg-2">
        {LINES.slice(0, phase).join('\n') + (phase < 7 ? '\n_' : '')}
      </pre>
    </div>
  );
}
