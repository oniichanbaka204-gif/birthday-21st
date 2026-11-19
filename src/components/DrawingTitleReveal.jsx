import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function DrawingTitleReveal({ onComplete }) {
  const [isDrawn, setIsDrawn] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    // 1. Chữ viết chậm rãi, thanh thoát trong 5.5 giây (thay vì 2.2s quá nhanh)
    const drawTimer = setTimeout(() => {
      setIsDrawn(true);
      // Confetti sparkle burst when writing completes
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#facc15', '#fde047', '#34d399', '#6ee7b7', '#ffffff'],
      });
    }, 5500);

    // 2. Subtitle reveals sau khi chữ vẽ xong
    const subTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 6000);

    // 3. Tự động chuyển cảnh sau 10 giây để người xem chiêm ngưỡng trọn vẹn
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 10000);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(subTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-[#165540] via-[#104332] to-[#0c3327] px-4 overflow-hidden select-none">
      {/* Radiant celebratory emerald & gold aura */}
      <div className="absolute w-[600px] h-[350px] sm:w-[900px] sm:h-[500px] bg-gradient-to-r from-emerald-400/25 via-yellow-400/30 to-emerald-400/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] bg-teal-300/15 rounded-full blur-2xl pointer-events-none" />

      {/* Floating ambient sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-2.5 h-2.5 rounded-full bg-yellow-200 blur-xs animate-ping" />
        <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-emerald-200 blur-xs animate-pulse" />
        <div className="absolute top-1/3 right-1/6 w-2 h-2 rounded-full bg-rose-200 blur-xs animate-pulse" />
      </div>

      <div className="relative flex flex-col items-center max-w-4xl w-full text-center">
        {/* SVG Handwriting Stroke Drawing Effect - Vẽ chậm rãi, uốn lượn */}
        <div className="relative w-full flex justify-center items-center py-4">
          <svg
            viewBox="0 0 950 160"
            className="w-full max-w-[95vw] sm:max-w-[850px] h-auto overflow-visible"
          >
            <defs>
              {/* Golden Glow Filter */}
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur1" />
                <feGaussianBlur stdDeviation="12" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing stroke outline animating dashoffset chậm 5.5s */}
            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="'Dancing Script', 'Great Vibes', cursive"
              fontSize="92"
              fontWeight="700"
              fill={isDrawn ? '#fff9db' : 'transparent'}
              stroke="#ffd54f"
              strokeWidth={isDrawn ? '1.5' : '2.5'}
              strokeDasharray="1400"
              strokeDashoffset="0"
              filter="url(#goldGlow)"
              className={`transition-all duration-1200 ${
                !isDrawn ? 'animate-draw-text-slow' : 'glow-gold-text'
              }`}
            >
              Chúc Mừng Sinh Nhật
            </text>
          </svg>

          {/* Magic Sparkler Star (Left star) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isDrawn ? [0.8, 1, 0.8] : [0, 1, 1],
              scale: isDrawn ? [0.9, 1.25, 0.9] : [0.5, 1.2, 1],
            }}
            transition={{
              repeat: isDrawn ? Infinity : 0,
              duration: 2.5,
              ease: 'easeInOut',
            }}
            className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="absolute -inset-3 bg-yellow-400/50 rounded-full blur-md" />
            <svg
              className="w-6 h-6 sm:w-9 sm:h-9 relative z-10 drop-shadow-[0_0_15px_#fde047]"
              viewBox="0 0 100 100"
              fill="none"
            >
              <path
                d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z"
                fill="#ffffff"
              />
              <circle cx="50" cy="50" r="12" fill="#fde047" />
            </svg>
          </motion.div>

          {/* Magic Sparkler Star (Top Right star as in user's image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isDrawn ? [0.9, 1, 0.9] : 0,
              scale: isDrawn ? [1, 1.35, 1] : 0,
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: 'easeInOut',
            }}
            className="absolute right-4 sm:right-14 -top-1 pointer-events-none"
          >
            <div className="absolute -inset-4 bg-yellow-400/60 rounded-full blur-lg" />
            <svg
              className="w-8 h-8 sm:w-11 sm:h-11 relative z-10 drop-shadow-[0_0_18px_#fde047]"
              viewBox="0 0 100 100"
              fill="none"
            >
              <path
                d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z"
                fill="#ffffff"
              />
              <circle cx="50" cy="50" r="14" fill="#fde047" />
              <circle cx="50" cy="50" r="6" fill="#ffffff" />
            </svg>
          </motion.div>
        </div>

        {/* Subtitle exact copy from the user's reference image */}
        <AnimatePresence>
          {showSubtitle && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-2 mt-2 sm:mt-3"
            >
              <span className="text-yellow-200 font-bold tracking-[0.25em] sm:tracking-[0.35em] text-xs sm:text-base uppercase drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]">
                TUỔI 21 RỰC RỠ & HẠNH PHÚC
              </span>

              <div className="flex items-center gap-3 mt-1">
                <span className="h-[1.5px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-emerald-300 to-yellow-300" />
                <span className="text-emerald-200 font-semibold tracking-[0.2em] text-[10px] sm:text-xs uppercase drop-shadow-sm">
                  HAPPY 21ST BIRTHDAY
                </span>
                <span className="h-[1.5px] w-8 sm:w-16 bg-gradient-to-l from-transparent via-emerald-300 to-yellow-300" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip / Next Transition Button */}
        {showSubtitle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-full bg-emerald-800/80 hover:bg-emerald-700/90 border border-emerald-400/50 text-emerald-100 text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-emerald-950/50 transition-all hover:scale-105 cursor-pointer backdrop-blur-sm"
            >
              Xem Cuộn Phim Kỷ Niệm 🎬 ✨
            </button>
            <span className="text-[11px] text-emerald-200/70">
              (Tự động chuyển cảnh sau giây lát...)
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
