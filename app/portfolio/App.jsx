'use client';
// App.jsx — top-level. Single tab bar, two panels per tab, color schemes.
import React from 'react';
import D from './data.js';
import {
  TABS,
  AboutSection,
  ExperienceSection,
  ProjectsSection,
  PostsSection,
  ContactSection,
} from './Sections.jsx';

/* ---------- BOOT OVERLAY ---------- */
const BootOverlay = ({ onDone }) => {
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setPhase((p) => p + 1), 200);
    return () => clearInterval(id);
  }, []);
  React.useEffect(() => {
    if (phase >= 7) {
      const t = setTimeout(onDone, 300);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  const lines = [
    '> portfolio.os v3.0.2 — booting…',
    '> mounting ~/portfolio                              [ ok ]',
    '> loading panes: about · experience · projects     [ ok ]',
    '> negotiating tls 1.3                               [ ok ]',
    '> verifying pgp 0xAE12 8841                         [ ok ]',
    '> session opened — peer: kade@signal',
    '> ready. press [tab] to switch · [1-5] for sections',
  ];
  return (
    <div className={'boot' + (phase >= 7 ? ' hidden' : '')}>
      <pre>{lines.slice(0, phase).join('\n') + (phase < 7 ? '\n_' : '')}</pre>
    </div>
  );
};

/* ---------- TITLE BAR ---------- */
const TitleBar = ({ user }) => (
  <div className="chrome">
    <div className="lights">
      <span></span><span></span><span></span>
    </div>
    <div className="title">
      <b>{user.handle}@signal</b> &nbsp;:&nbsp; ~/portfolio &nbsp;—&nbsp; tty.0
    </div>
    <div className="spacer"></div>
    <div className="meta">
      <span className="v">tls 1.3</span>
      <span className="pipe">│</span>
      <span className="v">04:21:08</span>
      <span className="pipe">│</span>
      <span className="v">v3.0.2</span>
    </div>
  </div>
);

/* ---------- TAB BAR ---------- */
const TabBar = ({ tabs, active, onChange }) => (
  <div className="tab-bar">
    {tabs.map((t, i) => (
      <div
        key={t.key}
        className={'tab' + (active === t.key ? ' active' : '')}
        onClick={() => onChange(t.key)}
      >
        <span className="num">[{i + 1}]</span>
        {t.label}
      </div>
    ))}
    <div className="spacer"></div>
    <div className="right">
      <span>
        <span className="amb">?</span> help
      </span>
    </div>
  </div>
);

/* ---------- STATUS BAR ---------- */
const formatClock = () => {
  const d = new Date();
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return `${hh}:${mm} utc`;
};

const StatusBar = ({ tab, sel, total }) => {
  const [clock, setClock] = React.useState(() => formatClock());
  React.useEffect(() => {
    const id = setInterval(() => setClock(formatClock()), 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="status-bar">
      <div className="l">
        <span>
          ~/portfolio/<span className="here">{tab}</span>
        </span>
        <span className="pipe">│</span>
        {total != null ? (
          <span>
            {(sel + 1).toString().padStart(2, '0')} / {total.toString().padStart(2, '0')}
          </span>
        ) : (
          <span>1 / 1</span>
        )}
      </div>
      <div className="r">
        <span className="ok">● online</span>
        <span className="pipe">│</span>
        <span style={{ whiteSpace: 'nowrap' }}>
          <span className="amb">↑↓</span>&nbsp;nav
        </span>
        <span style={{ whiteSpace: 'nowrap' }}>
          <span className="amb">1-5</span>&nbsp;tabs
        </span>
        <span style={{ whiteSpace: 'nowrap' }}>
          <span className="amb">⏎</span>&nbsp;open
        </span>
        <span className="pipe">│</span>
        <span>{clock}</span>
      </div>
    </div>
  );
};

/* ---------- SCHEME SWITCHER (small UI in corner — delete for production) ---------- */
const SCHEMES = ['phosphor', 'amber', 'blueprint', 'mono'];
const SchemeSwitcher = ({ scheme, setScheme }) => (
  <div
    style={{
      position: 'fixed',
      bottom: 16,
      right: 16,
      zIndex: 100,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--fg-2)',
      background: 'var(--bg-0)',
      border: '1px solid var(--fg-4)',
      padding: '6px 10px',
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    }}
  >
    <span style={{ color: 'var(--fg-3)' }}>scheme:</span>
    {SCHEMES.map((s) => (
      <button
        key={s}
        onClick={() => setScheme(s)}
        style={{
          background: 'transparent',
          border: 'none',
          color: scheme === s ? 'var(--amber)' : 'var(--fg-2)',
          cursor: 'pointer',
          font: 'inherit',
          padding: 0,
          letterSpacing: 'inherit',
          textTransform: 'inherit',
        }}
      >
        {s}
      </button>
    ))}
  </div>
);

/* ---------- APP ---------- */
const App = () => {
  const [scheme, setScheme] = React.useState('phosphor');
  const [booted, setBooted] = React.useState(false);
  const [tab, setTab] = React.useState('about');
  const [sel, setSel] = React.useState({ experience: 0, projects: 0, posts: 0 });

  // Apply scheme to body so CSS variables cascade everywhere.
  React.useEffect(() => {
    document.body.className = 'scheme-' + scheme;
  }, [scheme]);

  const listLens = {
    experience: D.experience.length,
    projects: D.projects.length,
    posts: D.posts.length,
  };
  const setSelected = (key) => (i) => setSel((s) => ({ ...s, [key]: i }));

  // keyboard
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (/^[1-5]$/.test(e.key)) {
        const n = parseInt(e.key, 10) - 1;
        if (TABS[n]) {
          setTab(TABS[n].key);
          e.preventDefault();
        }
        return;
      }
      const t = TABS.find((x) => x.key === tab);
      if (!t || !t.hasList) return;
      const len = listLens[tab];
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSel((s) => ({ ...s, [tab]: Math.min((s[tab] || 0) + 1, len - 1) }));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSel((s) => ({ ...s, [tab]: Math.max((s[tab] || 0) - 1, 0) }));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tab, listLens]);

  const renderSection = () => {
    switch (tab) {
      case 'about':
        return <AboutSection />;
      case 'experience':
        return (
          <ExperienceSection
            selected={sel.experience}
            setSelected={setSelected('experience')}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            selected={sel.projects}
            setSelected={setSelected('projects')}
          />
        );
      case 'posts':
        return (
          <PostsSection selected={sel.posts} setSelected={setSelected('posts')} />
        );
      case 'contact':
        return <ContactSection />;
      default:
        return null;
    }
  };

  const curTab = TABS.find((x) => x.key === tab);
  const curTotal = curTab && curTab.hasList ? listLens[tab] : null;
  const curSel = curTab && curTab.hasList ? sel[tab] : 0;

  return (
    <React.Fragment>
      <div className="monitor">
        <TitleBar user={D.user} />
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
        <div className="workspace split-balanced">{renderSection()}</div>
        <StatusBar tab={tab} sel={curSel} total={curTotal} />
        {!booted && <BootOverlay onDone={() => setBooted(true)} />}
      </div>
      <SchemeSwitcher scheme={scheme} setScheme={setScheme} />
    </React.Fragment>
  );
};

export default App;
