'use client';

import { Moon, Clock, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState } from 'react';
import { InputSlider } from './InputSlider';

interface SleepTimerProps {
  isEnabled: boolean;
  duration: number;
  onToggle: (enabled: boolean) => void;
  onDurationChange: (minutes: number) => void;
  variant?: 'default';
}

export function SleepTimer({ 
  isEnabled, 
  duration, 
  onToggle, 
  onDurationChange,
  variant = 'default' 
}: SleepTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="glass-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-accent" />
          <h3 className="font-medium text-fg">Sleep Timer</h3>
        </div>
        
        <button
          onClick={() => onToggle(!isEnabled)}
          className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-200"
        >
          {isEnabled ? (
            <ToggleRight className="w-6 h-6" />
          ) : (
            <ToggleLeft className="w-6 h-6" />
          )}
        </button>
      </div>

      {isEnabled && (
        <div className="space-y-4">
          <InputSlider
            label="Auto-stop after"
            min={5}
            max={120}
            value={duration}
            onChange={onDurationChange}
            unit=" min"
            variant="themed"
          />
          
          {timeRemaining !== null && (
            <div className="flex items-center gap-2 text-sm text-accent">
              <Clock className="w-4 h-4" />
              <span>Time remaining: {formatTime(timeRemaining)}</span>
            </div>
          )}
          
          <div className="text-xs text-text-muted">
            The story will fade out gently when the timer ends
          </div>
        </div>
      )}
    </div>
  );
}
