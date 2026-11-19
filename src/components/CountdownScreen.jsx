import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCountdownBeep, playBirthdayFanfare } from '../utils/audioPlayer';

export default function CountdownScreen({ onComplete }) {
  const [count, setCount] = useState(10);

  useEffect(() => {
    // Play sound for initial number 10
    playCountdownBeep(10);

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          playBirthdayFanfare();
          setTimeout(() => {
            onComplete();
          }, 800);
          return 0;
        }
        playCountdownBeep(prev - 1);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#051610]/95 backdrop-blur-md px-4 overflow-hidden">
      {/* Decorative ambient rings */}
      <div className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full border border-emerald-500/20 animate-ping opacity-25 pointer-events-none" />
      <div className="absolute w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] rounded-full border border-yellow-500/20 animate-pulse pointer-events-none" />

      {/* Top message */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-emerald-300/80 font-medium tracking-widest uppercase text-xs sm:text-sm mb-6 sm:mb-8 text-center"
      >
        ✨ Đếm ngược chào đón tuổi 21 rạng rỡ ✨
      </motion.p>

      {/* Big Animated Number */}
      <div className="relative flex items-center justify-center w-48 h-48 sm:w-64 sm:h-64">
        <AnimatePresence mode="popLayout">
          {count > 0 && (
            <motion.div
              key={count}
              initial={{ scale: 0.3, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.6, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="absolute text-8xl sm:text-9xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fffbeb] via-[#fde047] to-[#ca8a04] drop-shadow-[0_0_35px_rgba(250,204,21,0.9)]"
            >
              {count}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse circular halo around number */}
        <motion.div
          key={`halo-${count}`}
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.85 }}
          className="absolute inset-0 rounded-full border-2 border-yellow-400/60 pointer-events-none"
        />
      </div>

      {/* Subtle indicator dots */}
      <div className="flex gap-2 mt-8 sm:mt-10">
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
          <div
            key={n}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              count <= n
                ? 'w-6 bg-yellow-400 shadow-[0_0_8px_#facc15]'
                : 'w-2 bg-emerald-800/60'
            }`}
          />
        ))}
      </div>

      <p className="text-emerald-400/60 text-xs sm:text-sm mt-4 font-light text-center">
        Điều kỳ diệu đang được chuẩn bị dành riêng cho bạn...
      </p>
    </div>
  );
}
