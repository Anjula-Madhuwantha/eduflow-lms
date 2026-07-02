import React from 'react';
import '../styles/dashboard.css';
import { currentUser, courses, activities } from '../data/mockData';

function StatsCard({ icon, label, value, change, color, gradient }) {
  return (
    <div className="stats-card" style={{ '--card-color': color }}>
      <div className="stats-icon" style={{ background: gradient }}>
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="stats-info">
        <div className="stats-value" style={{ color }}>{value}</div>
        <div className="stats-label">{label}</div>
        {change && (
          <div className={`stats-change ${change > 0 ? 'up' : 'down'}`}>
            <i className={`fas fa-arrow-${change > 0 ? 'up' : 'down'}`}></i>
            {Math.abs(change)}% this week
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard({ navigate }) {
  const enrolledCourses = courses.filter(c => c.enrolled && c.progress > 0);

  return (
    <div className="page-container">

      <div className="welcome-banner">
        <div className="welcome-content">
          <div className="welcome-greeting">Welcome Back! 👋</div>
          <div className="welcome-title">Hello, {currentUser.name.split(' ')[0]}!</div>
          <div className="welcome-subtitle">
            You're on a <strong style={{ color: '#fbbf24' }}>{currentUser.streak}-day streak</strong>! Keep the momentum going.
          </div>
          <div className="welcome-stats">
            <div className="w-stat">
              <div className="w-stat-val">{currentUser.completedCourses}</div>
              <div className="w-stat-label">Completed</div>
            </div>
            <div className="w-stat">
              <div className="w-stat-val">{currentUser.certificates}</div>
              <div className="w-stat-label">Certificates</div>
            </div>
            <div className="w-stat">
              <div className="w-stat-val">{currentUser.totalHours}h</div>
              <div className="w-stat-label">Study Time</div>
            </div>
          </div>
        </div>
        <div className="welcome-visual">
          <div className="level-circle">
            <div className="level-label">LEVEL</div>
            <div className="level-num">{currentUser.level}</div>
          </div>
          <div className="level-text">⚡ {currentUser.xp.toLocaleString()} XP</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <StatsCard icon="fa-book-open" label="Enrolled Courses" value="3" change={0} color="var(--primary-light)" gradient="var(--gradient-1)" />
        <StatsCard icon="fa-check-circle" label="Completed Lessons" value="12" change={15} color="#34d399" gradient="var(--gradient-3)" />
        <StatsCard icon="fa-star" label="Average Score" value="88%" change={5} color="#fbbf24" gradient="var(--gradient-4)" />
        <StatsCard icon="fa-fire" label="Day Streak" value={`${currentUser.streak} 🔥`} change={2} color="#f472b6" gradient="var(--gradient-2)" />
      </div>

      <div className="dashboard-main">
        <div>
          <div className="card" style={{ marginBottom: 24 }}>
            <div className="section-header">
              <div className="section-title">📚 Continue Learning</div>
              <button className="see-all-btn" onClick={() => navigate('my-courses')}>See All →</button>
            </div>
            <div className="in-progress-list">
              {enrolledCourses.map(course => (
                <div
                  key={course.id}
                  className="progress-course-item"
                  onClick={() => navigate('course-detail', { course })}
                >
                  <div className="pci-top">
                    <div className="pci-info">
                      <div className="pci-dot" style={{ background: course.color }}></div>
                      <div>
                        <div className="pci-title">{course.title}</div>
                        <div className="pci-instructor">{course.instructor}</div>
                      </div>
                    </div>
                    <div className="pci-pct">{course.progress}%</div>
                  </div>
                  <div className="pci-bar">
                    <div className="pci-bar-fill" style={{ width: `${course.progress}%`, background: course.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="section-header">
              <div className="section-title">⚡ Recent Activity</div>
            </div>
            <div className="activity-list">
              {activities.map(item => (
                <div key={item.id} className="activity-item">
                  <div className="activity-icon" style={{ background: `${item.color}22`, color: item.color }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-text">{item.text}</div>
                    <div className="activity-meta">
                      {item.course && <span>{item.course}</span>}
                      <span>• {item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="quick-stats-panel">
            <div className="section-title" style={{ marginBottom: 16 }}>📊 My Stats</div>
            {[
              { label: '🏆 Global Rank', value: '#4', icon: 'fa-trophy' },
              { label: '📖 Courses Enrolled', value: '3', icon: 'fa-book' },
              { label: '✅ Lessons Done', value: '12', icon: 'fa-check' },
              { label: '📝 Assignments', value: '4', icon: 'fa-tasks' },
              { label: '⭐ Badges Earned', value: '7', icon: 'fa-medal' },
              { label: '🕐 Study Hours', value: '124h', icon: 'fa-clock' },
              { label: '🎯 Quiz Average', value: '88%', icon: 'fa-bullseye' },
              { label: '📜 Certificates', value: '5', icon: 'fa-certificate' },
            ].map((item, i) => (
              <div key={i} className="quick-stat-row">
                <div className="qs-label">{item.label}</div>
                <div className="qs-value">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: 20 }}>
            <div className="section-title" style={{ marginBottom: 16 }}>🎯 Daily Goals</div>
            {[
              { label: 'Complete 2 lessons', done: true },
              { label: 'Study for 1 hour', done: true },
              { label: 'Finish quiz', done: false },
              { label: 'Review notes', done: false },
            ].map((goal, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: goal.done ? 'var(--success)' : 'var(--bg-hover)',
                  border: `2px solid ${goal.done ? 'var(--success)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {goal.done && <i className="fas fa-check" style={{ fontSize: 10, color: 'white' }}></i>}
                </div>
                <span style={{ fontSize: 14, textDecoration: goal.done ? 'line-through' : 'none', color: goal.done ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                  {goal.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-header">
          <div className="section-title">🔥 Recommended For You</div>
          <button className="see-all-btn" onClick={() => navigate('courses')}>Browse All →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {courses.filter(c => !c.enrolled).slice(0, 3).map(course => (
            <div
              key={course.id}
              onClick={() => navigate('course-detail', { course })}
              style={{
                background: 'var(--bg-hover)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                padding: 16,
                cursor: 'pointer',
                transition: 'var(--transition)',
                display: 'flex',
                gap: 14,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = course.color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${course.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: course.color, flexShrink: 0 }}>
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{course.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{course.instructor}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: course.color, marginTop: 6 }}>${course.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;