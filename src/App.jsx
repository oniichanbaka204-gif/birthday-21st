import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroGate from './components/IntroGate';
import CountdownScreen from './components/CountdownScreen';
import GlowingTitle from './components/GlowingTitle';
import FilmReelGallery from './components/FilmReelGallery';
import BirthdayLetter from './components/BirthdayLetter';
import PeekABooChicken from './components/PeekABooChicken';
import HeartParticles from './components/HeartParticles';
import AudioControls from './components/AudioControls';
import { startSong, pauseSong } from './utils/audioPlayer';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  // Stages: 'intro' -> 'countdown' -> 'main'
  const [stage, setStage] = useState('intro');

  const handleStart = () => {
    // Start background music/song
    startSong();
    setStage('countdown');
  };

  const handleCountdownComplete = () => {
    setStage('main');
  };

  const handleRestart = () => {
    setStage('intro');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#061a14] text-emerald-50 selection:bg-emerald-500 selection:text-white flex flex-col items-center justify-between overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Dynamic Background Glowing Hearts & Sparkles */}
      <HeartParticles />

      {/* Floating Audio & Restart Controls (visible in main stage) */}
      {stage === 'main' && <AudioControls onRestart={handleRestart} />}

      {/* STAGE 1: INTRO GATE */}
      <AnimatePresence>
        {stage === 'intro' && <IntroGate onStart={handleStart} />}
      </AnimatePresence>

      {/* STAGE 2: COUNTDOWN 10 -> 1 */}
      <AnimatePresence>
        {stage === 'countdown' && (
          <CountdownScreen onComplete={handleCountdownComplete} />
        )}
      </AnimatePresence>

      {/* STAGE 3: MAIN SHOWCASE */}
      {stage === 'main' && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 w-full flex flex-col items-center flex-grow"
        >
          {/* Golden Neon Glow Title */}
          <GlowingTitle />

          {/* Dual-tier Horizontal Film Reel Gallery */}
          <FilmReelGallery />

          {/* Birthday Letter linked to /letter.txt */}
          <BirthdayLetter />

          {/* Peek-a-boo Animated Mascot Chicken */}
          <PeekABooChicken />

          {/* Heartwarming Footer */}
          <footer className="w-full py-6 mt-auto text-center border-t border-emerald-900/30 text-xs text-emerald-400/60 flex items-center justify-center gap-1.5 z-10">
            <span>Thiết kế đặc biệt chúc mừng sinh nhật tuổi 21</span>
            <Heart size={12} className="text-rose-400 inline" fill="currentColor" />
            <span>Mãi luôn tỏa sáng</span>
          </footer>
        </motion.main>
      )}
    </div>
  );
}
