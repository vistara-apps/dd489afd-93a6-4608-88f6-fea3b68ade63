'use client';

import { useState } from 'react';

interface InputSliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  variant?: 'default' | 'themed';
  unit?: string;
}

export function InputSlider({ 
  label, 
  min, 
  max, 
  value, 
  onChange, 
  variant = 'default',
  unit = ''
}: InputSliderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  const sliderClasses = variant === 'themed' 
    ? 'accent-accent' 
    : 'accent-primary';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-fg">{label}</label>
        <span className="text-sm text-accent font-medium">
          {value}{unit}
        </span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className={`
            w-full h-2 rounded-full appearance-none cursor-pointer
            bg-surface hover:bg-opacity-80 transition-all duration-200
            ${sliderClasses}
            ${isDragging ? 'scale-105' : ''}
          `}
          style={{
            background: `linear-gradient(to right, 
              var(--color-accent) 0%, 
              var(--color-accent) ${percentage}%, 
              var(--color-surface) ${percentage}%, 
              var(--color-surface) 100%)`
          }}
        />
        
        {/* Custom thumb indicator */}
        <div 
          className="absolute top-1/2 w-4 h-4 bg-accent rounded-full transform -translate-y-1/2 -translate-x-1/2 shadow-lg transition-all duration-200 pointer-events-none"
          style={{ left: `${percentage}%` }}
        >
          {isDragging && (
            <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-75"></div>
          )}
        </div>
      </div>
    </div>
  );
}
