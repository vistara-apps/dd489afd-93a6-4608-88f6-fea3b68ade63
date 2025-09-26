import { Voice } from './types';

export const STORY_THEMES = [
  { id: 'animals', name: 'Animal Adventures', emoji: '🦁' },
  { id: 'space', name: 'Space Exploration', emoji: '🚀' },
  { id: 'magic', name: 'Magical Worlds', emoji: '✨' },
  { id: 'ocean', name: 'Ocean Adventures', emoji: '🌊' },
  { id: 'forest', name: 'Forest Friends', emoji: '🌲' },
  { id: 'fairy', name: 'Fairy Tales', emoji: '🧚' },
  { id: 'dinosaur', name: 'Dinosaur Discovery', emoji: '🦕' },
  { id: 'superhero', name: 'Superhero Stories', emoji: '🦸' },
];

export const AGE_GROUPS = [
  { id: 'toddler', name: 'Toddler (2-3 years)', description: 'Simple words, short stories' },
  { id: 'preschool', name: 'Preschool (4-5 years)', description: 'Basic concepts, longer stories' },
  { id: 'elementary', name: 'Elementary (6-8 years)', description: 'Complex plots, learning themes' },
];

export const VOICES: Voice[] = [
  {
    id: 'sarah',
    name: 'Sarah',
    description: 'Warm, motherly voice perfect for bedtime',
    isPremium: false,
    sample: '/samples/sarah.mp3'
  },
  {
    id: 'james',
    name: 'James',
    description: 'Gentle, fatherly voice with British accent',
    isPremium: false,
    sample: '/samples/james.mp3'
  },
  {
    id: 'luna',
    name: 'Luna',
    description: 'Magical, whimsical voice for fantasy stories',
    isPremium: true,
    sample: '/samples/luna.mp3'
  },
  {
    id: 'captain',
    name: 'Captain Adventure',
    description: 'Exciting voice for action-packed tales',
    isPremium: true,
    sample: '/samples/captain.mp3'
  },
];

export const BACKGROUND_SOUNDS = [
  { id: 'none', name: 'No Background Music', emoji: '🔇' },
  { id: 'rain', name: 'Gentle Rain', emoji: '🌧️' },
  { id: 'ocean', name: 'Ocean Waves', emoji: '🌊' },
  { id: 'forest', name: 'Forest Sounds', emoji: '🌲' },
  { id: 'lullaby', name: 'Soft Lullaby', emoji: '🎵' },
];

export const MORAL_LESSONS = [
  'Kindness and helping others',
  'Being brave and facing fears',
  'The importance of friendship',
  'Honesty and telling the truth',
  'Sharing and generosity',
  'Perseverance and not giving up',
  'Respecting differences',
  'Taking care of nature',
];
