import React, { useState } from 'react';
import '../styles/leaderboard.css';
import { leaderboardData } from '../data/mockData';

function LeaderboardPage({ navigate }) {
  const [period, setPeriod] = useState('all-time');
  const top3 = leaderboardData.slice(0, 3);
  const rest = leaderboardData.slice(3);

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="page-title">🏆 Leaderboard</div>
          <div className="page-subtitle">Compete with learners worldwide</div>
        </div>
        <div className="filter-tabs">
          {['week', 'month', 'all-time'].map(p => (
            <button key={p} className={`filter-tab ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>
              {p === 'all-time' ? 'All Time' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="leaderboard-header-cards">
        {top3.map(player => (
          <div key={player.rank} className={`top-player-card rank-${player.rank}`}>
            <span className="top-rank-badge">{player.badge}</span>
            <div className="top-avatar">
              {player.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="top-name">{player.name}</div>
            <div className="top-xp">{player.xp.toLocaleString()} XP</div>
            <div className="top-level">Level {player.level} · {player.courses} courses</div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>
              🔥 {player.streak} day streak
            </div>
          </div>
        ))}
      </div>

      <div className="leaderboard-table">
        <div className="lb-table-header">
          <div>Rank</div>
          <div>Player</div>
          <div>XP Points</div>
          <div>Streak</div>
          <div>Level</div>
        </div>
        {leaderboardData.map(player => (
          <div key={player.rank} className={`lb-row ${player.isCurrentUser ? 'current-user' : ''}`}>
            <div className={`lb-rank ${player.rank <= 3 ? 'top' : ''}`}>
              {player.rank <= 3 ? player.badge : `#${player.rank}`}
            </div>
            <div className="lb-user">
              <div className="lb-avatar">
                {player.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="lb-name">
                  {player.name}
                  {player.isCurrentUser && <span className="you-tag">YOU</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{player.courses} courses</div>
              </div>
            </div>
            <div className="lb-xp">{player.xp.toLocaleString()}</div>
            <div className="lb-streak">
              <span>🔥</span> {player.streak} days
            </div>
            <div className="lb-level">
              <span className="lb-level-badge">Lv. {player.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderboardPage;