import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Flame, Bell, Sparkles } from 'lucide-react';
import { soundscape } from '../utils/audio.ts';

export const SoundscapePlayer: React.FC = () => {
  const [isPlayingFire, setIsPlayingFire] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);

  const toggleFireplace = () => {
    const nextState = !isPlayingFire;
    setIsPlayingFire(nextState);
    soundscape.toggleFireplace(nextState);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (isMuted && newVol > 0) setIsMuted(false);
    soundscape.setVolume(isMuted ? 0 : newVol);
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundscape.setVolume(nextMute ? 0 : volume);
  };

  const playChime = () => {
    soundscape.playFestiveChime();
  };

  return (
    <section id="soundscape" className="py-16 sm:py-20 border-t border-stone-800/80 bg-stone-950/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-800 bg-gradient-to-r from-stone-900 via-stone-900/80 to-amber-950/20 p-6 sm:p-10 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left info column */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                <Flame className="h-4 w-4" />
                <span>Procedural Ambient Soundscape</span>
              </div>
              <h2 className="font-holiday text-3xl sm:text-4xl font-bold text-stone-100 mb-3">
                Cozy Fireside Parlor Audio
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed max-w-xl">
                Synthesized directly inside your browser with the Web Audio API. Turn on the gentle warmth of crackling birch logs or test harmonic holiday chime bells to set an authentic cozy mood.
              </p>

              {/* Status and visualizer */}
              <div className="mt-5 flex items-center gap-4">
                <div className="flex items-center gap-1.5 h-6">
                  {[0.4, 0.8, 0.5, 1, 0.6, 0.9, 0.3].map((val, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full bg-amber-500 transition-all duration-300 ${
                        isPlayingFire && !isMuted ? 'animate-pulse' : 'opacity-20 h-1.5'
                      }`}
                      style={{
                        height: isPlayingFire && !isMuted ? `${val * 24}px` : '4px',
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-stone-400">
                  {isPlayingFire
                    ? isMuted
                      ? 'Soundscape Muted'
                      : 'Hearthfire Active & Crackling'
                    : 'Soundscape Inactive (Click to Ignite)'}
                </span>
              </div>
            </div>

            {/* Right controls column */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-4 justify-end">
              {/* Hearth toggle button */}
              <button
                onClick={toggleFireplace}
                className={`flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all shadow-md active:scale-95 whitespace-nowrap ${
                  isPlayingFire
                    ? 'bg-amber-600 text-white hover:bg-amber-500'
                    : 'bg-stone-800 text-stone-200 hover:bg-stone-700 border border-stone-700'
                }`}
              >
                <Flame className={`h-4 w-4 ${isPlayingFire ? 'text-amber-200' : 'text-stone-400'}`} />
                <span>{isPlayingFire ? 'Extinguish Hearth' : 'Ignite Hearthfire'}</span>
              </button>

              {/* Chime bell test button */}
              <button
                onClick={playChime}
                className="flex items-center gap-2 rounded-xl bg-stone-900 border border-stone-700 px-4 py-3 text-sm font-medium text-amber-200 hover:border-amber-500/50 hover:bg-stone-800 transition-all active:scale-95 whitespace-nowrap"
                title="Play harmonic bells"
              >
                <Bell className="h-4 w-4 text-amber-400" />
                <span>Ring Chimes</span>
              </button>

              {/* Volume & mute */}
              <div className="flex items-center gap-2 bg-stone-900/90 rounded-xl px-3 py-2 border border-stone-800">
                <button
                  onClick={toggleMute}
                  className="p-1 text-stone-400 hover:text-stone-200 transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-4 w-4 text-rose-400" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-amber-400" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-16 accent-amber-500 cursor-pointer"
                  aria-label="Volume slider"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
