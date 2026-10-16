import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenCardStudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCardStudio }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800/80 bg-stone-950/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-holiday text-2xl font-bold tracking-tight text-amber-100/95 whitespace-nowrap shrink-0 hover:text-amber-200 transition-colors"
        >
          Holiday Hearth
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          <a
            href="#celebrations"
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Celebrations
          </a>
          <a
            href="#card-studio"
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Wishes Studio
          </a>
          <a
            href="#traditions"
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Traditions
          </a>
          <a
            href="#daily-cheer"
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Daily Cheer
          </a>
          <a
            href="#soundscape"
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Fireside Audio
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCardStudio}
            className="flex items-center gap-2 rounded-lg bg-amber-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <Sparkles className="h-4 w-4" />
            <span>Send Wishes</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-stone-300 hover:bg-stone-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-stone-800 bg-stone-950 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-stone-300">
            <a
              href="#celebrations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-200 transition-colors"
            >
              Celebrations
            </a>
            <a
              href="#card-studio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-200 transition-colors"
            >
              Wishes Studio
            </a>
            <a
              href="#traditions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-200 transition-colors"
            >
              Traditions
            </a>
            <a
              href="#daily-cheer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-200 transition-colors"
            >
              Daily Cheer
            </a>
            <a
              href="#soundscape"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-200 transition-colors"
            >
              Fireside Audio
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCardStudio();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white"
              >
                <Sparkles className="h-4 w-4" />
                <span>Send Wishes</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
