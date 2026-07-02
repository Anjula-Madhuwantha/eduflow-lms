import React from 'react';
import '../../styles/courses.css';

const categoryIcons = {
  'Web Development': 'fa-code',
  'Design': 'fa-paint-brush',
  'Data Science': 'fa-chart-bar',
  'Backend': 'fa-server',
  'Marketing': 'fa-bullhorn',
  'Mobile': 'fa-mobile-alt',
};

function StarRating({ rating }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map(s => (
        <i key={s} className={`fas fa-star${s > Math.round(rating) ? ' ' : ''}`}
          style={{ opacity: s <= Math.round(rating) ? 1 : 0.3 }}></i>
      ))}
    </span>
  );
}

function CourseCard({ course, onClick }) {
  return (
    <div className="course-card" onClick={() => onClick(course)}>
      <div className="course-thumb" style={{ background: `linear-gradient(135deg, ${course.color}33, ${course.color}66)` }}>
        <div className="course-thumb-pattern"></div>
        <i className={`fas ${categoryIcons[course.category] || 'fa-book'} course-thumb-icon`}
          style={{ color: course.color }}></i>
        <span className="course-level-badge">{course.level}</span>
        {course.enrolled && (
          <div className="course-enrolled-badge">
            <i className="fas fa-check"></i>
          </div>
        )}
      </div>
      <div className="course-body">
        <div className="course-category" style={{ color: course.color }}>
          {course.category}
        </div>
        <div className="course-title">{course.title}</div>
        <div className="course-instructor">
          <i className="fas fa-user-circle"></i> {course.instructor}
        </div>
        <div className="course-meta">
          <div className="course-meta-item">
            <i className="fas fa-clock"></i> {course.duration}
          </div>
          <div className="course-meta-item">
            <i className="fas fa-play-circle"></i> {course.lessons} lessons
          </div>
          <div className="course-meta-item">
            <i className="fas fa-users"></i> {course.students.toLocaleString()}
          </div>
        </div>
        <div className="course-rating">
          <StarRating rating={course.rating} />
          <span style={{ fontSize: 13, fontWeight: 700, marginLeft: 4 }}>{course.rating}</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 4 }}>({course.reviews.toLocaleString()})</span>
        </div>
        <div className="course-tags">
          {course.tags.map(tag => <span key={tag} className="course-tag">{tag}</span>)}
        </div>
        {course.enrolled && course.progress > 0 && (
          <div className="course-progress-wrap">
            <div className="course-progress-label">
              <span>Progress</span>
              <span style={{ fontWeight: 700, color: course.color }}>{course.progress}%</span>
            </div>
            <div className="course-progress-bar">
              <div className="course-progress-fill" style={{ width: `${course.progress}%`, background: course.color }}></div>
            </div>
          </div>
        )}
        <div className="course-footer">
          <div className="course-price">${course.price}</div>
          <button
            className="btn btn-primary"
            style={{ fontSize: 13, padding: '8px 16px' }}
            onClick={e => { e.stopPropagation(); }}
          >
            {course.enrolled ? 'Continue' : 'Enroll Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;