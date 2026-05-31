import type { ImageLoaderProps } from 'next/image';

/**
 * A single resolution of a responsive image: a CDN-relative path and the
 * intrinsic pixel width it was generated at (used as the srcset `w` descriptor).
 */
export interface ImageVariant {
  src: string;
  width: number;
}

/**
 * Cloudflare CDN base, read at call time (not module load) so tests can stub
 * `NEXT_PUBLIC_CDN_URL`. Trailing slashes are trimmed so joining is unambiguous.
 * Unset → empty base, which yields root-relative paths (graceful local dev).
 */
const cdnBase = (): string => (process.env.NEXT_PUBLIC_CDN_URL ?? '').replace(/\/+$/, '');

/** Resolve a CDN-relative asset path to an absolute URL (or root-relative if unset). */
export const getCdnUrl = (path: string): string => `${cdnBase()}/${path.replace(/^\/+/, '')}`;

/** `next/image` loader that maps a bare `src` through the CDN base. */
export const cdnImageLoader = ({ src }: ImageLoaderProps): string => getCdnUrl(src);

/** Build a width-descriptor `srcset` string from responsive variants. */
export const buildSrcSet = (variants: ImageVariant[]): string =>
  variants.map((v) => `${getCdnUrl(v.src)} ${v.width}w`).join(', ');
