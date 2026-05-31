import type { FC } from 'react';

const LOGO = [
  '          _______          ',
  '       _ \\______ -          ',
  '      | \\  ___  \\ |         ',
  '      | | /   \\ | |         ',
  '      | | \\___/ | |         ',
  '      | \\______ \\_|         ',
  '       -_______ \\           ',
];

const FETCH = [
  ['os', 'Void Linux'],
  ['host', 'MS-7C56 1.0'],
  ['kernel', '6.6.8_1'],
  ['uptime', '3h 59m'],
  ['pkgs', '599'],
  ['memory', '7776M / 60165M'],
];

/** Faux pfetch output: ASCII distro logo beside a key/value system summary. */
export const FetchPanel: FC = () => {
  return (
    <div className="flex h-full flex-col gap-1 overflow-hidden font-mono text-[8.5px] leading-[1.4]">
      <div className="text-fg-3">regn % pfetch</div>
      <div className="flex flex-1 gap-3">
        <pre className="m-0 text-cyan-dim">{LOGO.join('\n')}</pre>
        <div className="space-y-[2px]">
          <div className="text-amber">regn@fjell</div>
          {FETCH.map(([k, v], i) => (
            <div key={i}>
              <span className="text-cyan">{k}</span> <span className="text-fg-2">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-fg-3">
        regn % grim | wl-copy <span className="bg-fg-2 text-bg-1">&nbsp;</span>
      </div>
    </div>
  );
};
