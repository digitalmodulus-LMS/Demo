export enum Role {
  Admin = 'Admin',
  Trainer = 'Formateur',
  Learner = 'Apprenant',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl: string;
}

export type Page = 'DASHBOARD' | 'COURSES' | 'LEARNERS' | 'STATS' | 'PROFILE' | 'CATALOG' | 'FAVORITES' | 'USERS' | 'SETTINGS' | 'COURSE_CREATOR';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Lesson {
  title: string;
  content: string;
  quiz: QuizQuestion[];
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  author: string;
  modules: Module[];
}

// Types for the new Course Creator Wizard
export interface NeedsAssessment {
  targetAudience: {
    age: string;
    sector: string;
    experience: string;
  };
  learningObjectives: string;
  perceivedDifficulties: string;
}

export interface ContentParameters {
  contentType: 'text' | 'quiz' | 'storytelling' | 'roleplay' | 'video_script' | 'ppt_outline';
  courseType: 'one-shot' | 'multi-session';
  refinementPrompt: string;
}

export interface GeneratedContent {
  id: string;
  title: string;
  type: ContentParameters['contentType'];
  generatedOn: string;
  content: string;
}
