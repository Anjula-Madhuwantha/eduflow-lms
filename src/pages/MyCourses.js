import React, { useState } from 'react';
import '../styles/courses.css';
import { courses } from '../data/mockData';

function MyCourses({ navigate }) {
  const [tab, setTab] = useState('all');
  const enrolled = courses.filter(c => c.enrolled);
  const inProgress = enrolled.filter(c => c.progress > 0 && c.progress < 100);
  const completed = enrolled.filter(c => c.progress === 100);

  const displayed = tab === 'all' ? enrolled : tab === 'progress' ? inProgress : completed;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">My Learning</div>
        <div className="page-subtitle">Track your enrolled courses and progress</div>
      </div>

      <div style={{ display: 'flex', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
        {[
          { id: 'all', label: `All (${enrolled.length})` },
          { id: 'progress', label: `In Progress (${inProgress.length})` },
          { id: 'completed', label: `Completed (${completed.length})` },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '10px 24px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: tab === t.id ? 'var(--primary)' : 'var(--bg-card)',
              color: tab === t.id ? 'white' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              border: '1px solid var(--border)',
              transition: 'var(--transition)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {displayed.map(course => (
          <div
            key={course.id}
            className="card"
            style={{ cursor: 'pointer', display: 'flex', gap: 20, alignItems: 'center' }}
            onClick={() => navigate('course-detail', { course })}
          >
            <div style={{
              width: 80, height: 80, borderRadius: 16,
              background: `linear-gradient(135deg, ${course.color}33, ${course.color}66)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <i className="fas fa-graduation-cap" style={{ fontSize: 32, color: course.color, opacity: 0.7 }}></i>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{course.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{course.instructor} · {course.lessons} lessons</div>
                </div>
                <span className={`badge badge-${course.progress === 100 ? 'success' : 'primary'}`}>
                  {course.progress === 100 ? '✅ Completed' : `${course.progress}% Done`}
                </span>
              </div>
              <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${course.progress}%`, background: course.color, borderRadius: 4, transition: 'width 1s ease' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                <span>{course.duration} total</span>
                <span>
                  {course.progress === 100
                    ? 'Course Complete!'
                    : `${Math.round((course.progress / 100) * course.lessons)} of ${course.lessons} lessons done`}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              <button
                className="btn btn-primary"
                onClick={e => { e.stopPropagation(); navigate('course-detail', { course }); }}
                style={{ fontSize: 13 }}
              >
                {course.progress > 0 ? 'Continue' : 'Start'}
              </button>
              {course.progress > 0 && (
                <button
                  className="btn btn-secondary"
                  onClick={e => { e.stopPropagation(); navigate('quiz', { course }); }}
                  style={{ fontSize: 13 }}
                >
                  Take Quiz
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCourses;