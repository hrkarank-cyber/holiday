import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Heart, CheckCircle2, ChevronDown, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CheerGift } from '../types.ts';
import { soundscape } from '../utils/audio.ts';

const CHEER_GIFTS: CheerGift[] = [
  {
    id: 1,
    dayNumber: 1,
    tagline: 'Day of Light',
    title: 'The Gift of Connection',
    quote: '“I will honour Christmas in my heart, and try to keep it all the year.”',
    author: 'Charles Dickens, A Christmas Carol',
    activity: 'Send an unexpected, heartfelt text or phone call to a friend you haven’t spoken to in over six months.',
    category: 'Kindness',
  },
  {
    id: 2,
    dayNumber: 2,
    tagline: 'Day of Comfort',
    title: 'The Cozy Hearth',
    quote: '“Blessed is the season which engages the whole world in a conspiracy of love.”',
    author: 'Hamilton Wright Mabie',
    activity: 'Brew a warm cup of spiced tea or cocoa, step away from screens for 15 minutes, and listen to the quiet.',
    category: 'Warmth',
  },
  {
    id: 3,
    dayNumber: 3,
    tagline: 'Day of Generosity',
    title: 'Silent Blessings',
    quote: '“Christmas is not as much about opening our presents as opening our hearts.”',
    author: 'Janice Maeditere',
    activity: 'Leave an appreciative note or extra generous tip for your mail carrier, barista, or grocery delivery person.',
    category: 'Gratitude',
  },
  {
    id: 4,
    dayNumber: 4,
    tagline: 'Day of Wonder',
    title: 'Winter Starlight',
    quote: '“Kindness is like snow—it beautifies everything it covers.”',
    author: 'Kahlil Gibran',
    activity: 'Step outside after dark to view the stars and take three slow, grounding breaths in the cold, clear air.',
    category: 'Wonder',
  },
  {
    id: 5,
    dayNumber: 5,
    tagline: 'Day of Joy',
    title: 'Shared Merriment',
    quote: '“There is nothing in the world so irresistibly contagious as laughter and good humour.”',
    author: 'Charles Dickens',
    activity: 'Share your favorite humorous family holiday memory with someone at dinner tonight.',
    category: 'Laughter',
  },
  {
    id: 6,
    dayNumber: 6,
    tagline: 'Day of Hope',
    title: 'The New Horizon',
    quote: '“And now we welcome the new year. Full of things that have never been.”',
    author: 'Rainer Maria Rilke',
    activity: 'Write down one quiet dream or hope for yourself and your loved ones in the upcoming year.',
    category: 'Reflection',
  },
];

export const DailyCheerBox: React.FC = () => {
  const [openedBoxIds, setOpenedBoxIds] = useState<number[]>([1]); // First box opened by default for immediate delight

  const toggleBox = (id: number) => {
    if (openedBoxIds.includes(id)) {
      setOpenedBoxIds(openedBoxIds.filter((item) => item !== id));
    } else {
      setOpenedBoxIds([...openedBoxIds, id]);
      soundscape.playFestiveChime();

      // Confetti burst on opening a new box
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#ffffff', '#10b981'],
      });
    }
  };

  const handleOpenAll = () => {
    setOpenedBoxIds(CHEER_GIFTS.map((g) => g.id));
    soundscape.playFestiveChime();
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.6 },
    });
  };

  const handleReset = () => {
    setOpenedBoxIds([]);
  };

  return (
    <section id="daily-cheer" className="py-16 sm:py-24 border-t border-stone-800/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <Gift className="h-4 w-4" />
              <span>Interactive Festive Calendar</span>
            </div>
            <h2 className="font-holiday text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
              The Daily Hearth: Six Days of Holiday Wonder
            </h2>
            <p className="mt-3 text-stone-400 text-base">
              Unwrap each festive door to discover an inspiring reflection, timeless literary quote, and a simple micro-act of seasonal kindness.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-stone-400 font-medium">
              Doors Unsealed:{' '}
              <span className="font-mono font-bold text-amber-300 tabular-nums">
                {openedBoxIds.length}
              </span>{' '}
              / {CHEER_GIFTS.length}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleOpenAll}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-800 text-stone-200 hover:bg-stone-700 transition-colors whitespace-nowrap"
              >
                Unwrap All
              </button>
              {openedBoxIds.length > 0 && (
                <button
                  onClick={handleReset}
                  className="p-1.5 text-xs rounded-lg text-stone-500 hover:text-stone-300 transition-colors"
                  title="Seal all doors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 6 Festive Gift Doors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHEER_GIFTS.map((gift) => {
            const isOpened = openedBoxIds.includes(gift.id);

            return (
              <motion.div
                key={gift.id}
                layout
                className={`relative overflow-hidden rounded-2xl border transition-all ${
                  isOpened
                    ? 'border-amber-500/40 bg-gradient-to-br from-stone-900 via-amber-950/20 to-stone-900 shadow-xl'
                    : 'border-stone-800 bg-stone-900/60 hover:border-stone-700 cursor-pointer shadow-md'
                }`}
              >
                {/* Wrapped State (Click to unwrap) */}
                {!isOpened ? (
                  <div
                    onClick={() => toggleBox(gift.id)}
                    className="p-6 sm:p-8 flex flex-col justify-between min-h-[260px] text-center"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-mono">Door 0{gift.dayNumber}</span>
                      <span>Tap to Unwrap</span>
                    </div>

                    <div className="my-auto py-4 flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 shadow-lg shadow-amber-900/40 mb-3"
                      >
                        <Gift className="h-8 w-8" />
                      </motion.div>
                      <h3 className="font-holiday text-2xl font-bold text-stone-200">
                        {gift.tagline}
                      </h3>
                      <p className="text-xs text-stone-400 mt-1">A mystery gift awaits inside</p>
                    </div>

                    <div className="pt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                        <Sparkles className="h-3 w-3" />
                        <span>Open Door 0{gift.dayNumber}</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Unwrapped State (Revealed message) */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-6 sm:p-8 flex flex-col justify-between min-h-[260px]"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="font-semibold text-amber-400 uppercase tracking-wider">
                          {gift.category} · Door 0{gift.dayNumber}
                        </span>
                        <button
                          onClick={() => toggleBox(gift.id)}
                          className="text-[11px] text-stone-500 hover:text-stone-300"
                        >
                          Re-seal
                        </button>
                      </div>

                      <h3 className="font-holiday text-2xl font-bold text-amber-100 mb-3">
                        {gift.title}
                      </h3>

                      <blockquote className="text-xs sm:text-sm text-stone-300 italic mb-4 border-l-2 border-amber-500/40 pl-3 leading-relaxed">
                        {gift.quote}
                        <footer className="text-[11px] not-italic text-stone-500 mt-1">
                          — {gift.author}
                        </footer>
                      </blockquote>
                    </div>

                    <div className="mt-4 pt-4 border-t border-stone-800/80 bg-stone-950/40 -mx-6 -mb-6 p-4 rounded-b-xl">
                      <div className="flex items-start gap-2 text-xs text-amber-200/90">
                        <Heart className="h-3.5 w-3.5 shrink-0 text-rose-400 mt-0.5" />
                        <div>
                          <span className="font-semibold text-stone-200">Holiday Kindness:</span>{' '}
                          <span className="text-stone-300">{gift.activity}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
