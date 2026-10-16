import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Send,
  Heart,
  Share2,
  Gift,
  Bell,
  Star,
  Coffee,
  Flame,
  Volume2
} from 'lucide-react';
import { GreetingCardData } from '../types.ts';
import { soundscape } from '../utils/audio.ts';

const PRESET_MESSAGES = [
  {
    title: 'Peace & Warmth',
    text: 'Wishing you peaceful mornings, merry gatherings, and the deep comfort of home this holiday season.',
  },
  {
    title: 'New Year Hopes',
    text: 'May 2026 arrive with boundless new horizons, quiet triumphs, good health, and joyful companionship.',
  },
  {
    title: 'Family & Hearth',
    text: 'Thinking of you across the miles. May your days be wrapped in warmth, love, and sweet holiday memories.',
  },
  {
    title: 'Festive Cheer',
    text: 'Here is to clinking glasses by the fireside, laughter that warms the soul, and a bright, magical winter season!',
  },
];

const STAMP_OPTIONS = [
  { id: 'wreath', label: 'Wreath', icon: Sparkles },
  { id: 'bell', label: 'Bells', icon: Bell },
  { id: 'star', label: 'Starlight', icon: Star },
  { id: 'cocoa', label: 'Cocoa', icon: Coffee },
  { id: 'candle', label: 'Candle', icon: Flame },
  { id: 'gingerbread', label: 'Gift', icon: Gift },
] as const;

