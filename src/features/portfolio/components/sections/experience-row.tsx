import type { FC } from "react";

import type { RowProps } from "@/src/features/portfolio/components/sections/master-detail";
import type { ExperienceEntry } from "@/src/shared/types/portfolio";
import { cn } from "@/src/shared/lib/utils";

export const ExperienceRow: FC<RowProps<ExperienceEntry>> = ({
  item,
  active,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group grid cursor-pointer select-none grid-cols-[16px_92px_1fr_72px] items-baseline gap-3 border-b border-dashed border-fg-4 px-2 py-[9px] text-[12.5px] hover:bg-bg-2",
        active && "border-l-2 border-l-amber bg-bg-1 pl-1.5",
      )}
    >
      <span
        className={cn(
          "w-4 text-fg-3 group-hover:before:text-amber group-hover:before:content-['>']",
          active && "text-amber",
        )}
      >
        {" "}
      </span>
      <span className="text-[11px] tracking-[0.06em] text-fg-2">
        {item.date}
      </span>
      <span className={active ? "text-fg-0" : "text-fg-1"}>
        <span className={active ? "text-fg-0" : "text-fg-1"}>{item.org}</span>
        <small className="mt-0.5 block text-[11px] text-fg-3">
          {item.role}
        </small>
      </span>
      <span className="text-right text-[11px] text-fg-3">{item.tag}</span>
    </div>
  );
};
