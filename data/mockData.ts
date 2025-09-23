import { User, Role, Course, GeneratedContent } from '../types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Alice Admin', email: 'admin@modulus.net', role: Role.Admin, avatarUrl: 'https://i.pravatar.cc/150?u=admin' },
  { id: '2', name: 'Thomas Trainer', email: 'trainer@modulus.net', role: Role.Trainer, avatarUrl: 'https://i.pravatar.cc/150?u=trainer' },
  { id: '3', name: 'Leo Learner', email: 'learner@modulus.net', role: Role.Learner, avatarUrl: 'https://i.pravatar.cc/150?u=learner' },
];

export const MOCK_COURSES: Course[] = [
    {
        id: 'c1',
        title: 'Introduction to React',
        description: 'Learn the fundamentals of building web applications with React.',
        author: 'Thomas Trainer',
        modules: [
            {
                title: 'Module 1: Getting Started',
                lessons: [
                    { title: 'What is React?', content: 'React is a JavaScript library for building user interfaces.', quiz: [] },
                    { title: 'Setting up your environment', content: 'You will need Node.js and npm installed.', quiz: [] }
                ]
            }
        ]
    },
];

export const MOCK_GENERATED_COURSES: GeneratedContent[] = [
    {
        id: 'gc1',
        title: "Principes de la Vente Consultative",
        type: 'storytelling',
        generatedOn: '2024-07-15',
        content: "Découvrez comment transformer votre approche commerciale en adoptant une posture de consultant pour mieux répondre aux besoins de vos clients..."
    },
    {
        id: 'gc2',
        title: "Quiz sur la Cybersécurité",
        type: 'quiz',
        generatedOn: '2024-07-12',
        content: "Un quiz interactif pour tester les connaissances de vos équipes sur les bonnes pratiques en matière de cybersécurité..."
    }
];

export const MOCK_LEARNERS_DATA = [
    { id: 'l1', name: 'John Doe', progress: 75, lastActivity: '2 hours ago' },
    { id: 'l2', name: 'Jane Smith', progress: 100, lastActivity: '1 day ago' },
    { id: 'l3', name: 'Peter Jones', progress: 20, lastActivity: '3 days ago' },
];

export const MOCK_STATS = {
    activeLearners: 125,
    completionRate: 78,
    averageScore: 85,
    coursesPublished: 23
};
