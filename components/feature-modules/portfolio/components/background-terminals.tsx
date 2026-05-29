'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { AsciiSkeleton } from '@/components/feature-modules/portfolio/components/ascii-skeleton';
import { measureSkeleton, type SkeletonBone } from '@/components/feature-modules/portfolio/util/skeleton.util';
import { cn } from '@/lib/util/utils';

/** Glyph size for the background skeletons — tuned to the small panel fonts. */
const SKELETON_FONT = 9;
/** How long each panel scrambles before its content resolves. */
const SCRAMBLE_MS = 320;

/**
 * Boots a single panel: on mount it measures its own rendered content into
 * line-shaped "bones", scrambles them as ASCII glyphs, then (after `delay`)
 * cross-fades the real content in — the same shape-matched jump the main
 * terminal uses for route changes, applied once at load and staggered per pane.
 */
function ScramblePanel({ children, delay }: { children: ReactNode; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [bones, setBones] = useState<SkeletonBone[]>([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (ref.current) setBones(measureSkeleton(ref.current, SKELETON_FONT * 0.6));
    });
    const t = setTimeout(() => setRevealed(true), delay + SCRAMBLE_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [delay]);

  return (
    <div ref={ref} className="relative h-full">
      <div className={cn('h-full transition-opacity duration-300', revealed ? 'opacity-100' : 'opacity-0')}>
        {children}
      </div>
      <AsciiSkeleton bones={bones} visible={!revealed} fontSize={SKELETON_FONT} />
    </div>
  );
}

/** A single non-interactive faux terminal used purely as backdrop dressing. */
function FauxTerminal({
  title,
  children,
  className,
  style,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        'absolute flex min-h-0 min-w-0 flex-col overflow-hidden border border-fg-3 bg-bg-2 shadow-sm',
        className,
      )}
      style={style}
    >
      <div className="flex flex-none items-center gap-2.5 border-b border-fg-3 px-2.5 py-1.5">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-fg-4" />
          <span className="h-2 w-2 rounded-full bg-fg-4" />
          <span className="h-2 w-2 rounded-full bg-fg-4" />
        </div>
        <span className="truncate text-[9px] uppercase tracking-[0.14em] text-fg-3">{title}</span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden p-2.5">{children}</div>
    </div>
  );
}

/* ─────────────────────────── nvim / coreutils ─────────────────────────── */

type Tok = [text: string, cls?: string];
const C = {
  kw: 'text-magenta',
  fn: 'text-cyan',
  str: 'text-amber',
  com: 'text-fg-3',
  num: 'text-amber-dim',
  base: 'text-fg-1',
};

