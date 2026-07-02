import React, { useState } from 'react';
import '../styles/courses.css';
import { courses } from '../data/mockData';

function CourseDetailPage({ course: propCourse, navigate }) {
  const course = propCourse || courses[0];
  const [openChapters, setOpenChapters] = useState([1]);

  const toggleChapter = id => {
    setOpenChapters(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const totalLessons = course.chapters?.reduce((a, ch) => a + ch.lessons.length, 0) || 0;
  const completedLessons = course.chapters?.reduce((a, ch) =>
    a + ch.lessons.filter(l => l.completed).length, 0) || 0;

  return (
    <div className="page-container">
      <button className="btn btn-secondary" onClick={() => navigate('courses')} style={{ marginBottom: 20 }}>
        <i className="fas fa-arrow-left"></i> Back to Courses
      </button>

      <div className="course-detail-container">
        <div>

          <div className="course-detail-header" style={{ '--course-color': course.color }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: course.color, borderRadius: '16px 16px 0 0' }}></div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
              <span className="badge badge-primary">{course.category}</span>
              <span className="badge badge-info">{course.level}</span>
              {course.enrolled && <span className="badge badge-success">✓ Enrolled</span>}
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12, lineHeight: 1.3 }}>{course.title}</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.7 }}>{course.description}</p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { icon: 'fa-user-circle', val: course.instructor },
                { icon: 'fa-clock', val: course.duration },
                { icon: 'fa-play-circle', val: `${course.lessons} lessons` },
                { icon: 'fa-users', val: `${course.students?.toLocaleString()} students` },
                { icon: 'fa-star', val: `${course.rating} (${course.reviews?.toLocaleString()})` },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text-secondary)' }}>
                  <i className={`fas ${m.icon}`} style={{ color: course.color, fontSize: 13 }}></i>
                  {m.val}
                </div>
              ))}
            </div>
          </div>

          {course.enrolled && course.progress > 0 && (
            <div className="card" style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontWeight: 700 }}>Your Progress</div>
                <div style={{ fontWeight: 800, color: course.color }}>{course.progress}%</div>
              </div>
              <div style={{ height: 10, background: 'var(--border)', borderRadius: 5, overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ height: '100%', width: `${course.progress}%`, background: course.color, borderRadius: 5, transition: 'width 1s ease' }}></div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                {completedLessons} of {totalLessons} lessons completed
              </div>
            </div>
          )}

          {course.chapters && course.chapters.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
                📚 Course Curriculum
              </h2>
              {course.chapters.map(ch => (
                <div key={ch.id} className="chapter-item">
                  <div className="chapter-header" onClick={() => toggleChapter(ch.id)}>
                    <div className="chapter-num">{ch.id}</div>
                    <div className="chapter-title">{ch.title}</div>
                    <div className="chapter-count">{ch.lessons.length} lessons</div>
                    <i className={`fas fa-chevron-down chapter-toggle ${openChapters.includes(ch.id) ? 'open' : ''}`}></i>
                  </div>
                  {openChapters.includes(ch.id) && ch.lessons.map(lesson => (
                    <div
                      key={lesson.id}
                      className="lesson-item"
                      onClick={() => navigate('lesson', { lesson, course })}
                    >
                      <div className={`lesson-icon ${lesson.completed ? 'completed' : lesson.type === 'quiz' ? 'quiz-type' : 'pending'}`}>
                        <i className={`fas ${lesson.completed ? 'fa-check' : lesson.type === 'quiz' ? 'fa-question' : 'fa-play'}`}></i>
                      </div>
                      <div className={`lesson-title ${lesson.completed ? 'completed' : ''}`}>{lesson.title}</div>
                      <div className="lesson-duration">{lesson.duration}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="enroll-card">
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 4 }}>${course.price}</div>
              {course.enrolled
                ? <span className="badge badge-success" style={{ fontSize: 13 }}>✓ Already Enrolled</span>
                : <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>One-time purchase · Lifetime access</span>
              }
            </div>

            {course.enrolled ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button className="btn btn-primary" style={{ justifyContent: 'center', width: '100%' }}
                  onClick={() => navigate('lesson', { lesson: course.chapters?.[0]?.lessons?.[0], course })}>
                  <i className="fas fa-play"></i> Continue Learning
                </button>
                <button className="btn btn-secondary" style={{ justifyContent: 'center', width: '100%' }}
                  onClick={() => navigate('quiz', { course })}>
                  <i className="fas fa-question-circle"></i> Take Quiz
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" style={{ justifyContent: 'center', width: '100%', fontSize: 15, padding: '12px' }}>
                <i className="fas fa-bolt"></i> Enroll Now
              </button>
            )}

            <div style={{ marginTop: 20 }}>
              {[
                { icon: 'fa-infinity', text: 'Full lifetime access' },
                { icon: 'fa-mobile-alt', text: 'Access on mobile & desktop' },
                { icon: 'fa-certificate', text: 'Certificate of completion' },
                { icon: 'fa-download', text: 'Downloadable resources' },
                { icon: 'fa-comments', text: 'Community forum access' },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none', fontSize: 13, color: 'var(--text-secondary)' }}>
                  <i className={`fas ${f.icon}`} style={{ color: 'var(--success)', width: 16 }}></i>
                  {f.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;