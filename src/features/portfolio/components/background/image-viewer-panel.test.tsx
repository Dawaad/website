import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ImageViewerPanel } from './image-viewer-panel';

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_CDN_URL', 'https://cdn.jtucker.io');
});
afterEach(() => {
  vi.unstubAllEnvs();
});

describe('ImageViewerPanel', () => {
  it('shows the original photo for a photo scheme', () => {
    const { container } = render(<ImageViewerPanel scheme="amber" enabled />);
    const sources = [...container.querySelectorAll('source')].map((s) => s.getAttribute('type'));
    expect(sources).toEqual(['image/webp']);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(
      'https://cdn.jtucker.io/bg/amber/original-640.webp',
    );
  });

  it('renders an empty viewer for the flat beige scheme', () => {
    const { container } = render(<ImageViewerPanel scheme="beige" enabled />);
    expect(container.querySelector('img')).toBeNull();
  });

  it('fetches no image when disabled', () => {
    const { container } = render(<ImageViewerPanel scheme="amber" enabled={false} />);
    expect(container.querySelector('img')).toBeNull();
  });
});
