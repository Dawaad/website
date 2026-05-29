import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DESKTOP_WINDOWS } from '@/components/feature-modules/portfolio/config/desktop-windows';
import { WindowManagerProvider } from '@/components/feature-modules/portfolio/context/window-manager-provider';

import { DesktopDock } from './desktop-dock';

const renderDock = () =>
  render(
    <WindowManagerProvider>
      <DesktopDock />
    </WindowManagerProvider>,
  );

describe('DesktopDock', () => {
  it('renders one tile per managed window, all running by default', () => {
    renderDock();
    const tiles = screen.getAllByRole('button');
    expect(tiles).toHaveLength(DESKTOP_WINDOWS.length);
    for (const tile of tiles) expect(tile).toHaveAttribute('aria-pressed', 'true');
  });

  it('exposes a control for the cmus music window and toggles it', () => {
    renderDock();
    const cmus = screen.getByRole('button', { name: 'cm' });
    expect(cmus).toHaveAttribute('aria-pressed', 'true');
    expect(cmus).toHaveAttribute('title', 'music — hide');

    fireEvent.click(cmus);
    expect(cmus).toHaveAttribute('aria-pressed', 'false');
    expect(cmus).toHaveAttribute('title', 'music — show');
  });
});
