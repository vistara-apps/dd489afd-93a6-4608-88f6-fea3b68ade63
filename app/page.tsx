'use client';

import { useState, useEffect } from 'react';
import { Star, Sparkles, Moon, Heart } from 'lucide-react';
import { AppBar } from './components/AppBar';
import { GenerateButton } from './components/GenerateButton';
import { SaveFrameButton } from './components/SaveFrameButton';
import { VoiceSelector } from './components/VoiceSelector';
import { SleepTimer } from './components/SleepTimer';
import { InputSlider } from './components/InputSlider';
import { StoryCard } from './components/StoryCard';
import { STORY_THEMES, AGE_GROUPS, VOICES, BACKGROUND_SOUNDS, MORAL_LESSONS } from '../lib/constants';
import { simulateStoryGeneration } from '../lib/utils';
import { Story } from '../lib/types';

export default function HomePage() {
  // Story generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  
  // Customization state
  const [characterName, setCharacterName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('animals');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('preschool');
  const [selectedVoice, setSelectedVoice] = useState('sarah');
  const [selectedMoralLesson, setSelectedMoralLesson] = useState('');
  const [customElements, setCustomElements] = useState('');
  
  // Sleep timer state
  const [sleepTimerEnabled, setSleepTimerEnabled] = useState(false);
  const [sleepTimerDuration, setSleepTimerDuration] = useState(15);
  
  // Background music state
  const [backgroundMusic, setBackgroundMusic] = useState('none');
  
  // UI state
  const [showCustomization, setShowCustomization] = useState(false);
  const [recentStories, setRecentStories] = useState<Story[]>([]);

  // Floating elements animation
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random floating stars
    const newStars = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setStars(newStars);
  }, []);

  const handleGenerateStory = async () => {
    if (!characterName.trim()) {
      alert('Please enter your child\'s name first!');
      return;
    }

    setIsGenerating(true);
    
    try {
      const result = await simulateStoryGeneration();
      
      const newStory: Story = {
        storyId: Date.now().toString(),
        userId: 'demo-user',
        title: result.title,
        prompt: `${characterName} in a ${selectedTheme} adventure`,
        generatedText: result.text,
        audioUrl: result.audioUrl,
        duration: result.duration,
        createdAt: new Date().toISOString(),
        isFavorite: false,
        ageGroup: selectedAgeGroup,
        theme: selectedTheme,
      };
      
      setCurrentStory(newStory);
      setRecentStories(prev => [newStory, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error('Story generation failed:', error);
      alert('Sorry, story generation failed. Please try again!');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveFrame = () => {
    // Simulate saving frame to Farcaster
    console.log('Frame saved to Farcaster!');
  };

  const handlePlayStory = (storyId: string) => {
    console.log('Playing story:', storyId);
    // Implement audio playback logic
  };

  const handleToggleFavorite = (storyId: string) => {
    setRecentStories(prev => 
      prev.map(story => 
        story.storyId === storyId 
          ? { ...story, isFavorite: !story.isFavorite }
          : story
      )
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating stars background */}
      {stars.map((star) => (
        <Star
          key={star.id}
          className="floating-star w-4 h-4 text-yellow-300"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Magical moon */}
      <div 
        className="moon-glow w-32 h-32 top-8 right-8"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,200,0.8) 0%, rgba(255,255,200,0.4) 50%, transparent 100%)',
        }}
      />

      <div className="relative z-10">
        <AppBar 
          title="Dream Weaver Tales" 
          variant="transparent"
          showSettings={true}
        />

        <div className="px-4 pb-8 space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-4 py-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-accent animate-twinkle" />
              <Moon className="w-10 h-10 text-yellow-300 animate-pulse-soft" />
              <Sparkles className="w-8 h-8 text-accent animate-twinkle" style={{ animationDelay: '1s' }} />
            </div>
            
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Sweet Dreams Await
            </h1>
            <p className="text-text-muted text-lg leading-relaxed max-w-md mx-auto">
              Create magical, personalized bedtime stories that will make your little one's dreams come true
            </p>
          </div>

          {/* Story Generation Form */}
          <div className="space-y-4">
            {/* Child's Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-fg">Child's Name</label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Enter your child's name"
                className="input-field w-full"
              />
            </div>

            {/* Story Theme */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-fg">Story Theme</label>
              <div className="grid grid-cols-2 gap-2">
                {STORY_THEMES.slice(0, 6).map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`
                      glass-card p-3 text-left transition-all duration-200
                      ${selectedTheme === theme.id 
                        ? 'ring-2 ring-accent bg-opacity-20' 
                        : 'hover:bg-opacity-15'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{theme.emoji}</span>
                      <span className="text-sm font-medium text-fg">{theme.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Age Group */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-fg">Age Group</label>
              <div className="space-y-2">
                {AGE_GROUPS.map((age) => (
                  <button
                    key={age.id}
                    onClick={() => setSelectedAgeGroup(age.id)}
                    className={`
                      glass-card p-3 w-full text-left transition-all duration-200
                      ${selectedAgeGroup === age.id 
                        ? 'ring-2 ring-accent bg-opacity-20' 
                        : 'hover:bg-opacity-15'
                      }
                    `}
                  >
                    <div className="font-medium text-fg">{age.name}</div>
                    <div className="text-sm text-text-muted">{age.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <button
              onClick={() => setShowCustomization(!showCustomization)}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {showCustomization ? 'Hide' : 'Show'} Advanced Options
            </button>

            {/* Advanced Customization */}
            {showCustomization && (
              <div className="space-y-4 glass-card p-4">
                {/* Voice Selection */}
                <VoiceSelector
                  voices={VOICES}
                  selectedVoice={selectedVoice}
                  onVoiceChange={setSelectedVoice}
                  variant="default"
                />

                {/* Moral Lesson */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-fg">Moral Lesson (Optional)</label>
                  <select
                    value={selectedMoralLesson}
                    onChange={(e) => setSelectedMoralLesson(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="">Choose a lesson...</option>
                    {MORAL_LESSONS.map((lesson) => (
                      <option key={lesson} value={lesson}>{lesson}</option>
                    ))}
                  </select>
                </div>

                {/* Custom Elements */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-fg">Custom Story Elements</label>
                  <textarea
                    value={customElements}
                    onChange={(e) => setCustomElements(e.target.value)}
                    placeholder="Add any special details, favorite animals, or story elements..."
                    className="input-field w-full h-20 resize-none"
                  />
                </div>

                {/* Sleep Timer */}
                <SleepTimer
                  isEnabled={sleepTimerEnabled}
                  duration={sleepTimerDuration}
                  onToggle={setSleepTimerEnabled}
                  onDurationChange={setSleepTimerDuration}
                />
              </div>
            )}
          </div>

          {/* Generate Button */}
          <GenerateButton
            onGenerate={handleGenerateStory}
            isGenerating={isGenerating}
            disabled={!characterName.trim()}
          />

          {/* Current Story Display */}
          {currentStory && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gradient">Your Story is Ready!</h2>
                <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
              </div>
              
              <StoryCard
                story={currentStory}
                variant="detailed"
                onPlay={handlePlayStory}
                onToggleFavorite={handleToggleFavorite}
              />
              
              <SaveFrameButton onSave={handleSaveFrame} />
            </div>
          )}

          {/* Recent Stories */}
          {recentStories.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gradient">Recent Stories</h2>
              <div className="space-y-3">
                {recentStories.map((story) => (
                  <StoryCard
                    key={story.storyId}
                    story={story}
                    variant="compact"
                    onPlay={handlePlayStory}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
