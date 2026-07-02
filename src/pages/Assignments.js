import React, { useState } from 'react';
import '../styles/assignments.css';
import { assignments } from '../data/mockData';

function Assignments({ navigate }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? assignments : assignments.filter(a => a.status === filter);

  const counts = {
    pending: assignments.filter(a => a.status === 'pending').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    graded: assignments.filter(a => a.status === 'graded').length,
  };

  const statusConfig = {
    pending: { label: 'Pending', color: 'warning', icon: 'fa-clock' },
    submitted: { label: 'Submitted', color: 'info', icon: 'fa-paper-plane' },
    graded: { label: 'Graded', color: 'success', icon: 'fa-check-circle' },
    overdue: { label: 'Overdue', color: 'danger', icon: 'fa-exclamation-circle' },
  };

  const getDaysLeft = dateStr => {
    const due = new Date(dateStr);
    const now = new Date();
    const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">Assignments</div>
        <div className="page-subtitle">Manage and track your course assignments</div>
      </div>

      <div className="assignments-summary">
        {[
          { label: 'Total', num: assignments.length, color: 'var(--primary-light)', bg: 'rgba(99,102,241,0.1)' },
          { label: 'Pending', num: counts.pending, color: '#fbbf24', bg: 'rgba(245,158,11,0.1)' },
          { label: 'Submitted', num: counts.submitted, color: '#22d3ee', bg: 'rgba(6,182,212,0.1)' },
          { label: 'Graded', num: counts.graded, color: '#34d399', bg: 'rgba(16,185,129,0.1)' },
        ].map((s, i) => (
          <div key={i} className="summary-card" style={{ background: s.bg, borderColor: s.color + '33' }}>
            <div className="summary-num" style={{ color: s.color }}>{s.num}</div>
            <div className="summary-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="assignment-filters">
        {['all', 'pending', 'submitted', 'graded'].map(f => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? 'active' : ''}`}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              background: filter === f ? 'var(--primary)' : 'var(--bg-card)',
              color: filter === f ? 'white' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'var(--transition)',
            }}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} {f !== 'all' && `(${counts[f] || 0})`}
          </button>
        ))}
      </div>

      <div className="assignments-list">
        {filtered.map(a => {
          const daysLeft = getDaysLeft(a.dueDate);
          const sc = statusConfig[a.status];
          return (
            <div key={a.id} className={`assignment-card ${a.status}`}
              style={{ borderLeftColor: a.status === 'pending' ? '#fbbf24' : a.status === 'submitted' ? '#22d3ee' : a.status === 'graded' ? '#34d399' : '#ef4444' }}>
              <div className="assignment-header">
                <div>
                  <div className="assignment-title">{a.title}</div>
                  <div className="assignment-course">
                    <div className="assignment-course-dot" style={{ background: a.courseColor }}></div>
                    {a.course}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <span className={`badge badge-${sc.color}`}>
                    <i className={`fas ${sc.icon}`}></i> {sc.label}
                  </span>
                  <span className={`priority-badge priority-${a.priority}`}>
                    {a.priority}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '12px 0' }}>{a.description}</p>

              <div className="assignment-meta">
                <div className="assignment-meta-item">
                  <i className="fas fa-calendar"></i>
                  Due: {new Date(a.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="assignment-meta-item">
                  <i className="fas fa-clock"></i>
                  {daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? 'Due today!' : `${Math.abs(daysLeft)} days overdue`}
                </div>
                <div className="assignment-meta-item">
                  <i className="fas fa-star"></i> {a.points} points
                </div>
                {a.grade && (
                  <div className="assignment-meta-item" style={{ marginLeft: 'auto' }}>
                    <span className="grade-display">{a.grade}%</span>
                  </div>
                )}
              </div>

              {a.status === 'pending' && (
                <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                  <button className="btn btn-primary" style={{ fontSize: 13 }}>
                    <i className="fas fa-upload"></i> Submit Assignment
                  </button>
                  <button className="btn btn-secondary" style={{ fontSize: 13 }}>
                    <i className="fas fa-eye"></i> View Details
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Assignments;