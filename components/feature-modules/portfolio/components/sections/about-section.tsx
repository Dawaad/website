'use client';

import { Fragment } from 'react';

import { Panel } from '@/components/feature-modules/portfolio/components/panel';
import { useReportSelection } from '@/components/feature-modules/portfolio/context/selection-provider';
import { portfolioContent } from '@/components/feature-modules/portfolio/service/portfolio-content';

const H2 =
  "mb-4 font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-amber before:content-['>_']";
const KV =
  'mt-[22px] grid grid-cols-[90px_1fr] gap-x-[14px] gap-y-1.5 border-t border-dashed border-fg-4 pt-4 text-[12px]';
const DT = 'text-[11px] uppercase tracking-[0.08em] text-fg-3';
const DD = 'm-0 text-fg-1';

export function AboutSection() {
  const { user, about, now, stack } = portfolioContent;
  useReportSelection(0, null);

  return (
    <>
      <Panel
        label="~/about/bio"
        meta={
          <span>
            edited <span className="text-fg-1">2026.05.20</span>
          </span>
        }
      >
        <div className="text-[13px] leading-[1.65] text-fg-1">
          <h2 className={H2}>whoami</h2>
          {about.intro.map((p, i) => (
            <p key={i} className="mb-3 max-w-[56ch]">
              {p}
            </p>
          ))}
          <dl className={KV}>
            <dt className={DT}>name</dt>
            <dd className={DD}>{user.name}</dd>
            <dt className={DT}>role</dt>
            <dd className={DD}>{user.role}</dd>
            <dt className={DT}>based</dt>
            <dd className={DD}>{user.based}</dd>
            <dt className={DT}>handle</dt>
            <dd className={DD}>@{user.handle}</dd>
            {about.bullets.map(([k, v]) => (
              <Fragment key={k}>
                <dt className={DT}>{k}</dt>
                <dd className={DD}>{v}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </Panel>
      <Panel
        label="~/now"
        meta={
          <span>
            updated <span className="text-fg-1">{now.updated}</span>
          </span>
        }
      >
        <div className="text-[13px] leading-[1.65] text-fg-1">
          <h2 className={H2}>now</h2>
          <p className="text-[11px] text-fg-3">a /now page — what i&apos;m doing this season.</p>
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
        <div className="mt-7 text-[13px] leading-[1.65] text-fg-1">
          <h2 className={H2}>stack</h2>
          <dl className="mt-2 grid grid-cols-[90px_1fr] gap-x-[14px] gap-y-1.5 text-[12px]">
            {stack.map(([k, v]) => (
              <Fragment key={k}>
                <dt className={DT}>{k}</dt>
                <dd className={DD}>{v}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
      </Panel>
    </>
  );
}
