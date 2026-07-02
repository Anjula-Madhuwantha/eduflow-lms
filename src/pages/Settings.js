import React, { useState } from 'react';
import '../styles/settings.css';
import { currentUser } from '../data/mockData';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: 'fa-user' },
  { id: 'account', label: 'Account', icon: 'fa-lock' },
  { id: 'notifications', label: 'Notifications', icon: 'fa-bell' },
  { id: 'appearance', label: 'Appearance', icon: 'fa-palette' },
  { id: 'privacy', label: 'Privacy', icon: 'fa-shield-alt' },
];

function Settings({ navigate }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [toggles, setToggles] = useState({
    emailNotifs: true,
    pushNotifs: false,
    courseUpdates: true,
    weeklyDigest: true,
    assignmentReminders: true,
    achievementAlerts: true,
    profileVisible: true,
    showProgress: true,
    showStreak: false,
  });

  const [saved, setSaved] = useState(false);

  const toggle = key => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ k }) => (
    <button className={`toggle-switch ${toggles[k] ? 'on' : ''}`} onClick={() => toggle(k)}></button>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">Settings</div>
        <div className="page-subtitle">Manage your account preferences</div>
      </div>

      <div className="settings-layout">
        <div className="settings-nav">
          {settingsSections.map(s => (
            <div
              key={s.id}
              className={`settings-nav-item ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              <i className={`fas ${s.icon}`}></i>
              {s.label}
            </div>
          ))}
        </div>

        <div>
          {activeSection === 'profile' && (
            <div className="settings-section">
              <div className="settings-section-title">Profile Information</div>
              <div className="settings-section-sub">Update your personal details and public profile</div>

              <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24, padding: 20, background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--gradient-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: 'white', flexShrink: 0 }}>
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Profile Photo</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>JPG, GIF or PNG. 1MB max size.</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-primary" style={{ fontSize: 12, padding: '7px 14px' }}>
                      <i className="fas fa-upload"></i> Upload Photo
                    </button>
                    <button className="btn btn-secondary" style={{ fontSize: 12, padding: '7px 14px' }}>Remove</button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input className="form-input" defaultValue="Alex" />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input className="form-input" defaultValue="Johnson" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" defaultValue={currentUser.email} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Location <span>(optional)</span></label>
                  <input className="form-input" placeholder="City, Country" defaultValue="San Francisco, CA" />
                </div>
                <div className="form-group">
                  <label className="form-label">Website <span>(optional)</span></label>
                  <input className="form-input" placeholder="https://yoursite.com" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Bio <span>(optional)</span></label>
                <textarea
                  className="form-input"
                  style={{ minHeight: 100, resize: 'vertical' }}
                  placeholder="Tell us about yourself..."
                  defaultValue="Passionate learner and developer exploring the world of React and modern web development."
                />
              </div>
              <div className="settings-actions">
                <button className="btn btn-secondary">Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {saved ? <><i className="fas fa-check"></i> Saved!</> : <><i className="fas fa-save"></i> Save Changes</>}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'account' && (
            <div>
              <div className="settings-section">
                <div className="settings-section-title">Change Password</div>
                <div className="settings-section-sub">Keep your account secure with a strong password</div>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input className="form-input" type="password" placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input className="form-input" type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input className="form-input" type="password" placeholder="Confirm new password" />
                </div>
                <div className="settings-actions">
                  <button className="btn btn-primary" onClick={handleSave}>
                    <i className="fas fa-lock"></i> Update Password
                  </button>
                </div>
              </div>

              <div className="settings-section" style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
                <div className="settings-section-title" style={{ color: 'var(--danger)' }}>Danger Zone</div>
                <div className="settings-section-sub">Irreversible and destructive actions</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(239,68,68,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>Delete Account</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Permanently remove your account and all data</div>
                  </div>
                  <button className="btn btn-danger" style={{ fontSize: 13 }}>
                    <i className="fas fa-trash"></i> Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="settings-section">
              <div className="settings-section-title">Notification Preferences</div>
              <div className="settings-section-sub">Choose what notifications you want to receive</div>

              {[
                { key: 'emailNotifs', title: 'Email Notifications', desc: 'Receive important updates via email' },
                { key: 'pushNotifs', title: 'Push Notifications', desc: 'Browser push notifications for real-time updates' },
                { key: 'courseUpdates', title: 'Course Updates', desc: 'New lessons, quizzes, and content added to enrolled courses' },
                { key: 'assignmentReminders', title: 'Assignment Reminders', desc: 'Reminders before assignment due dates' },
                { key: 'weeklyDigest', title: 'Weekly Progress Digest', desc: 'Weekly summary of your learning progress' },
                { key: 'achievementAlerts', title: 'Achievement Alerts', desc: 'Notify when you earn badges or level up' },
              ].map(item => (
                <div key={item.key} className="toggle-setting">
                  <div className="toggle-info">
                    <div className="toggle-title">{item.title}</div>
                    <div className="toggle-desc">{item.desc}</div>
                  </div>
                  <Toggle k={item.key} />
                </div>
              ))}

              <div className="settings-actions">
                <button className="btn btn-primary" onClick={handleSave}>
                  <i className="fas fa-save"></i> Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="settings-section">
              <div className="settings-section-title">Appearance</div>
              <div className="settings-section-sub">Customize the look and feel of EduFlow</div>

              <div className="form-group">
                <label className="form-label">Theme</label>
                <div className="theme-options">
                  {[
                    { name: 'Dark (Default)', bg: '#0f0f1a', accent: '#6366f1', selected: true },
                    { name: 'Darker', bg: '#050508', accent: '#8b5cf6', selected: false },
                    { name: 'Midnight', bg: '#0d1117', accent: '#06b6d4', selected: false },
                  ].map(t => (
                    <div key={t.name} className={`theme-option ${t.selected ? 'selected' : ''}`}
                      style={{ background: t.bg, border: `3px solid ${t.selected ? t.accent : t.bg}` }}
                      title={t.name}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, background: t.accent }}></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Accent Color</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6'].map(c => (
                    <div key={c} style={{ width: 36, height: 36, borderRadius: '50%', background: c, cursor: 'pointer', border: c === '#6366f1' ? '3px solid white' : '3px solid transparent', transition: 'var(--transition)' }}></div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Font Size</label>
                <select className="form-select">
                  <option>Small (14px)</option>
                  <option selected>Medium (16px)</option>
                  <option>Large (18px)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Language</label>
                <select className="form-select">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Japanese</option>
                </select>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="settings-section">
              <div className="settings-section-title">Privacy Settings</div>
              <div className="settings-section-sub">Control your privacy and data sharing preferences</div>
              {[
                { key: 'profileVisible', title: 'Public Profile', desc: 'Allow others to view your profile and achievements' },
                { key: 'showProgress', title: 'Show Progress', desc: 'Display your course progress on leaderboard' },
                { key: 'showStreak', title: 'Show Streak', desc: 'Display your learning streak publicly' },
              ].map(item => (
                <div key={item.key} className="toggle-setting">
                  <div className="toggle-info">
                    <div className="toggle-title">{item.title}</div>
                    <div className="toggle-desc">{item.desc}</div>
                  </div>
                  <Toggle k={item.key} />
                </div>
              ))}
              <div className="settings-actions">
                <button className="btn btn-primary" onClick={handleSave}>
                  <i className="fas fa-save"></i> Save Privacy Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;