'use client';

import { Shield, Lock } from 'lucide-react';
import { useState } from 'react';

interface ParentalGateProps {
  onUnlock: () => void;
  variant?: 'default';
}

export function ParentalGate({ onUnlock, variant = 'default' }: ParentalGateProps) {
  const [answer, setAnswer] = useState('');
  const [question] = useState(() => {
    // Generate a simple math question
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { question: `${a} + ${b}`, answer: a + b };
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(answer) === question.answer) {
      onUnlock();
    } else {
      setError('Incorrect answer. Please try again.');
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="glass-card p-6 max-w-sm w-full space-y-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-xl font-bold text-fg mb-2">Parental Controls</h2>
          <p className="text-text-muted text-sm">
            Please solve this simple math problem to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-2">
              {question.question} = ?
            </div>
            <input
              type="number"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setError('');
              }}
              className="input-field text-center text-lg w-24"
              placeholder="?"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Unlock Controls
          </button>
        </form>

        <div className="text-xs text-text-muted text-center">
          This helps ensure only parents can access these settings
        </div>
      </div>
    </div>
  );
}
