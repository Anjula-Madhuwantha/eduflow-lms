import React, { useState } from 'react';
import '../styles/lesson.css';
import { courses } from '../data/mockData';

function LessonPage({ lesson: propLesson, course: propCourse, navigate }) {
  const course = propCourse || courses[0];
  const allLessons = course.chapters?.flatMap(ch => ch.lessons) || [];
  const lesson = propLesson || allLessons[0] || { title: 'Introduction', duration: '12:30', completed: false, type: 'video' };
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState('');
  const [progress, setProgress] = useState(35);
  const currentIdx = allLessons.findIndex(l => l.id === lesson.id);

  return (
    <div className="page-container">
      <button className="btn btn-secondary" onClick={() => navigate('course-detail', { course })} style={{ marginBottom: 20 }}>
        <i className="fas fa-arrow-left"></i> Back to Course
      </button>

      <div className="lesson-container">
        <div>

          <div className="video-player">
            <div className="video-placeholder" onClick={() => setIsPlaying(!isPlaying)}>
              <div className="play-btn-large" onClick={() => setIsPlaying(!isPlaying)}>
                <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
              </div>
              <div className="video-title-overlay">
                <div className="video-title-text">{lesson.title}</div>
                <span className="video-duration-badge">{lesson.duration}</span>
              </div>
            </div>
            <div className="video-controls">
              <button className="vc-btn" onClick={() => setIsPlaying(!isPlaying)}>
                <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
              </button>
              <button className="vc-btn"><i className="fas fa-step-backward"></i></button>
              <button className="vc-btn"><i className="fas fa-step-forward"></i></button>
              <div className="vc-progress" onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
              }}>
                <div className="vc-progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="vc-time">
                {Math.floor(parseInt(lesson.duration) * progress / 100)}:{String(Math.floor(((parseInt(lesson.duration) * progress / 100) % 1) * 60)).padStart(2, '0')} / {lesson.duration}
              </span>
              <button className="vc-btn"><i className="fas fa-volume-up"></i></button>
              <button className="vc-btn"><i className="fas fa-expand"></i></button>
            </div>
          </div>

          <div className="lesson-info-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{lesson.title}</h1>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    <i className="fas fa-book-open" style={{ marginRight: 6 }}></i>{course.title}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    <i className="fas fa-clock" style={{ marginRight: 6 }}></i>{lesson.duration}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    <i className="fas fa-list" style={{ marginRight: 6 }}></i>
                    Lesson {currentIdx + 1} of {allLessons.length}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary" style={{ fontSize: 13, padding: '8px 14px' }}>
                  <i className="fas fa-bookmark"></i> Save
                </button>
                <button className="btn btn-secondary" style={{ fontSize: 13, padding: '8px 14px' }}>
                  <i className="fas fa-share-alt"></i> Share
                </button>
              </div>
            </div>

            <div className="lesson-nav-btns">
              <button
                className="btn btn-secondary"
                disabled={currentIdx <= 0}
                onClick={() => navigate('lesson', { lesson: allLessons[currentIdx - 1], course })}
                style={{ opacity: currentIdx <= 0 ? 0.5 : 1 }}
              >
                <i className="fas fa-chevron-left"></i> Previous
              </button>
              <button className="btn btn-success" style={{ marginLeft: 'auto' }}>
                <i className="fas fa-check"></i> Mark as Complete
              </button>
              <button
                className="btn btn-primary"
                disabled={currentIdx >= allLessons.length - 1}
                onClick={() => navigate('lesson', { lesson: allLessons[currentIdx + 1], course })}
                style={{ opacity: currentIdx >= allLessons.length - 1 ? 0.5 : 1 }}
              >
                Next <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="notes-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>📝 My Notes</div>
              <button className="btn btn-primary" style={{ fontSize: 12, padding: '6px 14px' }}>
                <i className="fas fa-save"></i> Save Notes
              </button>
            </div>
            <textarea
              className="notes-textarea"
              placeholder="Take notes while you learn... Your notes are saved automatically."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="lesson-sidebar">
          <div className="ls-header">
            📚 {course.title}
          </div>
          {allLessons.map((l, i) => (
            <div
              key={l.id}
              className={`ls-lesson ${l.id === lesson.id ? 'active' : ''}`}
              onClick={() => navigate('lesson', { lesson: l, course })}
            >
              <div className={`ls-num ${l.completed ? 'completed' : ''}`}>
                {l.completed ? <i className="fas fa-check" style={{ fontSize: 10 }}></i> : i + 1}
              </div>
              <div className="ls-title">{l.title}</div>
              <div className="ls-dur">{l.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LessonPage;