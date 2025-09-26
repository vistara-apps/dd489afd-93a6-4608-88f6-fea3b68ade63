import { Loader2, Star } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Floating stars */}
      <Star className="floating-star top-20 left-20 w-4 h-4 text-yellow-300" />
      <Star className="floating-star top-32 right-24 w-3 h-3 text-yellow-300" style={{ animationDelay: '1s' }} />
      <Star className="floating-star bottom-32 left-32 w-5 h-5 text-yellow-300" style={{ animationDelay: '2s' }} />
      
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-accent animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gradient">Loading Dream Weaver Tales</h2>
          <p className="text-text-muted">Preparing magical stories for you...</p>
        </div>
      </div>
    </div>
  );
}