const CODE: [num: string, toks: Tok[]][] = [
  ['30', [['/* pwd - print the full filename of the current working dir.  */', C.com]]],
  ['31', [['', C.base]]],
  ['32', [['#include ', C.kw], ['<config.h>', C.str]]],
  ['33', [['#include ', C.kw], ['<stdio.h>', C.str]]],
  ['34', [['#include ', C.kw], ['<getopt.h>', C.str]]],
  ['35', [['#include ', C.kw], ['<sys/types.h>', C.str]]],
  ['36', [['', C.base]]],
  ['37', [['#include ', C.kw], ['"system.h"', C.str]]],
  ['38', [['#include ', C.kw], ['"die.h"', C.str]]],
  ['39', [['#include ', C.kw], ['"error.h"', C.str]]],
  ['40', [['#include ', C.kw], ['"quote.h"', C.str]]],
  ['41', [['#include ', C.kw], ['"root-dev-ino.h"', C.str]]],
  ['42', [['#include ', C.kw], ['"xgetcwd.h"', C.str]]],
  ['43', [['', C.base]]],
  ['44', [['/* The official name of this program.  */', C.com]]],
  ['45', [['#define ', C.kw], ['PROGRAM_NAME ', C.base], ['"pwd"', C.str]]],
  ['46', [['', C.base]]],
  ['47', [['#define ', C.kw], ['AUTHORS ', C.base], ['proper_name', C.fn], [' (', C.base], ['"Jim Meyering"', C.str], [')', C.base]]],
  ['48', [['', C.base]]],
  ['49', [['struct ', C.kw], ['file_name', C.fn], [' {', C.base]]],
  ['50', [['  char ', C.base], ['*buf;', C.base]]],
  ['51', [['  size_t ', C.base], ['n_alloc;', C.base]]],
  ['52', [['  char ', C.base], ['*start;', C.base]]],
  ['53', [['};', C.base]]],
  ['54', [['', C.base]]],
  ['55', [['static struct ', C.kw], ['file_name *', C.base]]],
  ['56', [['file_name_init', C.fn], [' (', C.base], ['void', C.kw], [')', C.base]]],
  ['57', [['{', C.base]]],
  ['58', [['  struct ', C.kw], ['file_name *p = ', C.base], ['xmalloc', C.fn], [' (', C.base], ['sizeof ', C.kw], ['*p);', C.base]]],
  ['59', [['  p->n_alloc = ', C.base], ['1', C.num], [' + PATH_MAX;', C.base]]],
  ['60', [['  p->buf = ', C.base], ['xmalloc', C.fn], [' (p->n_alloc);', C.base]]],
  ['61', [['  p->start = p->buf + (p->n_alloc - ', C.base], ['1', C.num], [');', C.base]]],
  ['62', [['  p->start[', C.base], ['0', C.num], ['] = ', C.base], ["'\\0'", C.str], [';', C.base]]],
  ['63', [['  return ', C.kw], ['p;', C.base]]],
  ['64', [['}', C.base]]],
  ['65', [['', C.base]]],
  ['66', [['static int ', C.kw], ['logical_getcwd', C.fn], [' (void);', C.base]]],
  ['67', [['', C.base]]],
  ['68', [['int ', C.kw], ['pwd_main', C.fn], ['(int argc, char **argv) ', C.base], ['MAIN_EXTERNALLY_VISIBLE;', C.com]]],
  ['69', [['int ', C.kw], ['pwd_main', C.fn], ['(int argc, char **argv ', C.base], ['UNUSED_PARAM', C.com], [')', C.base]]],
  ['70', [['{', C.base]]],
  ['71', [['  char ', C.base], ['*buf;', C.base]]],
  ['72', [['', C.base]]],
  ['73', [['  if ', C.kw], ['(ENABLE_DESKTOP) {', C.base]]],
  ['74', [['    /* TODO: assume -L if $POSIXLY_CORRECT? */', C.com]]],
  ['75', [['     * Rationale:', C.com]]],
  ['76', [['     * POSIX wants -L, scripts expect -P', C.com]]],
  ['77', [['     */', C.com]]],
  ['78', [['    unsigned opt = ', C.base], ['getopt32', C.fn], ['(argv, ', C.base], ['"LP"', C.str], [');', C.base]]],
  ['79', [['    if ', C.kw], ['((opt & ', C.base], ['1', C.num], [') && ', C.base], ['logical_getcwd', C.fn], ['())', C.base]]],
  ['80', [['      return ', C.kw], ['fflush_all', C.fn], ['();', C.base]]],
  ['81', [['  }', C.base]]],
  ['82', [['', C.base]]],
  ['83', [['  buf = ', C.base], ['xrealloc_getcwd_or_warn', C.fn], ['(NULL);', C.base]]],
  ['84', [['', C.base]]],
  ['85', [['  if ', C.kw], ['(buf) {', C.base]]],
  ['86', [['    ', C.base], ['puts', C.fn], ['(buf);', C.base]]],
  ['87', [['    ', C.base], ['free', C.fn], ['(buf);', C.base]]],
  ['88', [['    return ', C.kw], ['fflush_all', C.fn], ['();', C.base]]],
  ['89', [['  }', C.base]]],
  ['90', [['  return ', C.kw], ['EXIT_FAILURE;', C.base]]],
  ['91', [['}', C.base]]],
];

