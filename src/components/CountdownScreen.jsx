import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCountdownBeep, playBirthdayFanfare } from '../utils/audioPlayer';

export default function CountdownScreen({ onComplete }) {
  const [count, setCount] = useState(10);

  useEffect(() => {
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
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-[#165540]/95 via-[#104332]/95 to-[#0b2f23]/98 backdrop-blur-md px-4 overflow-hidden">
      {/* Decorative luxury rings */}
      <div className="absolute w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full border border-emerald-400/30 animate-ping opacity-30 pointer-events-none" />
      <div className="absolute w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] rounded-full border-2 border-yellow-300/30 animate-pulse pointer-events-none" />
      <div className="absolute w-72 h-72 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />

      {/* Top message */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-emerald-200 font-semibold tracking-widest uppercase text-xs sm:text-sm mb-6 sm:mb-8 text-center drop-shadow-sm flex items-center gap-2"
      >
        <span>✨</span> Đếm ngược chào đón tuổi 21 rạng rỡ <span>✨</span>
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
              className="absolute text-8xl sm:text-9xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#fffbeb] via-[#fde047] to-[#eab308] drop-shadow-[0_0_40px_rgba(250,204,21,0.95)]"
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
          className="absolute inset-0 rounded-full border-2 border-yellow-300/70 pointer-events-none"
        />
      </div>

      {/* Subtle indicator dots */}
      <div className="flex gap-2 mt-8 sm:mt-10">
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
          <div
            key={n}
            className={`h-2 rounded-full transition-all duration-300 ${
              count <= n
                ? 'w-7 bg-yellow-300 shadow-[0_0_12px_#fde047]'
                : 'w-2.5 bg-emerald-700/60'
            }`}
          />
        ))}
      </div>

      <p className="text-emerald-200/80 text-xs sm:text-sm mt-5 font-medium text-center">
        Điều tuyệt vời nhất đang chuẩn bị bừng sáng...
      </p>
    </div>
  );
}
