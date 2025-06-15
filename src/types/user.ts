
export interface UserProfile {
  name: string;
  age: number;
  currentCareer: string;
  goals: string[];
  values: string[];
  relationshipStatus: string;
  financialSituation: string;
  location: string;
  healthPriorities: string[];
  dreamScenario: string;
}

export interface FutureSelf {
  age: number;
  personality: string;
  achievements: string[];
  challenges: string[];
  advice: string[];
  visualDescription: string;
}

export interface LifePathDecision {
  id: string;
  title: string;
  description: string;
  options: {
    id: string;
    text: string;
    impact: {
      career: number;
      relationships: number;
      health: number;
      finances: number;
      happiness: number;
    };
  }[];
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'future-self';
  content: string;
  timestamp: Date;
  emotion?: 'supportive' | 'challenging' | 'reflective' | 'encouraging';
}
