import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-800 bg-stone-950 py-12 text-stone-400">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-800">
          <div>
            <a
              href="#top"
              className="font-holiday text-2xl font-bold tracking-tight text-amber-100 hover:text-amber-200 transition-colors"
            >
              Holiday Hearth
            </a>
            <p className="mt-1 text-xs text-stone-500">
              Season’s warmest greetings, fellowship, and joyful celebrations for 2026.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <a href="#top" className="hover:text-amber-200 transition-colors">
              Welcome
            </a>
            <a href="#card-studio" className="hover:text-amber-200 transition-colors">
              Card Studio
            </a>
            <a href="#traditions" className="hover:text-amber-200 transition-colors">
              Traditions
            </a>
            <a href="#daily-cheer" className="hover:text-amber-200 transition-colors">
              Daily Calendar
            </a>
            <a href="#soundscape" className="hover:text-amber-200 transition-colors">
              Hearth Audio
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors ml-2"
              title="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026 Holiday Hearth. Created with warmth, peace, and good cheer.
          </div>
          <div className="flex items-center gap-2">
            <span>May peace be your gift this season and your blessing all year through.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
