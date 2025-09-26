
import React from 'react';
import { Role, Page } from './types';

// FIX: Added React import to fix "Cannot find namespace 'React'". The type React.FC was used without importing React.
export const NAVIGATION_ITEMS: Record<Role, { name: string; page: Page; icon: React.FC<any> }[]> = {
  [Role.Admin]: [
    { name: 'Dashboard', page: 'DASHBOARD', icon: 'HomeIcon' as any },
    { name: 'User Management', page: 'USERS', icon: 'UsersIcon' as any },
    { name: 'Course Management', page: 'COURSES', icon: 'BookOpenIcon' as any },
    { name: 'Statistics', page: 'STATS', icon: 'ChartBarIcon' as any },
    { name: 'Settings', page: 'SETTINGS', icon: 'CogIcon' as any },
  ],
  [Role.Trainer]: [
    { name: 'Dashboard', page: 'DASHBOARD', icon: 'HomeIcon' as any },
    { name: 'Course Management', page: 'COURSES', icon: 'BookOpenIcon' as any },
    { name: 'Learner Management', page: 'LEARNERS', icon: 'UsersIcon' as any },
    { name: 'Statistics', page: 'STATS', icon: 'ChartBarIcon' as any },
  ],
  [Role.Learner]: [
    { name: 'Dashboard', page: 'DASHBOARD', icon: 'HomeIcon' as any },
    { name: 'My Courses', page: 'COURSES', icon: 'BookOpenIcon' as any },
    { name: 'Catalog', page: 'CATALOG', icon: 'CollectionIcon' as any },
    { name: 'My Favorites', page: 'FAVORITES', icon: 'StarIcon' as any },
    { name: 'My Statistics', page: 'STATS', icon: 'ChartBarIcon' as any },
  ],
};
