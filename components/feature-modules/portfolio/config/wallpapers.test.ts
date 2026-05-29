import { describe, expect, it } from 'vitest';

import { SCHEMES } from '@/components/feature-modules/portfolio/config/schemes';
import { IMAGE_WIDTHS, WALLPAPERS } from '@/components/feature-modules/portfolio/config/wallpapers';

describe('WALLPAPERS manifest', () => {
  it('resolves an explicit entry for every scheme (parity with SchemeName)', () => {
    for (const scheme of SCHEMES) {
      expect(scheme in WALLPAPERS).toBe(true);
    }
  });

  it('renders beige as the flat scheme — no fetched image', () => {
    expect(WALLPAPERS.beige).toBeNull();
  });

  it('gives every non-beige scheme a webp image at the full width ladder', () => {
    for (const scheme of SCHEMES.filter((s) => s !== 'beige')) {
      expect(WALLPAPERS[scheme]?.webp.map((v) => v.width)).toEqual([...IMAGE_WIDTHS]);
    }
  });

  it('names variant paths by the bg/<scheme>/original-<width>.webp convention', () => {
    expect(WALLPAPERS.blueprint?.webp).toContainEqual({
      src: 'bg/blueprint/original-2560.webp',
      width: 2560,
    });
    expect(WALLPAPERS.mono?.webp).toContainEqual({
      src: 'bg/mono/original-640.webp',
      width: 640,
    });
  });
});
