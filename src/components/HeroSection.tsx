import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Clock, Heart, Edit3, Check, Snowflake, Sun, Flame } from 'lucide-react';
import { HolidayTheme } from '../types.ts';

interface HeroSectionProps {
  currentTheme: HolidayTheme;
  onThemeChange: (theme: HolidayTheme) => void;
  particlesEnabled: boolean;
  onToggleParticles: () => void;
  onOpenCardStudio: () => void;
}

interface HolidayTarget {
  name: string;
  month: number; // 0-indexed: 11 is Dec, 0 is Jan, 10 is Nov
  day: number;
  label: string;
}

const HOLIDAY_TARGETS: HolidayTarget[] = [
  { name: 'Christmas Day', month: 11, day: 25, label: 'Dec 25' },
  { name: "New Year's Eve", month: 11, day: 31, label: 'Dec 31' },
  { name: 'Winter Solstice', month: 11, day: 21, label: 'Dec 21' },
  { name: 'Thanksgiving', month: 10, day: 26, label: 'Late Nov' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentTheme,
  onThemeChange,
  particlesEnabled,
  onToggleParticles,
  onOpenCardStudio,
}) => {
  const [guestName, setGuestName] = useState('Our Cherished Guests');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('Our Cherished Guests');
  const [selectedHoliday, setSelectedHoliday] = useState<HolidayTarget>(HOLIDAY_TARGETS[0]);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      let targetYear = now.getFullYear();
      let targetDate = new Date(targetYear, selectedHoliday.month, selectedHoliday.day, 0, 0, 0);

      // If holiday has already passed this year, point to next year
      if (now.getTime() > targetDate.getTime()) {
        targetDate = new Date(targetYear + 1, selectedHoliday.month, selectedHoliday.day, 0, 0, 0);
      }

      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedHoliday]);

  const handleSaveName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (tempName.trim()) {
      setGuestName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <section id="top" className="relative overflow-hidden pt-6 pb-16 lg:py-20">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-600/15 via-rose-900/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Seasonal Theme Switcher & Atmosphere Toolbar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-400">
              Seasonal Mood:
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-stone-900/90 rounded-lg border border-stone-800">
              <button
                onClick={() => onThemeChange('winter')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  currentTheme === 'winter'
                    ? 'bg-amber-600/90 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Winter Hearth
              </button>
              <button
                onClick={() => onThemeChange('harvest')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  currentTheme === 'harvest'
                    ? 'bg-amber-600/90 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Harvest Warmth
              </button>
              <button
                onClick={() => onThemeChange('newyear')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  currentTheme === 'newyear'
                    ? 'bg-amber-600/90 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                New Year Gala
              </button>
              <button
                onClick={() => onThemeChange('blossom')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  currentTheme === 'blossom'
                    ? 'bg-amber-600/90 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Spring Solstice
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleParticles}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                particlesEnabled
                  ? 'border-amber-500/40 bg-amber-950/30 text-amber-200'
                  : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-300'
              }`}
              title="Toggle falling festive particles"
            >
              <Snowflake className={`h-3.5 w-3.5 ${particlesEnabled ? 'text-amber-300' : 'text-stone-500'}`} />
              <span>Particles: {particlesEnabled ? 'On' : 'Off'}</span>
            </button>
          </div>
        </div>

        {/* Hero Split Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Greeting, Value, Personalization & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Editorial Kicker & Personalization */}
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium text-amber-300/90">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Season of Light & Fellowship</span>
              </span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-stone-400">Winter Edition 2026</span>
            </div>

            {/* Personalized Guest Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg bg-stone-900/80 px-3.5 py-1.5 text-xs border border-stone-800 w-fit">
              <span className="text-stone-400">Welcoming:</span>
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    maxLength={32}
                    className="rounded bg-stone-800 px-2 py-0.5 text-xs text-amber-200 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="p-1 text-emerald-400 hover:text-emerald-300"
                    title="Save name"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-amber-200">{guestName}</span>
                  <button
                    onClick={() => {
                      setTempName(guestName);
                      setIsEditingName(true);
                    }}
                    className="p-0.5 text-stone-500 hover:text-amber-300 transition-colors"
                    title="Personalize your greeting"
                  >
                    <Edit3 className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Marquee Headline */}
            <h1
              className="font-holiday text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-[1.08] mb-6"
              style={{ textWrap: 'balance' }}
            >
              May your holiday hearth be bright, peaceful, and filled with wonder.
            </h1>

            {/* Value Proposition Prose */}
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl mb-8">
              Step into an intimate sanctuary of seasonal celebration. Uncover heartwarming holiday stories, compose bespoke greeting cards for friends and family, and relish the soothing ambiance of fireside warmth.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onOpenCardStudio}
                className="flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-900/20 hover:from-amber-500 hover:to-amber-400 transition-all active:scale-98 whitespace-nowrap"
              >
                <Sparkles className="h-4 w-4" />
                <span>Create Holiday Card</span>
              </button>

              <a
                href="#traditions"
                className="flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-900/60 px-5 py-3 text-sm font-medium text-stone-200 hover:border-stone-500 hover:bg-stone-800 transition-all whitespace-nowrap"
              >
                <span>Explore Traditions</span>
              </a>
            </div>

            {/* Countdown Strip */}
            <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-4 sm:p-5 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-800">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Counting Down To:</span>
                </div>
                <div className="flex items-center gap-1">
                  {HOLIDAY_TARGETS.map((target) => (
                    <button
                      key={target.name}
                      onClick={() => setSelectedHoliday(target)}
                      className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                        selectedHoliday.name === target.name
                          ? 'bg-amber-500/20 text-amber-200 font-medium'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {target.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="rounded-lg bg-stone-950/60 py-2 sm:py-3 px-1 border border-stone-800/80">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-amber-100 tabular-nums">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">
                    Days
                  </div>
                </div>

                <div className="rounded-lg bg-stone-950/60 py-2 sm:py-3 px-1 border border-stone-800/80">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-amber-100 tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">
                    Hours
                  </div>
                </div>

                <div className="rounded-lg bg-stone-950/60 py-2 sm:py-3 px-1 border border-stone-800/80">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-amber-100 tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">
                    Minutes
                  </div>
                </div>

                <div className="rounded-lg bg-stone-950/60 py-2 sm:py-3 px-1 border border-stone-800/80">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-amber-400 tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">
                    Seconds
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Asset Carrier */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 shadow-2xl">
              {/* Fallback container with gradient and icon */}
              <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full relative">
                <img
                  src="/src/assets/images/holiday_hero_cozy_hearth_1792175340035.jpg"
                  alt="Cozy holiday hearth with lit Christmas tree and crackling fireplace"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylized SVG background if image load ever fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.classList.add(
                        'bg-gradient-to-br',
                        'from-stone-900',
                        'via-amber-950/50',
                        'to-stone-900'
                      );
                    }
                  }}
                />
                {/* Subtle scrim overlay for rich contrast */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                {/* Quiet atmospheric badge on image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-200">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Flame className="h-3.5 w-3.5 text-amber-400" />
                    <span>The Fireside Parlor</span>
                  </div>
                  <span className="text-stone-400">Quiet Solace</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