function VimPanel() {
  return (
    <div className="flex h-full flex-col font-mono text-[9.5px] leading-[1.45]">
      <pre className="m-0 flex-1">
        {CODE.map(([ln, toks], i) => (
          <div key={i} className="flex gap-2 whitespace-pre">
            <span className="w-5 flex-none text-right text-fg-4">{ln}</span>
            <span>
              {toks.map(([t, cls], j) => (
                <span key={j} className={cls ?? C.base}>
                  {t}
                </span>
              ))}
            </span>
          </div>
        ))}
      </pre>
      <div className="mt-1 flex justify-between bg-bg-3 px-2 py-0.5 text-[9px]">
        <span className="font-medium text-amber">NOR</span>
        <span className="text-fg-2">coreutils/pwd.c</span>
        <span className="text-fg-2">1 sel</span>
        <span className="text-fg-2">84:38</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────── btop ─────────────────────────────────── */

const CORES = [
  ['C0', '2%', 'C5', '4%', 'C10', '0%'],
  ['C1', '0%', 'C6', '1%', 'C11', '0%'],
  ['C2', '0%', 'C7', '0%', 'C12', '0%'],
  ['C3', '0%', 'C8', '0%', 'C13', '0%'],
  ['C4', '1%', 'C9', '0%', 'L 0 0 0', ''],
];

const PROCS = [
  ['2278', 'firefox', '406M', '0.3'],
  ['1728', 'sway', '110M', '0.0'],
  ['3470', 'Isolate', '209M', '0.0'],
  ['16755', 'cmus', '16M', '0.0'],
  ['13822', 'Isolate', '313M', '0.0'],
  ['10841', 'btop', '4.9M', '0.0'],
  ['4287', 'Isolate', '94M', '0.0'],
  ['16918', 'alacrit', '92M', '0.0'],
  ['17247', 'alacrit', '92M', '0.0'],
  ['17521', 'alacrit', '91M', '0.0'],
  ['16950', 'alacrit', '88M', '0.0'],
  ['13755', 'alacrit', '94M', '0.0'],
  ['2478', 'WebExte', '126M', '0.0'],
  ['1790', 'pipewir', '11M', '0.0'],
  ['17865', 'hs', '11M', '0.0'],
];

const MEM = [
  ['Total:', '58.7 GiB', ''],
  ['Used:', '3.03 GiB', '5'],
  ['Available:', '55.7 GiB', '95'],
  ['Cached:', '5.62 GiB', '10'],
  ['Free:', '50.6 GiB', '86'],
];

function bar(pct: number, width = 10) {
  const filled = Math.round((pct / 100) * width);
  return '⡇'.repeat(filled) + '·'.repeat(Math.max(0, width - filled));
}

function BtopPanel() {
  return (
    <div className="flex h-full flex-col font-mono text-[8.5px] leading-[1.4] text-fg-2">
      <div className="flex items-baseline justify-between text-cyan">
        <span>┌─cpu──┤menu├──┤reset├──</span>
        <span className="text-amber">20:33:14</span>
        <span>── 2000ms ─┐</span>
      </div>
      <div className="flex justify-between text-fg-1">
        <span className="pl-3">Ryzen 7 5700G</span>
        <span>3.0 GHz</span>
      </div>
      <div className="flex justify-between text-fg-3">
        <span className="pl-3">CPU</span>
        <span>1% &nbsp; 38°C</span>
      </div>
      <div className="my-0.5 space-y-[1px] text-cyan-dim">
        {['⠀⢀⣠⣴⣾⣿⣿⣷⣦⣄⡀⢀⣠⣴⣾⣿⣷⣦⣄', '⣀⣤⣶⣿⣿⣷⣶⣤⣀⣀⣤⣶⣿⣷⣶⣤⣀⡀⠀', '⠀⠀⢀⣀⣤⣶⣶⣤⣀⡀⠀⢀⣠⣤⣶⣶⣤⣄⡀'].map((r, i) => (
          <div key={i} className="truncate">
            {r}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-x-2 text-[8px] text-fg-3">
        {CORES.map((row, i) => (
          <div key={i} className="contents">
            <span>
              {row[0]} <span className="text-cyan-dim">{row[1]}</span>
            </span>
            <span>
              {row[2]} <span className="text-cyan-dim">{row[3]}</span>
            </span>
            <span>
              {row[4]} <span className="text-cyan-dim">{row[5]}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-baseline justify-between text-cyan">
        <span>┌─proc──┤filter├──┤tree├──</span>
        <span className="text-fg-1">cpu lazy</span>
      </div>
      <div className="flex justify-between text-amber">
        <span className="pl-3">Pid Program User: MemB</span>
        <span>Cpu%↑</span>
      </div>
      <div className="space-y-[1px]">
        {PROCS.map(([pid, name, mem, cpu], i) => (
          <div key={i} className="flex justify-between">
            <span className="pl-3">
              <span className="text-fg-4">{pid}</span> <span className="text-fg-1">{name}</span>{' '}
              <span className="text-fg-3">regn</span>
            </span>
            <span>
              {mem} &nbsp;<span className="text-cyan-dim">{cpu}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-1 text-cyan">┌─mem──────┤disks├─┐</div>
      <div className="space-y-[1px]">
        {MEM.map(([k, v, pct], i) => (
          <div key={i} className="flex items-baseline justify-between pl-3">
            <span className="text-fg-1">{k}</span>
            <span className="flex items-baseline gap-1">
              {pct && <span className="text-cyan-dim">{bar(Number(pct))}</span>}
              <span>{v}</span>
              {pct && <span className="text-fg-3">{pct}%</span>}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-baseline justify-between text-cyan">
        <span>┌─net──┤auto├─ enp42s0 ─┐</span>
      </div>
      <div className="flex justify-between pl-3">
        <span className="text-amber">▼ 30 Byte/s</span>
        <span className="text-fg-3">download</span>
      </div>
      <div className="flex justify-between pl-3">
        <span className="text-cyan">▲ 21 Byte/s</span>
        <span className="text-fg-3">upload</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────── cmus ────────────────────────────────── */

const TRACKS: [n: string, title: string, year: string, dur: string][] = [
  ['1.', 'H.', '1996', '06:07'],
  ['2.', 'Useful Idiot', '1996', '00:38'],
  ['3.', 'Forty Six & 2', '1996', '06:04'],
  ['4.', 'Message To Harry Manb.', '1996', '01:53'],
  ['5.', 'Hooker With A Penis', '1996', '04:33'],
  ['6.', 'Intermission', '1996', '00:55'],
  ['7.', 'Jimmy', '1996', '05:24'],
  ['8.', 'Die Eier Von Satan', '1996', '02:17'],
  ['9.', 'Pushit', '1996', '09:55'],
  ['10.', 'Cesaro Summability', '1996', '01:26'],
  ['11.', 'Ænema', '1996', '06:39'],
  ['12.', '(-) Ions', '1996', '04:00'],
  ['13.', 'Third Eye', '1996', '13:46'],
  ['14.', 'The Grudge', '2001', '08:36'],
  ['15.', 'Eon Blue Apocalypse', '2001', '01:04'],
  ['16.', 'The Patient', '2001', '07:13'],
  ['17.', 'Mantra', '2001', '01:12'],
  ['18.', 'Schism', '2001', '06:47'],
  ['19.', 'Parabol', '2001', '03:04'],
  ['20.', 'Parabola', '2001', '06:03'],
  ['21.', 'Ticks & Leeches', '2001', '08:10'],
  ['22.', 'Lateralus', '2001', '09:24'],
  ['23.', 'Disposition', '2001', '04:46'],
  ['24.', 'Reflection', '2001', '11:07'],
];

function PlaylistPanel() {
  return (
    <div className="flex h-full flex-col font-mono text-[9px] leading-[1.5]">
      <div className="mb-1 border-b border-fg-4 pb-1 text-fg-2">Play Queue — 24 tracks</div>
      <div className="min-h-0 flex-1 space-y-[1px] overflow-hidden">
        {TRACKS.map(([n, title, year, dur], i) => (
          <div
            key={i}
            className={cn(
              'flex items-baseline gap-2',
              i === 0 ? 'bg-cyan-dim/40 text-fg-0' : 'text-fg-2',
            )}
          >
            <span className="text-amber-dim">TOOL</span>
            <span className="w-5 flex-none text-right text-fg-3">{n}</span>
            <span className="flex-1 truncate">{title}</span>
            <span className="text-fg-3">{year}</span>
            <span className="text-fg-3">{dur}</span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 border-t border-fg-4 pt-1 text-fg-3">
        <div className="flex justify-between text-fg-1">
          <span>TOOL — Ænima — 1. Eulogy</span>
          <span className="text-fg-3">1996</span>
        </div>
        <div className="flex justify-between text-amber-dim">
          <span>▶ 04:21 / 08:27 — 00:00</span>
          <span>all from library | C</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── fastfetch ──────────────────────────────── */

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

const ZFS_LIST: [name: string, used: string, avail: string, refer: string, mnt: string][] = [
  ['zroot', '103G', '346G', '96K', 'none'],
  ['zroot/ROOT', '103G', '346G', '96K', 'none'],
  ['zroot/ROOT/sway', '103G', '346G', '70.2G', '/'],
  ['zroot/ROOT/void', '8K', '346G', '69.6G', '/'],
];

const SNAPSHOTS = [
  '2023-12-26-142725',
  '2023-12-26-204113',
  '2023-12-26-205046',
  '2023-12-26-215821',
  '2023-12-26-215932',
  '2023-12-26-220806',
  '2023-12-27-002848',
  '2023-12-27-163425',
  '2023-12-27-200159',
  '2023-12-27-200344',
];

function ZfsPanel() {
  return (
    <div className="flex h-full flex-col gap-[3px] overflow-hidden font-mono text-[8.5px] leading-[1.4]">
      <div className="text-fg-3">regn % zfs version</div>
      <div className="text-fg-1">zfs-2.2.2-1</div>
      <div className="text-fg-1">zfs-kmod-2.2.2-1</div>
      <div className="text-fg-3">regn % zfs list</div>
      <div className="flex text-amber">
        <span className="w-[44%]">NAME</span>
        <span className="w-[14%]">USED</span>
        <span className="w-[14%]">AVAIL</span>
        <span className="w-[14%]">REFER</span>
        <span className="w-[14%]">MOUNTPOINT</span>
      </div>
      {ZFS_LIST.map(([name, used, avail, refer, mnt], i) => (
        <div key={i} className="flex text-fg-2">
          <span className="w-[44%] truncate text-fg-1">{name}</span>
          <span className="w-[14%]">{used}</span>
          <span className="w-[14%]">{avail}</span>
          <span className="w-[14%]">{refer}</span>
          <span className="w-[14%]">{mnt}</span>
        </div>
      ))}
      <div className="text-fg-3">
        regn % zfs list <span className="text-cyan">-o</span> name <span className="text-cyan">-t</span> snapshot | <span className="text-cyan">grep</span> xbps
      </div>
      {SNAPSHOTS.map((s, i) => (
        <div key={i} className="truncate text-fg-2">
          zroot/ROOT/sway@<span className="text-cyan">xbps</span>-install-{s}
        </div>
      ))}
      <div className="text-fg-3">
        regn % <span className="bg-fg-2 text-bg-1">&nbsp;</span>
      </div>
    </div>
  );
}

function FetchPanel() {
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
}

/**
 * Decorative desktop of faux terminals arranged to mirror the reference rice:
 * nvim (top-left) and btop (top-right) ride above, while cmus, zfs and pfetch
 * form the lower band (left → right). The whole cluster lives inside a single
 * centered, aspect-bounded *stage* rather than the raw viewport, so it stays
 * pinned to screen-center and never flies apart on tall displays. The stage is
 * sized a touch larger than the portfolio shell so each window's outer edge
 * peeks out from behind it while the inner edges stay covered.
 */
export function BackgroundTerminals() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 flex select-none items-center justify-center overflow-hidden opacity-85 max-md:hidden"
    >
      <div className="relative h-[min(980px,100dvh)] w-full max-w-[max(94dvw,52rem)]">
        {/* ── top band ── */}
        <FauxTerminal
          title="nvim ~/src/coreutils/pwd.c"
          className="h-[45%] w-[45%]"
          style={{ left: 0, top: 0 }}
        >
          <ScramblePanel delay={40}>
            <VimPanel />
          </ScramblePanel>
        </FauxTerminal>

        <FauxTerminal
          title="btop — system monitor"
          className="h-[46%] w-[40%]"
          style={{ right: 0, top: 0 }}
        >
          <ScramblePanel delay={130}>
            <BtopPanel />
          </ScramblePanel>
        </FauxTerminal>

        {/* ── lower band: cmus · zfs · pfetch ── */}
        <FauxTerminal
          title="cmus — music"
          className="h-[40%] w-[29%]"
          style={{ left: 0, bottom: 0 }}
        >
          <ScramblePanel delay={290}>
            <PlaylistPanel />
          </ScramblePanel>
        </FauxTerminal>

        <FauxTerminal
          title="regn@fjell : ~ — zsh"
          className="h-[40%] w-[38%]"
          style={{ left: '33%', bottom: 0 }}
        >
          <ScramblePanel delay={210}>
            <ZfsPanel />
          </ScramblePanel>
        </FauxTerminal>

        <FauxTerminal
          title="regn@fjell : ~ — pfetch"
          className="h-[22%] w-[22%]"
          style={{ right: 0, top: '52%' }}
        >
          <ScramblePanel delay={370}>
            <FetchPanel />
          </ScramblePanel>
        </FauxTerminal>
      </div>

      {/* Faint vignette so the outer edges sink into the desktop. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 86% 90% at center, rgba(0,0,0,0) 62%, color-mix(in oklch, var(--bg-0) 55%, transparent) 100%)',
        }}
      />
    </div>
  );
}
