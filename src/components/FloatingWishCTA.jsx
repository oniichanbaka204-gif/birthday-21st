import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Heart } from 'lucide-react';

export default function FloatingWishCTA({ onOpenWishModal }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40"
    >
      <button
        onClick={onOpenWishModal}
        className="group relative flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-emerald-950 font-bold text-xs sm:text-sm shadow-[0_0_30px_rgba(250,204,21,0.65)] hover:shadow-[0_0_40px_rgba(250,204,21,0.85)] border-2 border-yellow-200/90 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer select-none"
        title="Bấm để gửi lời chúc tới cô gái tuổi 21"
      >
        {/* Live ping dot indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
        </span>

        {/* Mail Icon */}
        <Mail size={16} className="text-emerald-950" />

        {/* Button Label */}
        <span className="tracking-wide">Gửi lời chúc 💌</span>

        {/* Sparkles Icon */}
        <Sparkles size={14} className="text-amber-900 group-hover:rotate-45 transition-transform" />

        {/* Subtle breathing outer aura */}
        <div className="absolute -inset-1 rounded-full bg-yellow-400/25 blur-sm -z-10 group-hover:bg-yellow-400/40 transition-colors pointer-events-none" />
      </button>
    </motion.div>
  );
}
