import React from 'react';
import '../../styles/sidebar.css';
import { currentUser } from '../../data/mockData';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-home', section: 'main' },
  { id: 'courses', label: 'All Courses', icon: 'fa-graduation-cap', section: 'main' },
  { id: 'my-courses', label: 'My Learning', icon: 'fa-book-open', section: 'main' },
  { id: 'assignments', label: 'Assignments', icon: 'fa-tasks', section: 'main', badge: '3' },
  { id: 'calendar', label: 'Calendar', icon: 'fa-calendar-alt', section: 'main' },
  { id: 'leaderboard', label: 'Leaderboard', icon: 'fa-trophy', section: 'community' },
  { id: 'profile', label: 'My Profile', icon: 'fa-user-circle', section: 'community' },
  { id: 'settings', label: 'Settings', icon: 'fa-cog', section: 'other' },
];

function Sidebar({ currentPage, navigate }) {
  const sections = {
    main: navItems.filter(i => i.section === 'main'),
    community: navItems.filter(i => i.section === 'community'),
    other: navItems.filter(i => i.section === 'other'),
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <i className="fas fa-bolt"></i>
        </div>
        <div className="logo-text">
          Edu<span>Flow</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-title">Main Menu</div>
        {sections.main.map(item => (
          <div
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => navigate(item.id)}
          >
            <i className={`fas ${item.icon}`}></i>
            <span>{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </div>
        ))}

        <div className="nav-section-title" style={{ marginTop: '16px' }}>Community</div>
        {sections.community.map(item => (
          <div
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => navigate(item.id)}
          >
            <i className={`fas ${item.icon}`}></i>
            <span>{item.label}</span>
          </div>
        ))}

        <div className="nav-section-title" style={{ marginTop: '16px' }}>Account</div>
        {sections.other.map(item => (
          <div
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => navigate(item.id)}
          >
            <i className={`fas ${item.icon}`}></i>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-user" onClick={() => navigate('profile')}>
        <div className="user-avatar">
          {currentUser.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="user-info">
          <div className="user-name">{currentUser.name}</div>
          <div className="user-role">{currentUser.role}</div>
        </div>
        <div className="streak-badge">
          🔥 {currentUser.streak}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;