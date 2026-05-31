import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { WallpaperLayer } from './wallpaper-layer';

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_CDN_URL', 'https://cdn.jtucker.io');
});
afterEach(() => {
  vi.unstubAllEnvs();
});

describe('WallpaperLayer', () => {
  it('renders the scheme wallpaper when enabled', () => {
    const { container } = render(<WallpaperLayer scheme="phosphor" enabled />);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(
      'https://cdn.jtucker.io/bg/phosphor/original-640.webp',
    );
  });

  it('renders nothing but the vignette for the flat beige scheme', () => {
    const { container } = render(<WallpaperLayer scheme="beige" enabled />);
    expect(container.querySelector('img')).toBeNull();
  });

  it('fetches no image when disabled (mobile / Save-Data)', () => {
    const { container } = render(<WallpaperLayer scheme="phosphor" enabled={false} />);
    expect(container.querySelector('img')).toBeNull();
  });
});
