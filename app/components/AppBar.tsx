'use client';

import { ArrowLeft, Star, Settings2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface AppBarProps {
  title: string;
  variant?: 'default' | 'transparent';
  onBack?: () => void;
  showSettings?: boolean;
}

export function AppBar({ 
  title, 
  variant = 'default', 
  onBack, 
  showSettings = false 
}: AppBarProps) {
  const { theme } = useTheme();
  
  const baseClasses = "flex items-center justify-between p-4 relative";
  const variantClasses = variant === 'transparent' 
    ? "bg-transparent" 
    : "glass-card";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      {/* Floating stars decoration */}
      <Star className="floating-star top-2 left-8 w-3 h-3" style={{ animationDelay: '0s' }} />
      <Star className="floating-star top-4 right-12 w-2 h-2" style={{ animationDelay: '1s' }} />
      
      <div className="flex items-center gap-3">
        {onBack && (
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-fg" />
          </button>
        )}
        <h1 className="text-xl font-bold text-gradient">{title}</h1>
      </div>
      
      {showSettings && (
        <button className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-200">
          <Settings2 className="w-5 h-5 text-fg" />
        </button>
      )}
    </div>
  );
}
