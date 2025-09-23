import React from 'react';
import { Role, Page } from '../../types';
import { HomeIcon, UsersIcon, BookOpenIcon, ChartBarIcon, CogIcon, StarIcon, CollectionIcon } from '../icons/IconComponents';
import { modulusLogo } from '../../assets/logo';

interface SidebarProps {
  role: Role;
  navigate: (page: Page) => void;
  currentPage: Page;
}

const iconMap: { [key: string]: React.FC<any> } = {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  ChartBarIcon,
  CogIcon,
  StarIcon,
  CollectionIcon,
};

const navigationItems = {
  [Role.Admin]: [
    { name: 'Dashboard', page: 'DASHBOARD' as Page, icon: 'HomeIcon' },
    { name: 'User Management', page: 'USERS' as Page, icon: 'UsersIcon' },
    { name: 'Course Management', page: 'COURSES' as Page, icon: 'BookOpenIcon' },
    { name: 'Statistics', page: 'STATS' as Page, icon: 'ChartBarIcon' },
    { name: 'Settings', page: 'SETTINGS' as Page, icon: 'CogIcon' },
  ],
  [Role.Trainer]: [
    { name: 'Dashboard', page: 'DASHBOARD' as Page, icon: 'HomeIcon' },
    { name: 'Course Management', page: 'COURSES' as Page, icon: 'BookOpenIcon' },
    { name: 'Learner Management', page: 'LEARNERS' as Page, icon: 'UsersIcon' },
    { name: 'Statistics', page: 'STATS' as Page, icon: 'ChartBarIcon' },
  ],
  [Role.Learner]: [
    { name: 'Dashboard', page: 'DASHBOARD' as Page, icon: 'HomeIcon' },
    { name: 'My Courses', page: 'COURSES' as Page, icon: 'BookOpenIcon' },
    { name: 'Catalog', page: 'CATALOG' as Page, icon: 'CollectionIcon' },
    { name: 'My Favorites', page: 'FAVORITES' as Page, icon: 'StarIcon' },
    { name: 'My Statistics', page: 'STATS' as Page, icon: 'ChartBarIcon' },
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ role, navigate, currentPage }) => {
  const navs = navigationItems[role];
  
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="h-20 flex items-center justify-center px-6 border-b border-gray-700">
        <img src={modulusLogo} alt="Modulus Academy Logo" className="h-16 w-auto" />
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navs.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = currentPage === item.page;
          return (
            <a
              key={item.name}
              href="#"
              onClick={(e) => { e.preventDefault(); navigate(item.page); }}
              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 group ${
                isActive
                  ? 'bg-neon-green text-gray-900 shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {Icon && <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-white'}`} />}
              <span className="font-semibold">{item.name}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
