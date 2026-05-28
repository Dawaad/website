// Sections.jsx — per-tab content. Each section owns its own two-panel layout.
import React from 'react';
import { Panel } from './Panel.jsx';
import D from './data.js';

/* ---------- ABOUT — bio + now feed ---------- */
const AboutSection = () => {
  const u = D.user;
  return (
    <React.Fragment>
      <Panel label="~/about/bio" meta={<span>edited <span className="v">2026.05.20</span></span>}>
        <div className="info-block">
          <h2>whoami</h2>
          {D.about.intro.map((p, i) => <p key={i}>{p}</p>)}
          <dl className="kv">
            <dt>name</dt><dd>{u.name}</dd>
            <dt>role</dt><dd>{u.role}</dd>
            <dt>based</dt><dd>{u.based}</dd>
            <dt>handle</dt><dd>@{u.handle}</dd>
            {D.about.bullets.map(([k, v]) => (
              <React.Fragment key={k}><dt>{k}</dt><dd>{v}</dd></React.Fragment>
            ))}
          </dl>
        </div>
      </Panel>
      <Panel label="~/now" meta={<span>updated <span className="v">{D.now.updated}</span></span>}>
        <div className="info-block">
          <h2>now</h2>
          <p className="ghost">a /now page — what i'm doing this season.</p>
          <ul>
            {D.now.items.map((line, i) => <li key={i}>{line}</li>)}
          </ul>
        </div>
        <div className="info-block" style={{marginTop: 28}}>
          <h2>stack</h2>
          <dl className="kv" style={{marginTop: 8, paddingTop: 0, borderTop: 0}}>
            {D.stack.map(([k, v]) => (
              <React.Fragment key={k}><dt>{k}</dt><dd>{v}</dd></React.Fragment>
            ))}
          </dl>
        </div>
      </Panel>
    </React.Fragment>
  );
};

/* ---------- MASTER-DETAIL pattern (experience / projects / posts) ---------- */
const MasterDetail = ({
  detailLabel, listLabel, listCmd, items, selected, setSelected,
  RowComponent, renderDetail,
}) => {
  const sel = items[selected] || items[0];
  return (
    <React.Fragment>
      <Panel label={detailLabel} accent={<span>&nbsp;{(selected + 1).toString().padStart(2, '0')}/{items.length.toString().padStart(2, '0')}</span>}>
        {sel ? renderDetail(sel) : <div className="empty">no selection</div>}
      </Panel>
      <Panel label={listLabel} meta={<span>{items.length} entries</span>}>
        <div className="prompt-strip">
          <span className="p">&gt;</span>
          <span className="c">{listCmd}</span>
        </div>
        <div className="list-view">
          {items.map((it, i) => (
            <RowComponent
              key={i} item={it}
              active={i === selected}
              onClick={() => setSelected(i)}
            />
          ))}
        </div>
      </Panel>
    </React.Fragment>
  );
};

/* ---------- EXPERIENCE ---------- */
const ExperienceRow = ({ item, active, onClick }) => (
  <div className={"list-row" + (active ? " active" : "")} onClick={onClick}>
    <span className="g"> </span>
    <span className="date">{item.date}</span>
    <span className="t">
      <span style={{color: active ? 'var(--fg-0)' : 'var(--fg-1)'}}>{item.org}</span>
      <small>{item.role}</small>
    </span>
    <span className="tag">{item.tag}</span>
  </div>
);

const ExperienceSection = ({ selected, setSelected }) => (
  <MasterDetail
    detailLabel="experience.detail"
    listLabel="~/experience"
    listCmd="cat experience.log | sort -r"
    items={D.experience}
    selected={selected}
    setSelected={setSelected}
    RowComponent={ExperienceRow}
    renderDetail={(sel) => (
      <div className="detail-view">
        <div className="hd">
          <span className="nm">{sel.org}</span>
          <span className="dt">{sel.date}</span>
        </div>
        <div className="sub">{sel.role} · {sel.tag}</div>
        <div className="body">
          <p>{sel.detail}</p>
        </div>
        <div className="ascii" style={{marginTop: 22}}>
{`────────────────────────────────────────
  ${sel.tag}   ${sel.date}
────────────────────────────────────────`}
        </div>
        <div className="meta-row">
          <span className="amb">&gt;</span>
          <span>press <span className="amb">↑↓</span> to walk the list</span>
        </div>
      </div>
    )}
  />
);

/* ---------- PROJECTS ---------- */
const ProjectRow = ({ item, active, onClick }) => (
  <div className={"list-row" + (active ? " active" : "")} onClick={onClick}>
    <span className="g"> </span>
    <span className="date">{item.date}</span>
    <span className="t">{item.name}</span>
    <span className="tag">{item.tag}</span>
  </div>
);

const ProjectsSection = ({ selected, setSelected }) => (
  <MasterDetail
    detailLabel="projects.detail"
    listLabel="~/projects"
    listCmd="ls -la projects/"
    items={D.projects}
    selected={selected}
    setSelected={setSelected}
    RowComponent={ProjectRow}
    renderDetail={(sel) => (
      <div className="detail-view">
        <div className="hd">
          <span className="nm">{sel.name}</span>
          <span className="dt">{sel.date}</span>
        </div>
        <div className="sub">{sel.tag}</div>
        <div className="body">
          <p>{sel.detail}</p>
        </div>
        <div className="ascii">
{`drwxr-xr-x   kade  staff   ${sel.date}   ${sel.name}
-rw-r--r--   kade  staff   ${sel.date}   README.md
-rw-r--r--   kade  staff   ${sel.date}   LICENSE`}
        </div>
        <div className="meta-row">
          <span className="amb">⏎</span><span>open</span>
          <span style={{color:'var(--fg-4)'}}>·</span>
          <span className="amb">g</span><span>view on git</span>
        </div>
      </div>
    )}
  />
);

/* ---------- POSTS ---------- */
const PostRow = ({ item, active, onClick }) => (
  <div className={"list-row" + (active ? " active" : "")} onClick={onClick}>
    <span className="g"> </span>
    <span className="date">{item.date}</span>
    <span className="t">{item.title}</span>
    <span className="tag">{item.tag}</span>
  </div>
);

const PostsSection = ({ selected, setSelected }) => (
  <MasterDetail
    detailLabel="post.preview"
    listLabel="~/posts"
    listCmd="tail -f posts/"
    items={D.posts}
    selected={selected}
    setSelected={setSelected}
    RowComponent={PostRow}
    renderDetail={(sel) => (
      <div className="detail-view">
        <div className="hd">
          <span className="nm">{sel.title}</span>
          <span className="dt">{sel.date}</span>
        </div>
        <div className="sub">{sel.tag} · 4 min read</div>
        <div className="body">
          <p>{sel.detail}</p>
          <p className="ghost" style={{color:'var(--fg-3)', fontSize:11}}>// preview only · press ⏎ to open in reader</p>
        </div>
        <div className="meta-row">
          <span className="amb">⏎</span><span>read</span>
          <span style={{color:'var(--fg-4)'}}>·</span>
          <span className="amb">r</span><span>raw .md</span>
        </div>
      </div>
    )}
  />
);

/* ---------- CONTACT ---------- */
const ContactSection = () => {
  const c = D.contact;
  return (
    <React.Fragment>
      <Panel label="~/contact.card">
        <div className="info-block">
          <h2>contact</h2>
          <p>{c.note}</p>
          <dl className="kv">
            <dt>email</dt><dd><a href={"mailto:" + c.email}>{c.email}</a></dd>
            <dt>matrix</dt><dd>{c.matrix}</dd>
            <dt>pgp</dt><dd style={{fontSize:11}}>{c.pgp}</dd>
            <dt>rss</dt><dd><a href={c.rss}>{c.rss}</a></dd>
          </dl>
          <p className="ghost" style={{marginTop:22}}>// replies in 1–3 days · no recruiter pitches</p>
        </div>
      </Panel>
      <Panel label="~/elsewhere" meta="4 channels">
        <div className="prompt-strip">
          <span className="p">&gt;</span>
          <span className="c">curl https://kade.signal.so/links</span>
        </div>
        <div className="feed">
          <div className="item"><span className="when">github</span><span className="what">github.com/kade<small>open source · 24 repos · 1.2k followers</small></span></div>
          <div className="item"><span className="when">read.cv</span><span className="what">read.cv/kade<small>résumé · long-form work history</small></span></div>
          <div className="item"><span className="when">are.na</span><span className="what">are.na/kade-okafor<small>references · 38 channels · slowly updated</small></span></div>
          <div className="item"><span className="when">mastodon</span><span className="what">@kade@hci.social<small>quiet account · mostly reading</small></span></div>
          <div className="item"><span className="when">last.fm</span><span className="what">last.fm/user/kade-o<small>scrobbling since 2009 — yes really</small></span></div>
        </div>
      </Panel>
    </React.Fragment>
  );
};

/* ---------- TAB REGISTRY ---------- */
const TABS = [
  { key: "about",      label: "ABOUT",      hasList: false },
  { key: "experience", label: "EXPERIENCE", hasList: true  },
  { key: "projects",   label: "PROJECTS",   hasList: true  },
  { key: "posts",      label: "POSTS",      hasList: true  },
  { key: "contact",    label: "CONTACT",    hasList: false },
];

export {
  TABS,
  AboutSection,
  ExperienceSection,
  ProjectsSection,
  PostsSection,
  ContactSection,
};
