'use client';

import { Volume2, Crown } from 'lucide-react';
import { useState } from 'react';

interface Voice {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  sample?: string;
}

interface VoiceSelectorProps {
  voices: Voice[];
  selectedVoice: string;
  onVoiceChange: (voiceId: string) => void;
  variant?: 'default' | 'premium';
}

export function VoiceSelector({ 
  voices, 
  selectedVoice, 
  onVoiceChange, 
  variant = 'default' 
}: VoiceSelectorProps) {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const handlePlaySample = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
      // Simulate playing sample for 3 seconds
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-fg">Choose Voice</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {voices.map((voice) => (
          <div
            key={voice.id}
            className={`
              glass-card p-4 cursor-pointer transition-all duration-200
              ${selectedVoice === voice.id 
                ? 'ring-2 ring-accent bg-opacity-20' 
                : 'hover:bg-opacity-15'
              }
              ${voice.isPremium && variant !== 'premium' 
                ? 'opacity-60' 
                : ''
              }
            `}
            onClick={() => !voice.isPremium || variant === 'premium' ? onVoiceChange(voice.id) : null}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-fg">{voice.name}</h4>
                  {voice.isPremium && (
                    <Crown className="w-4 h-4 text-yellow-400" />
                  )}
                </div>
                <p className="text-sm text-text-muted">{voice.description}</p>
              </div>
              
              {voice.sample && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlaySample(voice.id);
                  }}
                  className={`
                    p-2 rounded-full transition-all duration-200
                    ${playingVoice === voice.id 
                      ? 'bg-accent text-white animate-pulse' 
                      : 'hover:bg-white hover:bg-opacity-10 text-text-muted hover:text-fg'
                    }
                  `}
                  disabled={voice.isPremium && variant !== 'premium'}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {voice.isPremium && variant !== 'premium' && (
              <div className="mt-2 text-xs text-yellow-400">
                Premium voice - upgrade to unlock
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
