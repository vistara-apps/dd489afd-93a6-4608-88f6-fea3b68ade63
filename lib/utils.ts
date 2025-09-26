import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateStoryPrompt(params: {
  characterName: string;
  theme: string;
  ageGroup: string;
  plotElements?: string[];
  moralLesson?: string;
  customElements?: string;
}): string {
  const { characterName, theme, ageGroup, plotElements, moralLesson, customElements } = params;
  
  let prompt = `Create a bedtime story for a ${ageGroup} child featuring a character named ${characterName}. `;
  prompt += `The story should have a ${theme} theme. `;
  
  if (plotElements && plotElements.length > 0) {
    prompt += `Include these elements: ${plotElements.join(', ')}. `;
  }
  
  if (moralLesson) {
    prompt += `The story should teach about ${moralLesson}. `;
  }
  
  if (customElements) {
    prompt += `Additional details: ${customElements}. `;
  }
  
  prompt += `Make it engaging, age-appropriate, and perfect for bedtime with a peaceful ending.`;
  
  return prompt;
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function getAgeGroupDescription(ageGroup: string): string {
  switch (ageGroup) {
    case 'toddler':
      return 'Simple words and concepts, 2-3 minute stories';
    case 'preschool':
      return 'Basic learning concepts, 3-5 minute stories';
    case 'elementary':
      return 'Complex plots and themes, 5-8 minute stories';
    default:
      return 'Age-appropriate content';
  }
}

export function simulateStoryGeneration(): Promise<{
  title: string;
  text: string;
  audioUrl: string;
  duration: string;
}> {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve({
        title: "The Magical Adventure of Luna the Star",
        text: "Once upon a time, in a land far beyond the clouds, there lived a little star named Luna...",
        audioUrl: "/audio/generated-story.mp3",
        duration: "4:32"
      });
    }, 3000);
  });
}
