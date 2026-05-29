import { expect, test } from '@playwright/test';

// Runs at the iPhone 13 viewport (≈390px < md), so Tailwind's `max-md:hidden`
// genuinely hides panes — the behavior jsdom can't evaluate.

const FIRST_POST = 'On small models and small teams';
const FIRST_POST_SLUG = 'on-small-models-and-small-teams';

test.describe('mobile master/detail', () => {
  test('shows only the list, opens detail on tap, and goes back', async ({ page }) => {
    await page.goto('/posts');

    const listCmd = page.getByText('tail -f posts/');
    const backButton = page.getByRole('button', { name: /cd \.\./i });
    // The title renders in both the list row and the (off-screen) detail header,
    // so target whichever copy is actually visible at this breakpoint.
    const visibleTitle = page.getByText(FIRST_POST).and(page.locator(':visible'));

    // 1. List only — list command visible, detail back control hidden.
    await expect(listCmd).toBeVisible();
    await expect(backButton).toBeHidden();

    // 2. Tap a row → detail opens, list hides, URL carries the slug.
    await visibleTitle.click();
    await expect(backButton).toBeVisible();
    await expect(listCmd).toBeHidden();
    await expect(page).toHaveURL(new RegExp(`item=${FIRST_POST_SLUG}`));

    // 3. Back → list returns, URL is clean.
    await backButton.click();
    await expect(listCmd).toBeVisible();
    await expect(backButton).toBeHidden();
    await expect(page).not.toHaveURL(/item=/);
  });

  test('deep link opens the detail directly on reload', async ({ page }) => {
    await page.goto(`/posts?item=${FIRST_POST_SLUG}`);

    const backButton = page.getByRole('button', { name: /cd \.\./i });
    await expect(backButton).toBeVisible();
    await expect(page.getByText('tail -f posts/')).toBeHidden();
    // The opened post's title shows in the (now visible) detail pane.
    await expect(page.getByText(FIRST_POST).and(page.locator(':visible'))).toBeVisible();
  });

  test('an unknown slug self-heals to the list with a clean URL', async ({ page }) => {
    await page.goto('/posts?item=nope-not-real');

    await expect(page.getByText('tail -f posts/')).toBeVisible();
    await expect(page.getByRole('button', { name: /cd \.\./i })).toBeHidden();
    await expect(page).not.toHaveURL(/item=/);
  });
});
