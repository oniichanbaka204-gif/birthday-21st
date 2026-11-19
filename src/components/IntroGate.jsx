import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Volume2, Sparkles, Heart } from 'lucide-react';

export default function IntroGate({ onStart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      {/* Festive luxury emerald & gold light bursts */}
      <div className="absolute w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full bg-emerald-400/25 blur-3xl pointer-events-none" />
      <div className="absolute w-60 h-60 sm:w-96 sm:h-96 rounded-full bg-yellow-400/20 blur-2xl pointer-events-none" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative max-w-md w-full bg-gradient-to-b from-[#15533e] via-[#104332] to-[#0c3326] border-2 border-emerald-400/60 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(16,185,129,0.35)] text-center flex flex-col items-center"
      >
        {/* Floating Gift Box Icon with celebration sparkles */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="relative mb-6 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-300 to-yellow-300 p-0.5 shadow-[0_0_35px_rgba(52,211,153,0.6)] flex items-center justify-center cursor-pointer"
          onClick={onStart}
        >
          <div className="w-full h-full bg-[#0e3b2c] rounded-2xl flex items-center justify-center">
            <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300 drop-shadow-[0_0_12px_#fde047]" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 text-yellow-300 w-7 h-7 animate-pulse" />
          <Heart className="absolute -bottom-1 -left-1 text-rose-400 w-5 h-5 animate-bounce" fill="currentColor" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-emerald-100 to-yellow-300 mb-2 drop-shadow-sm">
          Món Quà Sinh Nhật Tuổi 21
        </h1>

        <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
          Chào cô gái tuổi 21 xinh đẹp! Một bất ngờ âm nhạc và những kỷ niệm rực rỡ nhất đang chờ bạn khám phá. Bật loa lên nhé! ✨
        </p>

        {/* Audio notice pill */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/80 border border-emerald-400/40 text-emerald-200 text-xs mb-8 shadow-sm">
          <Volume2 size={15} className="text-yellow-300" />
          <span>Vui lòng bật âm lượng để lắng nghe giai điệu sinh nhật</span>
        </div>

        {/* Big Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-emerald-950 font-bold text-base sm:text-lg shadow-[0_0_30px_rgba(250,204,21,0.6)] hover:shadow-[0_0_45px_rgba(250,204,21,0.8)] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Khám Phá Ngay ✨</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
