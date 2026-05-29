'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { AsciiSkeleton } from '@/components/feature-modules/portfolio/components/ascii-skeleton';
import { BackgroundTerminals } from '@/components/feature-modules/portfolio/components/background-terminals';
import { BootOverlay } from '@/components/feature-modules/portfolio/components/boot-overlay';
import { SchemeSwitcher } from '@/components/feature-modules/portfolio/components/scheme-switcher';
import { StatusBar } from '@/components/feature-modules/portfolio/components/status-bar';
import { TabBar } from '@/components/feature-modules/portfolio/components/tab-bar';
import { TitleBar } from '@/components/feature-modules/portfolio/components/title-bar';
import { DEFAULT_SCHEME, SCHEMES } from '@/components/feature-modules/portfolio/config/schemes';
import { SelectionProvider } from '@/components/feature-modules/portfolio/context/selection-provider';
import { usePageTransition } from '@/components/feature-modules/portfolio/hooks/use-page-transition';
import { useRouteTabKeys } from '@/components/feature-modules/portfolio/hooks/use-route-tab-keys';
import { portfolioContent } from '@/components/feature-modules/portfolio/service/portfolio-content';
import {
  decodeClip,
  measureSkeleton,
  type DecodeDir,
  type SkeletonBone,
} from '@/components/feature-modules/portfolio/util/skeleton.util';
import { cn } from '@/lib/util/utils';

type IntroPhase = 'boot' | 'scramble' | 'done';

/** Pure-jumble window before the decode sweep begins. */
const SCRAMBLE_MS = 200;
/** Latter-end window over which the jumble undecodes into the real content. */
const DECODE_MS = 420;
/** Direction the intro jumble resolves; flip to 'rtl' to sweep right→left. */
const DECODE_DIR: DecodeDir = 'ltr';

/**
 * Recreates the pane-header strip's bar (dark band, bottom rule, centre
 * divider) on top of an opaque cover, so the strip reads as a persistent frame
 * while the ASCII skeleton scrambles its dynamic labels above it.
 */
function StripBand({ height }: { height: number }) {
  if (!height) return null;
  return (
    <div
      className="absolute inset-x-0 top-0 border-b border-fg-4 bg-black/[0.18]"
      style={{ height }}
    >
      <div className="absolute inset-y-0 left-1/2 border-l border-fg-4" />
    </div>
  );
}

