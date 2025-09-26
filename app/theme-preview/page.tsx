'use client';

import { useTheme } from '../components/ThemeProvider';
import { AppBar } from '../components/AppBar';
import { GenerateButton } from '../components/GenerateButton';
import { StoryCard } from '../components/StoryCard';
import { VoiceSelector } from '../components/VoiceSelector';
import { SleepTimer } from '../components/SleepTimer';
import { VOICES } from '../../lib/constants';
import { useState } from 'react';

const themes = [
  { id: 'default', name: 'Dream Weaver (Default)', description: 'Magical bedtime theme' },
  { id: 'celo', name: 'CELO', description: 'Black & gold theme' },
  { id: 'solana', name: 'Solana', description: 'Purple gradient theme' },
  { id: 'base', name: 'Base', description: 'Blue blockchain theme' },
  { id: 'coinbase', name: 'Coinbase', description: 'Navy corporate theme' },
];

const sampleStory = {
  id: '1',
  title: 'The Magical Adventure of Luna',
  description: 'A beautiful story about a brave little star who helps lost children find their way home through the night sky.',
  duration: '4:32',
  isFavorite: true,
  createdAt: new Date().toISOString(),
};

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();
  const [sleepTimer, setSleepTimer] = useState(false);
  const [sleepDuration, setSleepDuration] = useState(15);
  const [selectedVoice, setSelectedVoice] = useState('sarah');

  return (
    <div className="min-h-screen">
      <AppBar title="Theme Preview" showSettings={true} />
      
      <div className="px-4 pb-8 space-y-6">
        {/* Theme Selector */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gradient">Choose Theme</h2>
          <div className="grid grid-cols-1 gap-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as any)}
                className={`
                  glass-card p-4 text-left transition-all duration-200
                  ${theme === t.id 
                    ? 'ring-2 ring-accent bg-opacity-20' 
                    : 'hover:bg-opacity-15'
                  }
                `}
              >
                <div className="font-medium text-fg">{t.name}</div>
                <div className="text-sm text-text-muted">{t.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gradient">Component Preview</h2>
          
          {/* Story Card */}
          <div className="space-y-2">
            <h3 className="font-medium text-fg">Story Card</h3>
            <StoryCard
              story={sampleStory}
              variant="detailed"
              onPlay={() => {}}
              onToggleFavorite={() => {}}
            />
          </div>

          {/* Generate Button */}
          <div className="space-y-2">
            <h3 className="font-medium text-fg">Generate Button</h3>
            <GenerateButton onGenerate={() => {}} />
          </div>

          {/* Voice Selector */}
          <div className="space-y-2">
            <h3 className="font-medium text-fg">Voice Selector</h3>
            <VoiceSelector
              voices={VOICES.slice(0, 2)}
              selectedVoice={selectedVoice}
              onVoiceChange={setSelectedVoice}
            />
          </div>

          {/* Sleep Timer */}
          <div className="space-y-2">
            <h3 className="font-medium text-fg">Sleep Timer</h3>
            <SleepTimer
              isEnabled={sleepTimer}
              duration={sleepDuration}
              onToggle={setSleepTimer}
              onDurationChange={setSleepDuration}
            />
          </div>

          {/* Form Elements */}
          <div className="space-y-2">
            <h3 className="font-medium text-fg">Form Elements</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Child's name"
                className="input-field w-full"
              />
              <button className="btn-secondary">Secondary Button</button>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gradient">Color Palette</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card p-3">
              <div className="w-full h-8 bg-bg rounded mb-2"></div>
              <div className="text-sm text-fg">Background</div>
            </div>
            <div className="glass-card p-3">
              <div className="w-full h-8 bg-surface rounded mb-2"></div>
              <div className="text-sm text-fg">Surface</div>
            </div>
            <div className="glass-card p-3">
              <div className="w-full h-8 bg-accent rounded mb-2"></div>
              <div className="text-sm text-fg">Accent</div>
            </div>
            <div className="glass-card p-3">
              <div className="w-full h-8 bg-primary rounded mb-2"></div>
              <div className="text-sm text-fg">Primary</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