export const HolidayCardStudio: React.FC = () => {
  const [cardData, setCardData] = useState<GreetingCardData>({
    recipient: 'Dearest Family & Friends',
    sender: 'With all our warmth',
    headline: 'Season’s Warmest Greetings',
    message:
      'May the peace and quiet wonder of this holiday season fill your home with laughter, fellowship, and boundless joy.',
    themeStyle: 'emerald',
    stamp: 'wreath',
  });

  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCelebrate = () => {
    // Play harmonic festive chime
    soundscape.playFestiveChime();

    // Trigger double confetti blast
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#ef4444', '#10b981', '#fbbf24', '#ffffff'],
    });
  };

  const handleCopyCard = async () => {
    const formattedText = `✨ ${cardData.headline} ✨\n\nTo: ${cardData.recipient}\n\n${cardData.message}\n\n— ${cardData.sender}\n\n[Created with Holiday Hearth]`;
    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      handleCelebrate();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getThemeClasses = (style: GreetingCardData['themeStyle']) => {
    switch (style) {
      case 'emerald':
        return {
          cardBg: 'bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950',
          border: 'border-emerald-700/60',
          accent: 'text-emerald-300',
          headline: 'text-amber-100',
          foil: 'border-amber-400/40',
        };
      case 'burgundy':
        return {
          cardBg: 'bg-gradient-to-br from-rose-950 via-stone-900 to-rose-950',
          border: 'border-rose-700/60',
          accent: 'text-rose-300',
          headline: 'text-rose-100',
          foil: 'border-rose-400/40',
        };
      case 'gold':
        return {
          cardBg: 'bg-gradient-to-br from-amber-950 via-stone-900 to-stone-950',
          border: 'border-amber-600/60',
          accent: 'text-amber-300',
          headline: 'text-amber-100',
          foil: 'border-amber-300/40',
        };
      case 'midnight':
      default:
        return {
          cardBg: 'bg-gradient-to-br from-slate-950 via-stone-900 to-indigo-950',
          border: 'border-indigo-800/60',
          accent: 'text-cyan-300',
          headline: 'text-slate-100',
          foil: 'border-sky-300/40',
        };
    }
  };

  const themeClasses = getThemeClasses(cardData.themeStyle);

  return (
    <section id="card-studio" className="py-16 sm:py-24 border-t border-stone-800/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Sparkles className="h-4 w-4" />
            <span>Interactive Wishes Studio</span>
          </div>
          <h2 className="font-holiday text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
            Craft a Bespoke Holiday Greeting Card
          </h2>
          <p className="mt-3 text-stone-400 text-base">
            Personalize your holiday message, choose exquisite seasonal palettes and stamps, and share authentic warmth with those who matter most.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Card Customization Controls (Left 6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8 backdrop-blur-sm">
              <h3 className="text-base font-semibold text-stone-200 mb-4 pb-2 border-b border-stone-800">
                1. Recipient & Title
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1.5">
                    To (Recipient):
                  </label>
                  <input
                    type="text"
                    value={cardData.recipient}
                    onChange={(e) => setCardData({ ...cardData, recipient: e.target.value })}
                    maxLength={40}
                    className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-200 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                    placeholder="e.g. Grandma Rose, The Miller Family"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1.5">
                    From (Sender):
                  </label>
                  <input
                    type="text"
                    value={cardData.sender}
                    onChange={(e) => setCardData({ ...cardData, sender: e.target.value })}
                    maxLength={40}
                    className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-200 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                    placeholder="e.g. Marcus & Sarah"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1.5">
                  Greeting Banner Headline:
                </label>
                <input
                  type="text"
                  value={cardData.headline}
                  onChange={(e) => setCardData({ ...cardData, headline: e.target.value })}
                  maxLength={50}
                  className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-200 placeholder-stone-600 focus:border-amber-500 focus:outline-none"
                  placeholder="e.g. Season's Warmest Greetings"
                />
              </div>

              {/* Message preset inspiration */}
              <div className="mt-6 pt-4 border-t border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-stone-400">
                    2. Choose or Write Your Message:
                  </label>
                  <span className="text-[11px] text-stone-500">Pick preset or customize</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {PRESET_MESSAGES.map((preset) => (
                    <button
                      key={preset.title}
                      onClick={() => setCardData({ ...cardData, message: preset.text })}
                      className="px-2.5 py-1 text-xs rounded border border-stone-700 bg-stone-950/70 text-stone-300 hover:border-amber-500/60 hover:text-amber-200 transition-colors whitespace-nowrap"
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={4}
                  value={cardData.message}
                  onChange={(e) => setCardData({ ...cardData, message: e.target.value })}
                  maxLength={280}
                  className="w-full rounded-lg border border-stone-700 bg-stone-950 p-3 text-sm text-stone-200 focus:border-amber-500 focus:outline-none leading-relaxed"
                  placeholder="Type your holiday wish here..."
                />
                <div className="text-right text-[11px] text-stone-500 mt-1">
                  {cardData.message.length} / 280 characters
                </div>
              </div>

              {/* Theme and Stamp Customization */}
              <div className="mt-6 pt-4 border-t border-stone-800">
                <label className="block text-xs font-medium text-stone-400 mb-2">
                  3. Card Palette & Finish:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {[
                    { id: 'emerald', label: 'Evergreen Pine', border: 'border-emerald-600' },
                    { id: 'burgundy', label: 'Crimson Velvet', border: 'border-rose-600' },
                    { id: 'gold', label: 'Gold Solstice', border: 'border-amber-500' },
                    { id: 'midnight', label: 'Midnight Blue', border: 'border-indigo-600' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() =>
                        setCardData({
                          ...cardData,
                          themeStyle: item.id as GreetingCardData['themeStyle'],
                        })
                      }
                      className={`p-2 rounded-lg text-xs font-medium border text-center transition-all ${
                        cardData.themeStyle === item.id
                          ? 'border-amber-400 bg-stone-800 text-white font-semibold'
                          : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <label className="block text-xs font-medium text-stone-400 mb-2">
                  4. Festive Emblem Stamp:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {STAMP_OPTIONS.map((stamp) => {
                    const Icon = stamp.icon;
                    return (
                      <button
                        key={stamp.id}
                        onClick={() =>
                          setCardData({
                            ...cardData,
                            stamp: stamp.id,
                          })
                        }
                        className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg border text-xs transition-all ${
                          cardData.stamp === stamp.id
                            ? 'border-amber-400 bg-amber-500/10 text-amber-200'
                            : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-[11px]">{stamp.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Live Card Preview & Share Actions (Right 6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* 3D Perspective Card Container */}
            <div className="w-full max-w-md perspective-[1200px] mb-6">
              <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative min-h-[460px] w-full rounded-2xl p-1 shadow-2xl transition-all"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of the Card */}
                <div
                  className={`relative flex min-h-[460px] flex-col justify-between rounded-xl p-8 border ${themeClasses.border} ${themeClasses.cardBg} shadow-inner backface-hidden`}
                >
                  {/* Decorative embossed foil frame */}
                  <div
                    className={`pointer-events-none absolute inset-3 rounded-lg border ${themeClasses.foil}`}
                  />

                  {/* Card Header Stamp */}
                  <div className="flex items-center justify-between z-10">
                    <div className="text-[11px] tracking-widest uppercase font-semibold text-stone-400">
                      Season’s Best
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/40 bg-stone-900/80 shadow-md">
                      {cardData.stamp === 'wreath' && (
                        <Sparkles className="h-5 w-5 text-amber-300" />
                      )}
                      {cardData.stamp === 'bell' && <Bell className="h-5 w-5 text-amber-300" />}
                      {cardData.stamp === 'star' && <Star className="h-5 w-5 text-amber-300" />}
                      {cardData.stamp === 'cocoa' && (
                        <Coffee className="h-5 w-5 text-amber-300" />
                      )}
                      {cardData.stamp === 'candle' && <Flame className="h-5 w-5 text-amber-300" />}
                      {cardData.stamp === 'gingerbread' && (
                        <Gift className="h-5 w-5 text-amber-300" />
                      )}
                    </div>
                  </div>

                  {/* Card Message Body */}
                  <div className="my-auto py-6 text-center z-10">
                    <div className="text-xs uppercase tracking-widest text-stone-400 mb-1">
                      For: {cardData.recipient || 'Our Friends'}
                    </div>

                    <h3
                      className={`font-holiday text-2xl sm:text-3xl font-bold tracking-tight ${themeClasses.headline} mb-4 leading-snug`}
                    >
                      {cardData.headline || 'Warm Wishes'}
                    </h3>

                    <div className="mx-auto w-16 h-px bg-amber-400/30 my-4" />

                    <p className="text-stone-300 text-sm sm:text-base leading-relaxed italic px-2">
                      “{cardData.message}”
                    </p>
                  </div>

                  {/* Card Footer Sign-off */}
                  <div className="z-10 flex items-end justify-between border-t border-stone-800/80 pt-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-stone-500">
                        Warmest Regard
                      </div>
                      <div className="font-holiday text-lg font-semibold text-amber-200">
                        {cardData.sender || 'From Our Hearth'}
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-stone-500">2026 Edition</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Action Bar */}
            <div className="w-full max-w-md flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-stone-800 bg-stone-900/60">
              <button
                onClick={handleCelebrate}
                className="flex items-center gap-2 rounded-lg bg-stone-800 px-3.5 py-2 text-xs font-semibold text-amber-300 hover:bg-stone-700 transition-colors"
                title="Celebrate with festive chime and confetti"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Celebrate</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCard}
                  className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-500 transition-all active:scale-95 shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-white" />
                      <span>Copied Wish!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Holiday Wish</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-3 text-xs text-stone-500 text-center">
              Copy to paste directly into emails, messaging apps, or festive letters.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
