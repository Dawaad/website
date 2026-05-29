'use client';

import { usePathname } from 'next/navigation';
import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { FC, ReactNode } from 'react';

import { AsciiSkeleton } from '@/components/feature-modules/portfolio/components/ascii-skeleton';
import { BackgroundTerminals } from '@/components/feature-modules/portfolio/components/background-terminals';
import { BootOverlay } from '@/components/feature-modules/portfolio/components/boot-overlay';
import { DesktopDock } from '@/components/feature-modules/portfolio/components/desktop-dock';
import { DesktopTopBar } from '@/components/feature-modules/portfolio/components/desktop-top-bar';
import { SchemeSwitcher } from '@/components/feature-modules/portfolio/components/scheme-switcher';
import { StatusBar } from '@/components/feature-modules/portfolio/components/status-bar';
import { TabBar } from '@/components/feature-modules/portfolio/components/tab-bar';
import { TerminalScrollbar } from '@/components/feature-modules/portfolio/components/terminal-scrollbar';
import { TitleBar } from '@/components/feature-modules/portfolio/components/title-bar';
import { DEFAULT_SCHEME, SCHEMES } from '@/components/feature-modules/portfolio/config/schemes';
import { StripBand } from '@/components/feature-modules/portfolio/components/strip-band';
import { SelectionProvider } from '@/components/feature-modules/portfolio/context/selection-provider';
import { WindowManagerProvider } from '@/components/feature-modules/portfolio/context/window-manager-provider';
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
 * Natural height of a pane-header strip. Seeds the cover so the header reads as
 * grounded on the first painted frame, before the suspended content commits and
 * the real strips can be measured (which then refines it).
 */
const INITIAL_COVER_TOP = 33;

interface PortfolioShellProps {
  children: ReactNode;
}

