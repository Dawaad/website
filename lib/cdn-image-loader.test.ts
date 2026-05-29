import { afterEach, describe, expect, it, vi } from 'vitest';

import { buildSrcSet, cdnImageLoader, getCdnUrl } from './cdn-image-loader';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('getCdnUrl', () => {
  it('joins the CDN base with the asset path', () => {
    vi.stubEnv('NEXT_PUBLIC_CDN_URL', 'https://cdn.jtucker.io');
    expect(getCdnUrl('bg/phosphor/original-1920.webp')).toBe(
      'https://cdn.jtucker.io/bg/phosphor/original-1920.webp',
    );
  });

  it('normalizes a trailing slash on the base and a leading slash on the path', () => {
    vi.stubEnv('NEXT_PUBLIC_CDN_URL', 'https://cdn.jtucker.io/');
    expect(getCdnUrl('/bg/amber/original-640.avif')).toBe(
      'https://cdn.jtucker.io/bg/amber/original-640.avif',
    );
  });

  it('falls back to a root-relative path when the base is unset', () => {
    vi.stubEnv('NEXT_PUBLIC_CDN_URL', '');
    expect(getCdnUrl('bg/mono/original-1280.webp')).toBe('/bg/mono/original-1280.webp');
  });
});

describe('cdnImageLoader', () => {
  it('resolves the next/image src through the CDN base', () => {
    vi.stubEnv('NEXT_PUBLIC_CDN_URL', 'https://cdn.jtucker.io');
    expect(cdnImageLoader({ src: 'bg/blueprint/original-960.webp', width: 960 })).toBe(
      'https://cdn.jtucker.io/bg/blueprint/original-960.webp',
    );
  });
});

describe('buildSrcSet', () => {
  it('builds a width-descriptor srcset from variants', () => {
    vi.stubEnv('NEXT_PUBLIC_CDN_URL', 'https://cdn.jtucker.io');
    const srcset = buildSrcSet([
      { src: 'bg/amber/original-1280.webp', width: 1280 },
      { src: 'bg/amber/original-1920.webp', width: 1920 },
    ]);
    expect(srcset).toBe(
      'https://cdn.jtucker.io/bg/amber/original-1280.webp 1280w, ' +
        'https://cdn.jtucker.io/bg/amber/original-1920.webp 1920w',
    );
  });

  it('returns an empty string for no variants', () => {
    expect(buildSrcSet([])).toBe('');
  });
});
