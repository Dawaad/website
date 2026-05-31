import { expect, test } from '@playwright/test';

// The wallpaper desktop is `max-md:hidden`, so this spec overrides the mobile
// project profile and runs at a desktop viewport. CDN assets are intercepted so
// the test is deterministic without the real (~44) files existing yet, and so
// we can assert *which* assets are fetched — the proof of "lazy per switch".
test.use({ viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false });

// 1×1 transparent gif — a valid image body so onLoad (not onError) fires.
const STUB_IMAGE = Buffer.from(
  'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  'base64',
);

test.describe('background wallpaper', () => {
  test('lazily loads only the active scheme and swaps on theme switch', async ({ page }) => {
    const requested: string[] = [];
    await page.route('**/bg/**', async (route) => {
      requested.push(new URL(route.request().url()).pathname);
      await route.fulfill({ status: 200, contentType: 'image/gif', body: STUB_IMAGE });
    });

    const crashes: string[] = [];
    page.on('pageerror', (err) => crashes.push(err.message));

    await page.goto('/');

    // Default scheme is beige (flat mono) → it has no imagery, so nothing under
    // /bg/ should ever be fetched on first paint.
    await page.waitForTimeout(600);
    expect(requested, 'beige is flat — no wallpaper assets fetched on load').toEqual([]);

    // Switch to phosphor → its wallpaper loads. (The wallpaper layer is always
    // mounted; the imv preview is gated by the window manager, so we prove
    // laziness via the wallpaper — viewer switching is covered by unit tests.)
    await page.getByRole('button', { name: 'phosphor', exact: true }).click();
    await expect
      .poll(() => requested.some((p) => p.startsWith('/bg/phosphor/original')))
      .toBe(true);

    // Laziness: no other scheme's assets were fetched.
    expect(requested.filter((p) => /\/bg\/(amber|blueprint|mono)\//.test(p))).toEqual([]);

    // Switch to amber → amber loads; still nothing for blueprint/mono.
    await page.getByRole('button', { name: 'amber', exact: true }).click();
    await expect.poll(() => requested.some((p) => p.startsWith('/bg/amber/'))).toBe(true);
    expect(requested.filter((p) => /\/bg\/(blueprint|mono)\//.test(p))).toEqual([]);

    // No uncaught exceptions across the whole flow.
    expect(crashes).toEqual([]);
  });
});
