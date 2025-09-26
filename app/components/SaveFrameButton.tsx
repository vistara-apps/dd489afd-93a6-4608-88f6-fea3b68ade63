'use client';

import { Bookmark, Check } from 'lucide-react';
import { useState } from 'react';

interface SaveFrameButtonProps {
  onSave: () => void;
  variant?: 'default';
}

export function SaveFrameButton({ onSave, variant = 'default' }: SaveFrameButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (isSaved) return;
    
    setIsSaved(true);
    onSave();
    
    // Reset after 3 seconds
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <button
      onClick={handleSave}
      className={`
        btn-secondary flex items-center gap-2 transition-all duration-300
        ${isSaved ? 'bg-green-500 bg-opacity-20 text-green-400' : ''}
      `}
    >
      {isSaved ? (
        <>
          <Check className="w-4 h-4" />
          Frame Saved!
        </>
      ) : (
        <>
          <Bookmark className="w-4 h-4" />
          Save Frame
        </>
      )}
    </button>
  );
}