/** Persistent terminal frame shared across all section routes. */
export const PortfolioShell: FC<PortfolioShellProps> = ({ children }) => {
  const [scheme, setScheme] = useState(DEFAULT_SCHEME);
  const [intro, setIntro] = useState<IntroPhase>('boot');
  const [introBones, setIntroBones] = useState<SkeletonBone[]>([]);
  const [introDecode, setIntroDecode] = useState(0);
  const [coverTop, setCoverTop] = useState(INITIAL_COVER_TOP);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { phase, aOnly, shared, bOnly, navigate } = usePageTransition(contentRef);

  const transitioning = phase !== 'idle';
  const backdropVisible = phase === 'out' || phase === 'union' || phase === 'collapse';
  const aOnlyVisible = phase === 'out' || phase === 'union';
  const sharedVisible = phase === 'out' || phase === 'union' || phase === 'collapse';
  const bOnlyVisible = phase === 'union' || phase === 'collapse';

  // During the intro the real content is clipped to the already-decoded edge
  // (the complement of the skeleton's wipe) rather than hidden under an opaque
  // cover — so the shell's own glass/blur stays visible the whole time and the
  // boot state matches the settled state. At boot (introDecode 0) it is fully
  // clipped away; the decode sweep reveals it edge-to-edge. A nested cover can't
  // be glassy (its backdrop-filter can't see past the shell's), hence the clip.
  const introClip =
    intro === 'done'
      ? undefined
      : decodeClip(1 - introDecode, DECODE_DIR === 'ltr' ? 'rtl' : 'ltr');

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
  const measureCover = useCallback(() => {
    const content = contentRef.current;
    if (!content) return;
    const base = content.getBoundingClientRect();
    // Only the strips on the top-most row count: on mobile the panels stack, so
    // lower panels' strips sit far down the scroll and must not push the cover
    // off-screen (which would expose the real content during the intro).
    const strips = [...content.querySelectorAll('[data-static]')]
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top - base.top, bottom: r.bottom - base.top, height: r.height };
      })
      .filter((s) => s.height > 0);
    // Keep the seeded/last-good height until the real strips commit, so the
    // header stays grounded instead of collapsing to 0 during the intro.
    if (strips.length === 0) return;
    const minTop = Math.min(...strips.map((s) => s.top));
    const top = strips
      .filter((s) => s.top <= minTop + s.height)
      .reduce((m, s) => Math.max(m, s.bottom), 0);
    setCoverTop(top);
  }, []);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    measureCover();
    // The route content mounts behind a Suspense boundary (sections call
    // useSearchParams), so its static strips can commit a frame or two after
    // this effect first runs. Without a re-measure, coverTop stays seeded, the
    // intro/transition covers may not line up with the real header. Re-measure
    // on any subtree commit so the covers sit below the strips precisely.
    const observer = new MutationObserver(measureCover);
    observer.observe(content, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname, measureCover]);

  // Measure the real content's shape into the intro jumble during boot, so the
  // bones are ready the instant the scramble starts. The section mounts behind
  // Suspense, so this probes every frame until the bones exist — the decode is
  // gated on them, so the sweep never reveals raw, unjumbled content.
  useEffect(() => {
    if (intro === 'done' || introBones.length > 0) return;
    let frame = 0;
    const probe = () => {
      const bones = contentRef.current ? measureSkeleton(contentRef.current) : [];
      if (bones.length > 0) {
        setIntroBones(bones);
        return;
      }
      frame = requestAnimationFrame(probe);
    };
    frame = requestAnimationFrame(probe);
    return () => cancelAnimationFrame(frame);
  }, [intro, introBones.length]);

  // After the boot sequence, hold the pure-jumble window, then undecode the
  // jumble edge-to-edge into the real content before the final reveal. Gated on
  // the content-shaped bones existing, so the sweep never reveals raw content.
  useEffect(() => {
    if (intro !== 'scramble' || introBones.length === 0) return;
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
    return () => cancelAnimationFrame(frame);
  }, [intro, introBones.length]);

  return (
    <SelectionProvider>
      <WindowManagerProvider>
        <BackgroundTerminals scheme={scheme} />
        <DesktopTopBar handle={portfolioContent.user.handle} />
        <DesktopDock />
        <div className="terminal-shell relative z-10 flex h-[min(820px,calc(100dvh-48px))] w-full max-w-[min(max(80dvw,48rem),var(--breakpoint-3xl))] flex-col overflow-hidden rounded-xs border border-fg-3 bg-bg-1 shadow-sm max-md:h-dvh max-md:max-w-none max-md:rounded-none max-md:border-0">
        <TitleBar user={portfolioContent.user} />
        <TabBar onNavigate={navigate} />
        <div className="relative z-[1] min-h-0 flex-1">
          <div
            ref={contentRef}
            data-portfolio-content
            style={{ clipPath: introClip }}
            className="term-no-native-scrollbar flex h-full flex-col overflow-y-auto md:grid md:grid-cols-2 md:overflow-hidden md:[&>*:not(:last-child)]:border-r md:[&>*:not(:last-child)]:border-fg-4"
          >
            {/* Sections call `useSearchParams` (via useListNavigation) for
                deep-linking, which requires a Suspense ancestor in Next. One
                boundary here covers every route. */}
            <Suspense fallback={null}>{children}</Suspense>
          </div>
          {/* Mobile scrolls this whole column; on desktop it is overflow-hidden
              and the bar self-hides (panels carry their own). */}
          <TerminalScrollbar targetRef={contentRef} />
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
          {/* Intro — the content itself is clipped (see `introClip`), so this
              layer stays transparent and the shell's glass shows through. It
              only hosts the grounded StripBand that keeps the pane header
              visible while the body decodes. During boot the boot log shows over
              the glass; the jumble plays for the scramble phase, then the decode
              sweep reveals the real content edge-to-edge. */}
          {intro !== 'done' && (
            <>
              <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
                <StripBand height={coverTop} />
              </div>
              {intro === 'scramble' && (
                <AsciiSkeleton bones={introBones} visible decode={introDecode} decodeDir={DECODE_DIR} />
              )}
              {intro === 'boot' && (
                <BootOverlay onDone={() => setIntro('scramble')} topOffset={coverTop} />
              )}
            </>
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
      </WindowManagerProvider>
    </SelectionProvider>
  );
}
