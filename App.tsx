
import React, { useState, useCallback, useMemo } from 'react';
import LoginPage from './pages/LoginPage';
import MainLayout from './components/layout/MainLayout';
import AdminDashboard from './pages/AdminDashboard';
import TrainerDashboard from './pages/TrainerDashboard';
import LearnerDashboard from './pages/LearnerDashboard';
import CourseCreatorWizard from './components/course-creator/CourseCreatorWizard';
import { type User, Role, type Page } from './types';
import { MOCK_USERS } from './data/mockData';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('DASHBOARD');

  const handleLogin = useCallback((role: Role) => {
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      setCurrentPage('DASHBOARD');
    }
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const renderContent = useMemo(() => {
    if (!currentUser) return null;

    if (currentPage === 'COURSE_CREATOR' && currentUser.role === Role.Trainer) {
      return <CourseCreatorWizard onFinish={() => navigate('DASHBOARD')} />;
    }

    switch (currentUser.role) {
      case Role.Admin:
        return <AdminDashboard navigate={navigate} />;
      case Role.Trainer:
        return <TrainerDashboard navigate={navigate} />;
      case Role.Learner:
        return <LearnerDashboard navigate={navigate} />;
      default:
        return <div>Invalid Role</div>;
    }
  }, [currentUser, currentPage, navigate]);

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <MainLayout user={currentUser} onLogout={handleLogout} navigate={navigate} currentPage={currentPage}>
      {renderContent}
    </MainLayout>
  );
};

export default App;
