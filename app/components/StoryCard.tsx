'use client';

import { Play, Heart, Clock } from 'lucide-react';
import { useState } from 'react';

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    description: string;
    duration: string;
    isFavorite: boolean;
    createdAt: string;
  };
  variant?: 'compact' | 'detailed';
  onPlay?: (storyId: string) => void;
  onToggleFavorite?: (storyId: string) => void;
}

export function StoryCard({ 
  story, 
  variant = 'detailed', 
  onPlay, 
  onToggleFavorite 
}: StoryCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    onPlay?.(story.id);
  };

  const handleFavorite = () => {
    onToggleFavorite?.(story.id);
  };

  if (variant === 'compact') {
    return (
      <div className="story-card">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-fg">{story.title}</h3>
            <p className="text-sm text-text-muted flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" />
              {story.duration}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-full transition-all duration-200 ${
                story.isFavorite 
                  ? 'text-pink-400 hover:text-pink-300' 
                  : 'text-text-muted hover:text-fg'
              }`}
            >
              <Heart className={`w-4 h-4 ${story.isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handlePlay}
              className="btn-primary p-2 rounded-full"
            >
              <Play className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="story-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-fg mb-1">{story.title}</h3>
          <p className="text-text-muted text-sm leading-relaxed">{story.description}</p>
        </div>
        <button
          onClick={handleFavorite}
          className={`p-2 rounded-full transition-all duration-200 ${
            story.isFavorite 
              ? 'text-pink-400 hover:text-pink-300' 
              : 'text-text-muted hover:text-fg'
          }`}
        >
          <Heart className={`w-5 h-5 ${story.isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {story.duration}
          </span>
          <span>{new Date(story.createdAt).toLocaleDateString()}</span>
        </div>
        
        <button
          onClick={handlePlay}
          className="btn-primary flex items-center gap-2"
        >
          <Play className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
          {isPlaying ? 'Playing...' : 'Play Story'}
        </button>
      </div>
    </div>
  );
}
