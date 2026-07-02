import React, { useState } from 'react';
import '../styles/calendar.css';
import { calendarEvents } from '../data/mockData';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const eventTypeConfig = {
  quiz: { icon: 'fa-question-circle', label: 'Quiz' },
  assignment: { icon: 'fa-file-alt', label: 'Assignment' },
  live: { icon: 'fa-video', label: 'Live Session' },
  webinar: { icon: 'fa-broadcast-tower', label: 'Webinar' },
  meeting: { icon: 'fa-users', label: 'Meeting' },
};

function CalendarPage({ navigate }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const getEventsForDay = day => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(e => e.date === dateStr);
  };

  const selectedDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
  const selectedEvents = calendarEvents.filter(e => e.date === selectedDateStr);
  const upcomingEvents = calendarEvents.slice(0, 5);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: null, type: 'empty' });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, type: 'day' });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">📅 Calendar</div>
        <div className="page-subtitle">Keep track of your schedule and deadlines</div>
      </div>

      <div className="calendar-layout">
        <div className="calendar-card">
          <div className="calendar-nav">
            <button className="cal-nav-btn" onClick={prevMonth}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="cal-month-year">{MONTHS[month]} {year}</div>
            <button className="cal-nav-btn" onClick={nextMonth}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="calendar-grid">
            {DAYS.map(d => <div key={d} className="cal-day-header">{d}</div>)}
            {cells.map((cell, i) => {
              if (cell.type === 'empty') return <div key={`e-${i}`} className="cal-day empty"></div>;
              const isToday = cell.day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const hasEvent = getEventsForDay(cell.day).length > 0;
              const isSelected = cell.day === selectedDay;
              return (
                <div
                  key={cell.day}
                  className={`cal-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''} ${isSelected && !isToday ? 'selected' : ''}`}
                  onClick={() => setSelectedDay(cell.day)}
                >
                  {cell.day}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
            {Object.entries(eventTypeConfig).map(([type, conf]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: calendarEvents.find(e => e.type === type)?.color || 'var(--primary)' }}></div>
                {conf.label}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="events-sidebar">
            <div style={{ fontWeight: 700, fontSize: 16 }}>
              {selectedDay === today.getDate() && month === today.getMonth()
                ? '📌 Today\'s Events'
                : `📅 ${MONTHS[month]} ${selectedDay}`}
            </div>

            {selectedEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)', fontSize: 14 }}>
                <i className="fas fa-calendar-times" style={{ fontSize: 30, marginBottom: 10, display: 'block' }}></i>
                No events scheduled
              </div>
            ) : (
              <div className="events-list">
                {selectedEvents.map(ev => {
                  const conf = eventTypeConfig[ev.type] || { icon: 'fa-circle', label: ev.type };
                  return (
                    <div key={ev.id} className="event-item" style={{ borderLeftColor: ev.color }}>
                      <i className={`fas ${conf.icon} event-icon`} style={{ color: ev.color }}></i>
                      <div className="event-content">
                        <div className="event-title">{ev.title}</div>
                        <div className="event-time">
                          <i className="fas fa-clock"></i> {ev.time}
                        </div>
                      </div>
                      <span className="event-type-badge" style={{ background: `${ev.color}22`, color: ev.color }}>
                        {conf.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>📋 Upcoming Events</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {upcomingEvents.map(ev => (
                  <div key={ev.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: ev.color, flexShrink: 0 }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{ev.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{ev.date} at {ev.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;