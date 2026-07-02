import React from 'react';

function ProgressBar({ value, max = 100, color, height = 8, showLabel = false, className = '' }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={className}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4, color: 'var(--text-secondary)' }}>
          <span>Progress</span>
          <span style={{ fontWeight: 700, color: 'var(--primary-light)' }}>{pct}%</span>
        </div>
      )}
      <div style={{ height, background: 'var(--border)', borderRadius: height / 2, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: color || 'var(--gradient-1)',
            borderRadius: height / 2,
            transition: 'width 1s ease',
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;