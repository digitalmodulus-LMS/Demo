import React, { useState, useRef, useEffect } from 'react';
import { User } from '../../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Welcome, {user.name}!</h2>
        <p className="text-sm text-gray-400">Role: {user.role}</p>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-3 focus:outline-none">
          <span className="text-sm font-medium text-gray-300 hidden md:inline">{user.name}</span>
          <img className="h-10 w-10 rounded-full border-2 border-neon-green" src={user.avatarUrl} alt="User avatar" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10">
            <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">My Profile</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">Logout</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
