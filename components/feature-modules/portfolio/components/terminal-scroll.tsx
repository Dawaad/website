'use client';

import { useRef } from 'react';
import type { FC, ReactNode } from 'react';

import { TerminalScrollbar } from '@/components/feature-modules/portfolio/components/terminal-scrollbar';
import { cn } from '@/lib/util/utils';

interface TerminalScrollProps {
  className?: string;
  viewportClassName?: string;
  children: ReactNode;
}

/**
 * Scroll container + terminal bar in one. The outer box owns layout and acts as
 * the bar's positioning context; the inner box scrolls with the native bar
 * hidden. Pass scroll-viewport styling (padding, responsive overflow) through
 * `viewportClassName` so the bar stays flush to the edge, outside the padding.
 */
export const TerminalScroll: FC<TerminalScrollProps> = ({
  className,
  viewportClassName,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className={cn('relative min-h-0', className)}>
      <div ref={ref} className={cn('term-no-native-scrollbar h-full overflow-auto', viewportClassName)}>
        {children}
      </div>
      <TerminalScrollbar targetRef={ref} />
    </div>
  );
};
