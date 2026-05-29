"use client";

import { usePathname } from "next/navigation";
import type { FC } from "react";

import { SchemeMenu } from "@/components/feature-modules/portfolio/components/scheme-menu";
import { TABS } from "@/components/feature-modules/portfolio/config/tabs";
import { useSelectionValue } from "@/components/feature-modules/portfolio/context/selection-provider";
import type { SchemeName } from "@/lib/types/portfolio";

interface StatusBarProps {
  scheme: SchemeName;
  setScheme: (scheme: SchemeName) => void;
}

export const StatusBar: FC<StatusBarProps> = ({ scheme, setScheme }) => {
  const pathname = usePathname();

  const { sel, total } = useSelectionValue();
  const tab = TABS.find((t) => t.href === pathname) ?? TABS[0];

  return (
    <div className="panel-chrome relative z-[2] flex flex-none items-center justify-between gap-3 whitespace-nowrap border-t border-fg-4 bg-bg-0 px-3.5 py-[7px] text-[10.5px] tracking-[0.03em] text-fg-2 md:overflow-hidden">
      <div className="flex flex-none items-center gap-3">
        <span>
          ~/portfolio/<span className="text-fg-0">{tab.key}</span>
        </span>
        <span className="text-fg-4">│</span>
        {total != null ? (
          <span>
            {(sel + 1).toString().padStart(2, "0")} /{" "}
            {total.toString().padStart(2, "0")}
          </span>
        ) : (
          <span>1 / 1</span>
        )}
      </div>
      <div className="flex flex-none items-center gap-3">
        <span className="text-fg-1 max-md:hidden">● online</span>
        <span className="text-fg-4 max-md:hidden">│</span>
        <span className="whitespace-nowrap max-md:hidden">
          <span className="text-amber">↑↓</span>&nbsp;nav
        </span>
        <span className="whitespace-nowrap max-md:hidden">
          <span className="text-amber">1-5</span>&nbsp;tabs
        </span>
        <span className="whitespace-nowrap max-md:hidden">
          <span className="text-amber">⏎</span>&nbsp;open
        </span>
        <SchemeMenu scheme={scheme} setScheme={setScheme} />
      </div>
    </div>
  );
};
