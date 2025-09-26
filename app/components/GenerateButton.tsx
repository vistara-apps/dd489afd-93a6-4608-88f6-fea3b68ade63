'use client';

import { Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface GenerateButtonProps {
  onGenerate: () => void;
  isGenerating?: boolean;
  disabled?: boolean;
  variant?: 'default';
  children?: React.ReactNode;
}

export function GenerateButton({ 
  onGenerate, 
  isGenerating = false, 
  disabled = false,
  variant = 'default',
  children 
}: GenerateButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (disabled || isGenerating) return;
    
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
    onGenerate();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isGenerating}
      className={`
        btn-primary w-full flex items-center justify-center gap-3 py-4 text-lg font-semibold
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${clicked ? 'scale-95' : ''}
        ${isGenerating ? 'animate-pulse' : ''}
      `}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Weaving your story...
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5" />
          {children || 'Generate Story'}
        </>
      )}
    </button>
  );
}
