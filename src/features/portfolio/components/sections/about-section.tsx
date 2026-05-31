"use client";

import type { FC } from "react";

import { portfolioContent } from "@/src/content/portfolio/portfolio-content";
import {
  Fastfetch,
  FastFetchInfo,
} from "@/src/features/portfolio/components/fastfetch";
import { Panel } from "@/src/shared/ui/panel";
import { useReportSelection } from "@/src/features/portfolio/providers/selection-provider";

const H2 =
  "mb-4 font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-amber before:content-['>_']";

export const AboutSection: FC = () => {
  const { about, now } = portfolioContent;
  useReportSelection(0, null);

  return (
    <>
      <Panel
        className="hidden md:flex"
        label="~/about/bio"
        meta={
          <span>
            edited <span className="text-fg-1">29.05.2026</span>
          </span>
        }
      >
        <Fastfetch />
      </Panel>
      <Panel
        label="~/now"
        meta={
          <span>
            updated <span className="text-fg-1">{now.updated}</span>
          </span>
        }
      >
        <FastFetchInfo classname="block xl:hidden" />
        <div className="mt-7 border-t border-dashed border-fg-4 pt-5">
          <h2 className={H2}>whoami</h2>
          {about.intro.map((p, i) => (
            <p key={i} className="mb-3 max-w-[85ch]">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-7 text-[13px] leading-[1.65] text-fg-1">
          <h2 className={H2}>now</h2>
          <p className="text-[11px] text-fg-3">
            a /now page — what i&apos;m doing this season.
          </p>
          <ul className="m-0 list-none p-0">
            {now.items.map((line, i) => (
              <li
                key={i}
                className="relative py-1 pl-[18px] before:absolute before:left-0 before:text-fg-3 before:content-['─']"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Panel>
      <Panel
        label="~/ascii.txt"
        className="ascii-panel max-md:aspect-square md:hidden"
      >
        {/* Single-colour ASCII SVG rendered as a currentColor-driven mask so it
            inherits each theme's foreground instead of its baked-in grey, and
            `absolute inset-0` bleeds it past the Panel padding to fill the
            whole section. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-fg-1"
          style={{
            WebkitMaskImage:
              "url(/ascii/hand.svg), radial-gradient(ellipse 78% 78% at center, #000 55%, transparent 100%)",
            maskImage:
              "url(/ascii/hand.svg), radial-gradient(ellipse 78% 78% at center, #000 55%, transparent 100%)",
            WebkitMaskRepeat: "no-repeat, no-repeat",
            maskRepeat: "no-repeat, no-repeat",
            WebkitMaskPosition: "center, center",
            maskPosition: "center, center",
            WebkitMaskSize: "cover, 100% 100%",
            maskSize: "cover, 100% 100%",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
            transform: "translateZ(0)",
            contain: "paint",
          }}
        />
      </Panel>
    </>
  );
};
