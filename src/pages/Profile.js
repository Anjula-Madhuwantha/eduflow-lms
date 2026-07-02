import React from 'react';
import '../styles/profile.css';
import { currentUser, courses } from '../data/mockData';

const badges = ['🏆', '🔥', '⚡', '🎯', '📚', '🌟', '💎', '🚀'];
const skills = [
  { name: 'JavaScript', level: 78 },
  { name: 'React', level: 65 },
  { name: 'CSS/Design', level: 55 },
  { name: 'Node.js', level: 40 },
  { name: 'Python', level: 30 },
];

function Profile({ navigate }) {
  const xpPct = Math.round((currentUser.xp / currentUser.xpNext) * 100);
  const completed = courses.filter(c => c.enrolled);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">My Profile</div>
        <div className="page-subtitle">Your learning journey at a glance</div>
      </div>

      <div className="profile-layout">
        <div>
          <div className="profile-card">
            <div className="profile-avatar">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="profile-name">{currentUser.name}</div>
            <div className="profile-email">{currentUser.email}</div>
            <div className="profile-role-badge">
              <i className="fas fa-graduation-cap"></i> {currentUser.role}
            </div>

            <div className="xp-progress-section">
              <div className="xp-top">
                <div className="xp-level-text">Level {currentUser.level}</div>
                <div className="xp-amount">{currentUser.xp.toLocaleString()} / {currentUser.xpNext.toLocaleString()} XP</div>
              </div>
              <div className="xp-progress-bar">
                <div className="xp-progress-fill" style={{ width: `${xpPct}%` }}></div>
              </div>
              <div className="xp-next">{currentUser.xpNext - currentUser.xp} XP to Level {currentUser.level + 1}</div>
            </div>

            <div className="profile-quick-stats">
              {[
                { val: currentUser.completedCourses, label: 'Courses Done' },
                { val: currentUser.certificates, label: 'Certificates' },
                { val: `${currentUser.streak}🔥`, label: 'Day Streak' },
                { val: `${currentUser.totalHours}h`, label: 'Study Time' },
              ].map((s, i) => (
                <div key={i} className="pqs-item">
                  <div className="pqs-val">{s.val}</div>
                  <div className="pqs-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="profile-badges-section">
              <div className="badges-title">🏅 Earned Badges</div>
              <div className="badges-grid">
                {badges.map((b, i) => (
                  <div key={i} className="badge-item" title={`Badge ${i + 1}`}>{b}</div>
                ))}
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('settings')}>
              <i className="fas fa-edit"></i> Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <div className="profile-section-title">
              <i className="fas fa-chart-line"></i> Skills Progress
            </div>
            <div className="skills-list">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="skill-item-label">
                    <span>{s.name}</span>
                    <span className="skill-pct">{s.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: `${s.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <div className="profile-section-title">
              <i className="fas fa-book"></i> Enrolled Courses
            </div>
            <div className="completed-courses-list">
              {completed.map(c => (
                <div key={c.id} className="completed-course-item" onClick={() => navigate('course-detail', { course: c })} style={{ cursor: 'pointer' }}>
                  <div className="cc-icon" style={{ background: c.color }}>
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div>
                    <div className="cc-title">{c.title}</div>
                    <div className="cc-meta">{c.progress}% Complete</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <div className="profile-section-title">
              <i className="fas fa-info-circle"></i> About Me
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { icon: 'fa-envelope', label: 'Email', val: currentUser.email },
                { icon: 'fa-calendar', label: 'Joined', val: currentUser.joinDate },
                { icon: 'fa-globe', label: 'Location', val: 'San Francisco, CA' },
                { icon: 'fa-language', label: 'Language', val: 'English' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'var(--bg-hover)', borderRadius: 'var(--radius-sm)', padding: '12px 14px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>
                    <i className={`fas ${item.icon}`} style={{ marginRight: 6 }}></i>{item.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;