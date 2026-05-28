// Panel — a labeled sub-section (left or right side of a tab's workspace).
import React from 'react';

export const Panel = ({ label, accent, meta, children }) => (
  <div className="panel">
    {(label || meta) && (
      <div className="panel-head">
        {label && (
          <span className="lbl">
            <span className="amb">[</span> {label} <span className="amb">]</span>
          </span>
        )}
        {accent && <span style={{ color: 'var(--amber)' }}>{accent}</span>}
        <span className="spacer"></span>
        {meta && <span className="meta">{meta}</span>}
      </div>
    )}
    <div className="panel-body">{children}</div>
  </div>
);
