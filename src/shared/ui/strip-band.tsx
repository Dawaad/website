import type { FC } from 'react';

interface StripBandProps {
  height: number;
}

/**
 * Recreates the pane-header strip's bar (dark band, bottom rule, centre
 * divider) on top of an opaque cover, so the strip reads as a persistent frame
 * while the ASCII skeleton scrambles its dynamic labels above it.
 */
export const StripBand: FC<StripBandProps> = ({ height }) => {
  if (!height) return null;
  return (
    <div
      className="absolute inset-x-0 top-0 border-b border-fg-4 bg-black/[0.18]"
      style={{ height }}
    >
      <div className="absolute inset-y-0 left-1/2 border-l border-fg-4" />
    </div>
  );
};