/** Persistent terminal frame shared across all section routes. */
export function PortfolioShell({ children }: { children: ReactNode }) {
  const [scheme, setScheme] = useState(DEFAULT_SCHEME);
  const [intro, setIntro] = useState<IntroPhase>('boot');
  const [introBones, setIntroBones] = useState<SkeletonBone[]>([]);
  const [introDecode, setIntroDecode] = useState(0);
  const [coverTop, setCoverTop] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { phase, aOnly, shared, bOnly, navigate } = usePageTransition(contentRef);

  const transitioning = phase !== 'idle';
  const backdropVisible = phase === 'out' || phase === 'union' || phase === 'collapse';
  const aOnlyVisible = phase === 'out' || phase === 'union';
  const sharedVisible = phase === 'out' || phase === 'union' || phase === 'collapse';
  const bOnlyVisible = phase === 'union' || phase === 'collapse';

  // Swap the active scheme class on <body> without clobbering layout classes.
  useEffect(() => {
    const body = document.body;
    SCHEMES.forEach((s) => body.classList.remove('scheme-' + s));
    body.classList.add('scheme-' + scheme);
  }, [scheme]);

  useRouteTabKeys(navigate);

  // Measure the bottom of the static pane-header strips so every opaque cover
  // (boot, intro scramble, route transition) can sit below them and keep them
  // visible. Re-measured per route since the strips belong to the content.
  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const base = content.getBoundingClientRect();
    let top = 0;
    content.querySelectorAll('[data-static]').forEach((el) => {
      top = Math.max(top, el.getBoundingClientRect().bottom - base.top);
    });
    setCoverTop(top);
  }, [pathname]);

  // After the boot sequence, scramble the real content briefly, then undecode
  // it edge-to-edge over the latter end of the intro before the final reveal.
  useEffect(() => {
    if (intro !== 'scramble') return;
    const measure = requestAnimationFrame(() => {
      if (contentRef.current) setIntroBones(measureSkeleton(contentRef.current));
    });
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      setIntroDecode(Math.min(1, Math.max(0, (elapsed - SCRAMBLE_MS) / DECODE_MS)));
      if (elapsed >= SCRAMBLE_MS + DECODE_MS) {
        setIntro('done');
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(measure);
      cancelAnimationFrame(frame);
    };
  }, [intro]);

  return (
    <SelectionProvider>
      <BackgroundTerminals />
      <div className="relative z-10 flex h-[min(820px,calc(100dvh-48px))] w-full max-w-[min(max(80dvw,48rem),var(--breakpoint-3xl))] flex-col overflow-hidden border border-fg-3 bg-bg-1 shadow-sm max-md:h-dvh max-md:max-w-none max-md:border-0">
        <TitleBar user={portfolioContent.user} />
        <TabBar onNavigate={navigate} />
        <div className="relative z-[1] min-h-0 flex-1">
          <div
            ref={contentRef}
            data-portfolio-content
            className="flex h-full flex-col overflow-y-auto md:grid md:grid-cols-2 md:overflow-hidden md:[&>*:not(:last-child)]:border-r md:[&>*:not(:last-child)]:border-fg-4"
          >
            {children}
          </div>
          {/* Opaque cover hiding the route swap; the strip bar is repainted on
              top so it stays visible while its labels scramble with the body. */}
          {transitioning && (
            <div
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-0 z-20 bg-bg-1 transition-opacity duration-150',
                backdropVisible ? 'opacity-100' : 'opacity-0',
              )}
            >
              <StripBand height={coverTop} />
            </div>
          )}
          {/* Outgoing-only bones — fade out during collapse. */}
          <AsciiSkeleton bones={aOnly} visible={aOnlyVisible} />
          {/* Shared (A∩B) region — drawn once, persists until reveal. */}
          <AsciiSkeleton bones={shared} visible={sharedVisible} />
          {/* Incoming-only bones — fade in at the union frame. */}
          <AsciiSkeleton bones={bOnly} visible={bOnlyVisible} />
          {/* Intro scramble — opaque cover + ASCII jumble of the real content,
              played briefly once boot finishes, then collapses to reveal. */}
          {intro === 'scramble' && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 bg-bg-1"
              style={{ clipPath: introDecode > 0 ? decodeClip(introDecode, DECODE_DIR) : undefined }}
            >
              <StripBand height={coverTop} />
            </div>
          )}
          <AsciiSkeleton
            bones={intro === 'scramble' ? introBones : []}
            visible={intro === 'scramble'}
            decode={introDecode}
            decodeDir={DECODE_DIR}
          />
          {/* Boot sequence — sits below the static strips so they stay visible. */}
          {intro === 'boot' && (
            <BootOverlay onDone={() => setIntro('scramble')} topOffset={coverTop} />
          )}
        </div>
        <StatusBar scheme={scheme} setScheme={setScheme} />
        {/* CRT scanline + phosphor-glow overlay. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-50 rounded-[inherit] mix-blend-overlay"
          style={{
            background:
              'repeating-linear-gradient(to bottom, rgba(255,255,255,0) 0 2px, rgba(0,0,0,0.16) 3px 3px), radial-gradient(ellipse at center, rgba(var(--glow-fg-rgb),0.05) 0%, rgba(0,0,0,0) 70%)',
          }}
        />
      </div>
      <SchemeSwitcher scheme={scheme} setScheme={setScheme} />
    </SelectionProvider>
  );
}
