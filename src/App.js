import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import Assignments from './pages/Assignments';
import LeaderboardPage from './pages/Leaderboard';
import Profile from './pages/Profile';
import CalendarPage from './pages/Calendar';
import Settings from './pages/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [quizActive, setQuizActive] = useState(false);

  const navigate = (page, data = null) => {
    setCurrentPage(page);
    if (data?.course) setSelectedCourse(data.course);
    if (data?.lesson) setSelectedLesson(data.lesson);
    if (data?.quiz) setQuizActive(data.quiz);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard navigate={navigate} />;
      case 'courses':
        return <Courses navigate={navigate} />;
      case 'my-courses':
        return <MyCourses navigate={navigate} />;
      case 'course-detail':
        return <CourseDetailPage course={selectedCourse} navigate={navigate} />;
      case 'lesson':
        return <LessonPage lesson={selectedLesson} course={selectedCourse} navigate={navigate} />;
      case 'quiz':
        return <QuizPage course={selectedCourse} navigate={navigate} />;
      case 'assignments':
        return <Assignments navigate={navigate} />;
      case 'leaderboard':
        return <LeaderboardPage navigate={navigate} />;
      case 'profile':
        return <Profile navigate={navigate} />;
      case 'calendar':
        return <CalendarPage navigate={navigate} />;
      case 'settings':
        return <Settings navigate={navigate} />;
      default:
        return <Dashboard navigate={navigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage} navigate={navigate}>
      {renderPage()}
    </Layout>
  );
}

export default App;