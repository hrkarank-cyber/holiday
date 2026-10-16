/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { FestiveParticles } from './components/FestiveParticles.tsx';
import { HolidayCardStudio } from './components/HolidayCardStudio.tsx';
import { FestiveMoments } from './components/FestiveMoments.tsx';
import { DailyCheerBox } from './components/DailyCheerBox.tsx';
import { SoundscapePlayer } from './components/SoundscapePlayer.tsx';
import { Footer } from './components/Footer.tsx';
import { HolidayTheme } from './types.ts';

export default function App() {
  const [theme, setTheme] = useState<HolidayTheme>('winter');
  const [particlesEnabled, setParticlesEnabled] = useState(true);

  const handleOpenCardStudio = () => {
    const el = document.getElementById('card-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getThemeBackground = () => {
    switch (theme) {
      case 'harvest':
        return 'bg-[#18120e] text-amber-50 selection:bg-amber-700 selection:text-white';
      case 'newyear':
        return 'bg-[#090c15] text-stone-100 selection:bg-yellow-600 selection:text-white';
      case 'blossom':
        return 'bg-[#121319] text-stone-100 selection:bg-rose-700 selection:text-white';
      case 'winter':
      default:
        return 'bg-stone-950 text-stone-100 selection:bg-amber-600 selection:text-white';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeBackground()} transition-colors duration-700 relative`}>
      {/* Background canvas particles (Snowflakes / Autumn leaves / Starlight / Petals) */}
      <FestiveParticles theme={theme} enabled={particlesEnabled} />

      {/* Strict 3-zone Top Bar Contract */}
      <Navbar onOpenCardStudio={handleOpenCardStudio} />

      {/* Main Content with Framer Motion animated container */}
      <motion.main
        key={theme}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-20"
      >
        <HeroSection
          currentTheme={theme}
          onThemeChange={setTheme}
          particlesEnabled={particlesEnabled}
          onToggleParticles={() => setParticlesEnabled(!particlesEnabled)}
          onOpenCardStudio={handleOpenCardStudio}
        />

        <HolidayCardStudio />

        <FestiveMoments />

        <DailyCheerBox />

        <SoundscapePlayer />
      </motion.main>

      <Footer />
    </div>
  );
}
