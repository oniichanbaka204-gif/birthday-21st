import React from 'react';
import { motion } from 'framer-motion';

export default function GlowingTitle() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center pt-8 pb-4 sm:pt-14 sm:pb-8 px-4 text-center">
      {/* Container for the Glowing Script Title */}
      <div className="relative inline-block">
        {/* Glow halo behind the text */}
        <div className="absolute inset-0 bg-amber-500/15 blur-3xl rounded-full scale-125 pointer-events-none" />

        {/* Main Title: Chúc Mừng Sinh Nhật */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="glow-gold-text text-5xl sm:text-7xl md:text-8xl tracking-wide select-none leading-tight"
        >
          Chúc Mừng Sinh Nhật
        </motion.h1>

        {/* Star Flare / Lens Flare Sparkle - positioned like the reference image on the text flourish */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="absolute -top-3 right-6 sm:-top-4 sm:right-12 pointer-events-none"
        >
          {/* Radial soft golden aura */}
          <div className="absolute -inset-4 bg-yellow-400/40 rounded-full blur-md" />
          
          {/* 4-Point Star Sparkle SVG */}
          <svg
            className="w-8 h-8 sm:w-11 sm:h-11 relative z-10 drop-shadow-[0_0_12px_#fde047]"
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Horizontal & vertical diamond ray */}
            <path
              d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z"
              fill="#ffffff"
            />
            {/* Center golden light */}
            <circle cx="50" cy="50" r="14" fill="#fde047" />
            <circle cx="50" cy="50" r="7" fill="#ffffff" />
          </svg>
        </motion.div>

        {/* Secondary mini star on the left flourish */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 0.9, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.8, delay: 0.8, ease: "easeInOut" }}
          className="absolute bottom-2 -left-4 sm:bottom-4 sm:-left-6 pointer-events-none"
        >
          <div className="absolute -inset-2 bg-amber-400/30 rounded-full blur-sm" />
          <svg
            className="w-5 h-5 sm:w-7 sm:h-7 relative z-10 drop-shadow-[0_0_8px_#fde047]"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z"
              fill="#fffbeb"
            />
          </svg>
        </motion.div>
      </div>

      {/* Elegant Subtitle with age 21 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9 }}
        className="mt-2 sm:mt-4 flex flex-col items-center gap-1.5"
      >
        <span className="text-yellow-200/90 tracking-[0.25em] sm:tracking-[0.35em] text-xs sm:text-sm font-semibold uppercase text-shadow-sm">
          TUỔI 21 RỰC RỠ & HẠNH PHÚC
        </span>
        <div className="flex items-center gap-2 mt-1">
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-yellow-400/60" />
          <span className="text-emerald-300 text-xs tracking-wider font-light">
            HAPPY 21ST BIRTHDAY
          </span>
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-yellow-400/60" />
        </div>
      </motion.div>
    </div>
  );
}
