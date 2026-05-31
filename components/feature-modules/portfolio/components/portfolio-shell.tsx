'use client';

import { Suspense, useRef } from 'react';
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
import { StripBand } from '@/components/feature-modules/portfolio/components/strip-band';
import { SelectionProvider } from '@/components/feature-modules/portfolio/context/selection-provider';
import { WindowManagerProvider } from '@/components/feature-modules/portfolio/context/window-manager-provider';
import { useCoverTop } from '@/components/feature-modules/portfolio/hooks/use-cover-top';
import { useIntroSequence } from '@/components/feature-modules/portfolio/hooks/use-intro-sequence';
import { usePageTransition } from '@/components/feature-modules/portfolio/hooks/use-page-transition';
import { useRouteTabKeys } from '@/components/feature-modules/portfolio/hooks/use-route-tab-keys';
import { useScheme } from '@/components/feature-modules/portfolio/hooks/use-scheme';
import { portfolioContent } from '@/components/feature-modules/portfolio/service/portfolio-content';
import { cn } from '@/lib/util/utils';

interface PortfolioShellProps {
  children: ReactNode;
}

/** Persistent terminal frame shared across all section routes. */
export const PortfolioShell: FC<PortfolioShellProps> = ({ children }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { scheme, setScheme } = useScheme();
  const coverTop = useCoverTop(contentRef);
  const { intro, introBones, introDecode, introClip, decodeDir, beginScramble } =
    useIntroSequence(contentRef);

  const { phase, aOnly, shared, bOnly, navigate } = usePageTransition(contentRef);

  const transitioning = phase !== 'idle';
  const backdropVisible = phase === 'out' || phase === 'union' || phase === 'collapse';
  const aOnlyVisible = phase === 'out' || phase === 'union';
  const sharedVisible = phase === 'out' || phase === 'union' || phase === 'collapse';
  const bOnlyVisible = phase === 'union' || phase === 'collapse';

  useRouteTabKeys(navigate);

  return (
    <SelectionProvider>
      <WindowManagerProvider>
        <BackgroundTerminals scheme={scheme} />
        <DesktopTopBar handle={portfolioContent.user.handle} />
        {/* Dock mirrors the backdrop terminals it controls: held back through the
            boot/scramble intro, it eases in only once the desktop has settled and
            then stays for the session (intro never leaves 'done'). */}
        <DesktopDock visible={intro === 'done'} />
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
                <AsciiSkeleton bones={introBones} visible decode={introDecode} decodeDir={decodeDir} />
              )}
              {intro === 'boot' && (
                <BootOverlay onDone={beginScramble} topOffset={coverTop} />
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
