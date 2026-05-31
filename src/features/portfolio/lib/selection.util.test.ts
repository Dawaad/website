import { describe, expect, it } from 'vitest';

import { indexFromSlug } from './selection.util';

const SLUGS = ['alpha', 'beta', 'gamma'];

describe('indexFromSlug', () => {
  it('returns the index of a matching slug', () => {
    expect(indexFromSlug('alpha', SLUGS)).toBe(0);
    expect(indexFromSlug('gamma', SLUGS)).toBe(2);
  });

  it('returns null for a slug not in the list', () => {
    expect(indexFromSlug('delta', SLUGS)).toBeNull();
  });

  it('returns null when the slug is null (no param present)', () => {
    expect(indexFromSlug(null, SLUGS)).toBeNull();
  });

  it('returns null for an empty-string slug', () => {
    expect(indexFromSlug('', SLUGS)).toBeNull();
  });

  it('returns null when the list is empty', () => {
    expect(indexFromSlug('alpha', [])).toBeNull();
  });

  it('matches the first occurrence if slugs somehow repeat', () => {
    expect(indexFromSlug('dup', ['dup', 'dup'])).toBe(0);
  });
});
