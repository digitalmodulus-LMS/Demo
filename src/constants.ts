import { Role, type Page } from './types';

export const NAVIGATION_CONFIG: Record<Role, { name: string; page: Page; iconName: string }[]> = {
  [Role.Admin]: [
    { name: 'Dashboard', page: 'DASHBOARD', iconName: 'HomeIcon' },
    { name: 'User Management', page: 'USERS', iconName: 'UsersIcon' },
    { name: 'Course Management', page: 'COURSES', iconName: 'BookOpenIcon' },
    { name: 'Statistics', page: 'STATS', iconName: 'ChartBarIcon' },
    { name: 'Settings', page: 'SETTINGS', iconName: 'CogIcon' },
  ],
  [Role.Trainer]: [
    { name: 'Dashboard', page: 'DASHBOARD', iconName: 'HomeIcon' },
    { name: 'Course Management', page: 'COURSES', iconName: 'BookOpenIcon' },
    { name: 'Learner Management', page: 'LEARNERS', iconName: 'UsersIcon' },
    { name: 'Statistics', page: 'STATS', iconName: 'ChartBarIcon' },
  ],
  [Role.Learner]: [
    { name: 'Dashboard', page: 'DASHBOARD', iconName: 'HomeIcon' },
    { name: 'My Courses', page: 'COURSES', iconName: 'BookOpenIcon' },
    { name: 'Catalog', page: 'CATALOG', iconName: 'CollectionIcon' },
    { name: 'My Favorites', page: 'FAVORITES', iconName: 'StarIcon' },
    { name: 'My Statistics', page: 'STATS', iconName: 'ChartBarIcon' },
  ],
};
