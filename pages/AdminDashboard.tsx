
import React from 'react';
import type { Page } from '../types';
import StatCard from '../components/dashboard/StatCard';
import { UsersIcon, BookOpenIcon, ChartBarIcon } from '../components/icons/IconComponents';
import { MOCK_STATS } from '../data/mockData';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

interface AdminDashboardProps {
  navigate: (page: Page) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigate }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Active Learners" value={MOCK_STATS.activeLearners} icon={<UsersIcon />} />
        <StatCard title="Courses Published" value={MOCK_STATS.coursesPublished} icon={<BookOpenIcon />} />
        <StatCard title="Completion Rate" value={`${MOCK_STATS.completionRate}%`} icon={<ChartBarIcon />} />
        <StatCard title="Average Score" value={`${MOCK_STATS.averageScore}%`} icon={<ChartBarIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Quick Actions" className="lg:col-span-1">
          <div className="flex flex-col space-y-3">
            <Button onClick={() => navigate('USERS')}>Manage Users</Button>
            <Button onClick={() => navigate('COURSES')} variant="secondary">Manage Courses</Button>
            <Button onClick={() => navigate('STATS')} variant="secondary">View Reports</Button>
          </div>
        </Card>

        <Card title="Recent Activity" className="lg:col-span-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                  <thead>
                      <tr className="border-b border-gray-700">
                          <th className="py-2 font-semibold">User</th>
                          <th className="py-2 font-semibold">Action</th>
                          <th className="py-2 font-semibold">Timestamp</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr className="border-b border-gray-700">
                          <td className="py-3">Thomas Trainer</td>
                          <td className="py-3">Published "Advanced Tailwind CSS"</td>
                          <td className="py-3">1 hour ago</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                          <td className="py-3">Leo Learner</td>
                          <td className="py-3">Completed "Introduction to React"</td>
                          <td className="py-3">3 hours ago</td>
                      </tr>
                       <tr>
                          <td className="py-3">Alice Admin</td>
                          <td className="py-3">Exported user data</td>
                          <td className="py-3">5 hours ago</td>
                      </tr>
                  </tbody>
              </table>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
