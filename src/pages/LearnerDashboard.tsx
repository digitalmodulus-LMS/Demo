import React from 'react';
import type { Page } from '../types';
import Card from '../components/common/Card';
import { MOCK_COURSES } from '../data/mockData';

interface LearnerDashboardProps {
  navigate: (page: Page) => void;
}

const LearnerDashboard: React.FC<LearnerDashboardProps> = ({ navigate }) => {
  const inProgressCourses = MOCK_COURSES.slice(0, 1);
  const completedCourses = MOCK_COURSES.slice(0, 1); // Using same for demo

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">My Dashboard</h1>
      
      <div className="space-y-8">
        <Card title="Courses In Progress">
          {inProgressCourses.map(course => (
            <div key={course.id} className="p-4 bg-gray-700 rounded-lg mb-4">
              <h3 className="font-semibold text-lg text-white">{course.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{course.description}</p>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div className="bg-neon-green h-2.5 rounded-full" style={{width: '45%'}}></div>
              </div>
              <p className="text-xs text-right mt-1 text-gray-300">45% Complete</p>
            </div>
          ))}
        </Card>

        <Card title="Completed Courses">
          {completedCourses.map(course => (
             <div key={course.id} className="p-4 bg-gray-700 rounded-lg mb-4 flex justify-between items-center">
               <div>
                  <h3 className="font-semibold text-lg text-white">{course.title}</h3>
                  <p className="text-sm text-gray-400">Completed on: 2024-05-10</p>
               </div>
               <button className="text-neon-green font-semibold hover:underline">Download Certificate</button>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default LearnerDashboard;
