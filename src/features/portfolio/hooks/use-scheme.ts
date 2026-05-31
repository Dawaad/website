import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import {
  DEFAULT_SCHEME,
  SCHEMES,
} from "@/src/features/portfolio/lib/config/schemes";
import type { SchemeName } from "@/src/shared/types/portfolio";

interface Scheme {
  scheme: SchemeName;
  setScheme: Dispatch<SetStateAction<SchemeName>>;
}

/**
 * Active colour scheme, mirrored onto <body> as a `scheme-*` class so the
 * CSS-variable palette swaps without clobbering the body's layout classes.
 */
export function useScheme(): Scheme {
  const [scheme, setScheme] = useState<SchemeName>(DEFAULT_SCHEME);

  useEffect(() => {
    const body = document.body;
    SCHEMES.forEach((s) => body.classList.remove("scheme-" + s));
    body.classList.add("scheme-" + scheme);
  }, [scheme]);

  return { scheme, setScheme };
}
