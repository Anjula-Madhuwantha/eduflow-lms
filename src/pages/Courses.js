import React, { useState } from 'react';
import '../styles/courses.css';
import CourseCard from '../components/courses/CourseCard';
import { courses } from '../data/mockData';

const categories = ['All', 'Web Development', 'Design', 'Data Science', 'Backend', 'Marketing', 'Mobile'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

function Courses({ navigate }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All Levels');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filtered = courses.filter(c => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    const matchLvl = activeLevel === 'All Levels' || c.level === activeLevel;
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchLvl && matchSearch;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.students - a.students;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">Explore Courses</div>
        <div className="page-subtitle">
          {courses.length} courses available · Expand your skills today
        </div>
      </div>

      <div className="courses-filter-bar">
        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="filter-tabs">
          {levels.map(lvl => (
            <button
              key={lvl}
              className={`filter-tab ${activeLevel === lvl ? 'active' : ''}`}
              onClick={() => setActiveLevel(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            padding: '8px 14px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-primary)',
            fontSize: 13,
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>

        <div className="courses-search" style={{ marginLeft: 'auto' }}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginBottom: 16, color: 'var(--text-secondary)', fontSize: 14 }}>
        Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> courses
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
          <i className="fas fa-search" style={{ fontSize: 40, marginBottom: 16, display: 'block' }}></i>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No courses found</div>
          <div>Try adjusting your filters or search term</div>
        </div>
      ) : (
        <div className="courses-grid">
          {filtered.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={c => navigate('course-detail', { course: c })}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;