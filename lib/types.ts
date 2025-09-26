export interface User {
  userId: string;
  farcasterId?: string;
  subscriptionTier: 'free' | 'basic' | 'premium';
  createdAt: string;
  lastLogin: string;
}

export interface Story {
  storyId: string;
  userId: string;
  title: string;
  prompt: string;
  generatedText: string;
  audioUrl?: string;
  duration: string;
  createdAt: string;
  isFavorite: boolean;
  ageGroup: string;
  theme: string;
}

export interface Customization {
  customizationId: string;
  userId: string;
  characterName: string;
  theme: string;
  ageGroup: 'toddler' | 'preschool' | 'elementary';
  voicePreference: string;
  sleepTimerEnabled: boolean;
  sleepTimerDuration: number;
  backgroundMusic: boolean;
  createdAt: string;
}

export interface Voice {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  sample?: string;
}

export interface StoryPrompt {
  characterName: string;
  theme: string;
  plotElements: string[];
  ageGroup: string;
  moralLesson?: string;
  customElements?: string;
}
