
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { type User, type Page } from '../../types';

interface MainLayoutProps {
  user: User;
  onLogout: () => void;
  navigate: (page: Page) => void;
  currentPage: Page;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ user, onLogout, children, navigate, currentPage }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar role={user.role} navigate={navigate} currentPage={currentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
