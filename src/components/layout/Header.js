import React, { useState } from 'react';
import '../../styles/header.css';
import { currentUser } from '../../data/mockData';

const pageNames = {
  dashboard: 'Dashboard',
  courses: 'All Courses',
  'my-courses': 'My Learning',
  assignments: 'Assignments',
  leaderboard: 'Leaderboard',
  profile: 'My Profile',
  calendar: 'Calendar',
  settings: 'Settings',
  'course-detail': 'Course Detail',
  lesson: 'Lesson',
  quiz: 'Quiz',
};

function Header({ currentPage, navigate }) {
  const [searchVal, setSearchVal] = useState('');
  const xpPct = Math.round((currentUser.xp / currentUser.xpNext) * 100);

  return (
    <header className="header">
      <div className="breadcrumb">
        <span className="breadcrumb-item" onClick={() => navigate('dashboard')}>
          <i className="fas fa-home"></i>
        </span>
        <span className="breadcrumb-sep">
          <i className="fas fa-chevron-right"></i>
        </span>
        <span className="breadcrumb-item active">{pageNames[currentPage] || 'Page'}</span>
      </div>

      <div className="header-search">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search courses, lessons..."
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
        />
      </div>

      <div className="header-actions">
        <div className="header-btn" title="Notifications">
          <i className="fas fa-bell"></i>
          <span className="notif-dot"></span>
        </div>
        <div className="header-btn" title="Messages">
          <i className="fas fa-envelope"></i>
        </div>
        <div className="header-btn" title="Help">
          <i className="fas fa-question-circle"></i>
        </div>
        <div className="header-xp" title={`${currentUser.xp} / ${currentUser.xpNext} XP`}>
          <span className="xp-icon">⚡</span>
          <div className="xp-info">
            <div className="xp-text">{currentUser.xp.toLocaleString()} XP</div>
            <div className="xp-bar-mini">
              <div className="xp-bar-fill" style={{ width: `${xpPct}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;