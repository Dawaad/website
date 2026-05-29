"use client";

import type { FC } from "react";

import { Panel } from "@/components/feature-modules/portfolio/components/panel";
import { useReportSelection } from "@/components/feature-modules/portfolio/context/selection-provider";
import { portfolioContent } from "@/components/feature-modules/portfolio/service/portfolio-content";

const H2 =
  "mb-4 font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-amber before:content-['>_']";
const DT = "text-[11px] uppercase tracking-[0.08em] text-fg-3";
const DD = "m-0 text-fg-1";
const LINK =
  "border-b border-dashed border-cyan-dim text-cyan no-underline hover:border-fg-0 hover:text-fg-0";

interface ElsewhereLink {
  when: string;
  handle: string;
  note: string;
}

const ELSEWHERE: ElsewhereLink[] = [
  {
    when: "github",
    handle: "github.com/Dawaad",
    note: "open source · 25 repos",
  },
  {
    when: "linkedin",
    handle: "linkedin.com/in/ibuildshitgood",
    note: "résumé · long-form work history",
  },
  {
    when: "instagram",
    handle: "instagram.com/dawad.t",
    note: "references · 38 channels · slowly updated",
  },
  {
    when: "substack",
    handle: "substack.com/@byjared",
    note: "quiet account · mostly reading",
  },
  {
    when: "last.fm",
    handle: "last.fm/user/kade-o",
    note: "scrobbling since 2009 — yes really",
  },
];

export const ContactSection: FC = () => {
  const c = portfolioContent.contact;
  useReportSelection(0, null);

  return (
    <>
      <Panel label="~/contact.card">
        <div className="text-[13px] leading-[1.65] text-fg-1">
          <h2 className={H2}>contact</h2>
          <p className="mb-3 max-w-[56ch]">{c.note}</p>
          <dl className="mt-[22px] grid grid-cols-[90px_1fr] gap-x-[14px] gap-y-1.5 border-t border-dashed border-fg-4 pt-4 text-[12px]">
            <dt className={DT}>email</dt>
            <dd className={DD}>
              <a href={"mailto:" + c.email} className={LINK}>
                {c.email}
              </a>
            </dd>
            <dt className={DT}>matrix</dt>
            <dd className={DD}>{c.matrix}</dd>
            <dt className={DT}>pgp</dt>
            <dd className="m-0 text-[11px] text-fg-1">{c.pgp}</dd>
            <dt className={DT}>rss</dt>
            <dd className={DD}>
              <a href={c.rss} className={LINK}>
                {c.rss}
              </a>
            </dd>
          </dl>
          <p className="mt-[22px] text-[11px] text-fg-3">
            {"// replies in 1–3 days · no recruiter pitches"}
          </p>
        </div>
      </Panel>
      <Panel label="~/elsewhere" meta="4 channels">
        <div className="mb-2 flex items-center gap-2.5 overflow-hidden whitespace-nowrap border-b border-fg-4 pb-2.5 text-[12px] text-fg-2">
          <span className="text-amber">&gt;</span>
          <span className="min-w-0 truncate text-fg-0">
            curl https://jtucker.io/contact
          </span>
        </div>
        <div className="flex flex-col">
          {ELSEWHERE.map((l) => (
            <div
              key={l.when}
              className="grid grid-cols-[90px_1fr] items-baseline gap-3.5 border-b border-dashed border-fg-4 px-1.5 py-2.5 text-[12.5px]"
            >
              <span className="text-[11px] tracking-[0.06em] text-fg-3">
                {l.when}
              </span>
              <span className="text-fg-1">
                {l.handle}
                <small className="mt-[3px] block text-[11px] text-fg-3">
                  {l.note}
                </small>
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
};
