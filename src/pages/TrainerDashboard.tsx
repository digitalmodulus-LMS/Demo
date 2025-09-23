import React from 'react';
import type { Page } from '../types';
import StatCard from '../components/dashboard/StatCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { MOCK_COURSES, MOCK_LEARNERS_DATA, MOCK_GENERATED_COURSES } from '../data/mockData';
import { BookOpenIcon, UsersIcon, SparklesIcon } from '../components/icons/IconComponents';

interface TrainerDashboardProps {
  navigate: (page: Page) => void;
}

const TrainerDashboard: React.FC<TrainerDashboardProps> = ({ navigate }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Trainer Dashboard</h1>
        <Button onClick={() => navigate('COURSE_CREATOR')}>
            <SparklesIcon className="h-5 w-5 mr-2" />
            Créer avec l'IA
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard title="My Courses" value={MOCK_COURSES.length} icon={<BookOpenIcon />} />
        <StatCard title="Enrolled Learners" value={MOCK_LEARNERS_DATA.length} icon={<UsersIcon />} />
        <StatCard title="Avg. Completion" value="65%" icon={<UsersIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Mes Contenus Générés">
           <ul className="space-y-3">
            {MOCK_GENERATED_COURSES.map(course => (
              <li key={course.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <div>
                  <span className="font-semibold text-white">{course.title}</span>
                  <span className="block text-xs text-gray-400">Type: {course.type} | Généré le: {course.generatedOn}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">Modifier</Button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Recent Learner Progress">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-gray-300">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-2 font-semibold">Learner</th>
                            <th className="py-2 font-semibold">Progress</th>
                            <th className="py-2 font-semibold">Last Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_LEARNERS_DATA.slice(0, 3).map(learner => (
                            <tr key={learner.id}>
                                <td className="py-3">{learner.name}</td>
                                <td className="py-3">
                                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                                        <div className="bg-neon-green h-2.5 rounded-full" style={{width: `${learner.progress}%`}}></div>
                                    </div>
                                </td>
                                <td className="py-3">{learner.lastActivity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default TrainerDashboard;
