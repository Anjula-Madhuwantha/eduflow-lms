import React, { useState, useEffect } from 'react';
import '../styles/quiz.css';
import { quizQuestions } from '../data/mockData';

function QuizPage({ course, navigate }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [showExplanation, setShowExplanation] = useState(false);

  const q = quizQuestions[current];
  const pct = Math.round(((current + (answered ? 1 : 0)) / quizQuestions.length) * 100);

  useEffect(() => {
    if (finished) return;
    const t = setInterval(() => setTimeLeft(prev => {
      if (prev <= 1) { setFinished(true); return 0; }
      return prev - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [finished]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timerColor = timeLeft < 60 ? '#ef4444' : timeLeft < 180 ? '#f59e0b' : '#10b981';

  const handleSelect = idx => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setShowExplanation(true);
    const correct = idx === q.correct;
    if (correct) setScore(s => s + 20);
    setAnswers(prev => [...prev, { q: current, selected: idx, correct }]);
  };

  const handleNext = () => {
    if (current < quizQuestions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const scorePct = Math.round((score / (quizQuestions.length * 20)) * 100);
  const getLetterGrade = s => s >= 90 ? 'A' : s >= 80 ? 'B' : s >= 70 ? 'C' : s >= 60 ? 'D' : 'F';

  if (finished) {
    return (
      <div className="page-container">
        <div className="quiz-container">
          <div className="quiz-result-card">
            <span className="result-emoji">{scorePct >= 80 ? '🎉' : scorePct >= 60 ? '👍' : '💪'}</span>
            <div className="result-score">{scorePct}%</div>
            <div className="result-label">
              {scorePct >= 80 ? 'Excellent Work!' : scorePct >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </div>
            <div className="result-sub">
              Grade: <strong>{getLetterGrade(scorePct)}</strong> · You got {answers.filter(a => a.correct).length} out of {quizQuestions.length} correct
            </div>
            <div className="result-stats">
              <div className="result-stat">
                <div className="rs-num" style={{ color: 'var(--success)' }}>{answers.filter(a => a.correct).length}</div>
                <div className="rs-label">Correct</div>
              </div>
              <div className="result-stat">
                <div className="rs-num" style={{ color: 'var(--danger)' }}>{answers.filter(a => !a.correct).length}</div>
                <div className="rs-label">Wrong</div>
              </div>
              <div className="result-stat">
                <div className="rs-num" style={{ color: 'var(--warning)' }}>{score}</div>
                <div className="rs-label">Points</div>
              </div>
              <div className="result-stat">
                <div className="rs-num" style={{ color: 'var(--info)' }}>{Math.floor((600 - timeLeft) / 60)}m</div>
                <div className="rs-label">Time Taken</div>
              </div>
            </div>
            <div className="result-actions">
              <button className="btn btn-secondary" onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setAnswers([]); setFinished(false); setTimeLeft(600); setShowExplanation(false); }}>
                <i className="fas fa-redo"></i> Retake Quiz
              </button>
              <button className="btn btn-primary" onClick={() => navigate('my-courses')}>
                <i className="fas fa-book"></i> Back to Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="quiz-container">
        <div className="quiz-header-card">
          <div className="quiz-progress-header">
            <div style={{ fontSize: 16, fontWeight: 700 }}>
              {course?.title || 'React Development'} Quiz
            </div>
            <div className="quiz-timer" style={{ borderColor: `${timerColor}44`, color: timerColor }}>
              <i className="fas fa-clock"></i>
              {mins}:{String(secs).padStart(2, '0')}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
            <span>Question {current + 1} of {quizQuestions.length}</span>
            <span>{pct}% Complete</span>
          </div>
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${pct}%` }}></div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
            {quizQuestions.map((_, i) => (
              <div key={i} style={{
                height: 6, flex: 1, borderRadius: 3,
                background: i < current ? 'var(--primary)' : i === current ? 'var(--primary-light)' : 'var(--border)',
                opacity: i === current ? 1 : 0.8,
                transition: 'var(--transition)',
              }}></div>
            ))}
          </div>
        </div>

        <div className="question-card">
          <div className="question-number">Question {current + 1}</div>
          <div className="question-text">{q.question}</div>
          <div className="options-list">
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`option-btn ${selected === i ? answered && i === q.correct ? 'correct' : answered ? 'wrong' : 'selected' : answered && i === q.correct ? 'correct' : ''}`}
                onClick={() => handleSelect(i)}
                disabled={answered}
              >
                <div className="option-letter">{['A', 'B', 'C', 'D'][i]}</div>
                <span>{opt}</span>
                {answered && i === q.correct && <i className="fas fa-check option-icon" style={{ color: 'var(--success)' }}></i>}
                {answered && selected === i && i !== q.correct && <i className="fas fa-times option-icon" style={{ color: 'var(--danger)' }}></i>}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="explanation-box">
              <i className="fas fa-lightbulb"></i>
              <div className="explanation-text"><strong>Explanation:</strong> {q.explanation}</div>
            </div>
          )}
        </div>

        <div className="quiz-actions">
          <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            Score: <strong style={{ color: 'var(--primary-light)' }}>{score} pts</strong>
          </div>
          {answered && (
            <button className="btn btn-primary" onClick={handleNext}>
              {current < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
              <i className="fas fa-arrow-right"></i>
            </button>
          )}
          {!answered && (
            <button className="btn btn-secondary" style={{ opacity: 0.5 }} disabled>
              Select an answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;