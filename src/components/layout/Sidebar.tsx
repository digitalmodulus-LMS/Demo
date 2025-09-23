import React from 'react';
import { type Role, type Page } from '../../types';
import { NAVIGATION_CONFIG } from '../../constants';
import * as Icons from '../icons/IconComponents';
import { modulusLogo } from '../../assets/logo';

interface SidebarProps {
  role: Role;
  navigate: (page: Page) => void;
  currentPage: Page;
}

const ICON_MAP = Icons as unknown as { [key: string]: React.FC<any> };

const Sidebar: React.FC<SidebarProps> = ({ role, navigate, currentPage }) => {
  const navs = NAVIGATION_CONFIG[role];
  
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="h-20 flex items-center justify-center px-6 border-b border-gray-700">
        <img src={modulusLogo} alt="Modulus Academy Logo" className="h-16 w-auto" />
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navs.map((item) => {
          const Icon = ICON_MAP[item.iconName];
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
