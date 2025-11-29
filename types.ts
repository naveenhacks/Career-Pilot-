export interface UserProfile {
  name: string;
  email: string;
  education: string;
  skills: string;
  interests: string;
  resumeText: string;
}

export interface SkillMetric {
  skill: string;
  level: number; // 0-100
  category: string;
}

export interface CareerMatch {
  title: string;
  matchPercentage: number;
  salaryRange: string;
  demandLevel: 'High' | 'Medium' | 'Low';
  description: string;
}

export interface RoadmapStep {
  phase: string;
  duration: string;
  tasks: string[];
}

export interface ResumeFeedback {
  score: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
}

export interface AnalysisResult {
  skillsAnalysis: {
    strengths: string[];
    weaknesses: string[];
    skillMatrix: SkillMetric[];
  };
  careerMatches: CareerMatch[];
  roadmap: RoadmapStep[];
  resumeFeedback: ResumeFeedback;
  optimizedResume: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export enum AppView {
  LANDING = 'LANDING',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  PRICING = 'PRICING',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  PROFILE = 'PROFILE'
}