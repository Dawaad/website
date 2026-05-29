declare namespace NodeJS {
  interface ProcessEnv {
    /** Base URL of the Cloudflare CDN serving background imagery (no trailing slash). */
    NEXT_PUBLIC_CDN_URL?: string;
  }
}
