import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Volume2, Sparkles } from 'lucide-react';

export default function IntroGate({ onStart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#04120d]/95 backdrop-blur-lg px-4">
      {/* Decorative background aura */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-yellow-500/10 blur-2xl pointer-events-none" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative max-w-md w-full bg-gradient-to-b from-[#09261c] to-[#04150f] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(16,185,129,0.25)] text-center flex flex-col items-center"
      >
        {/* Floating Gift Box Icon */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="relative mb-6 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-0.5 shadow-[0_0_30px_rgba(52,211,153,0.4)] flex items-center justify-center cursor-pointer"
          onClick={onStart}
        >
          <div className="w-full h-full bg-[#072017] rounded-2xl flex items-center justify-center">
            <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 drop-shadow-[0_0_10px_#facc15]" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 text-yellow-300 w-6 h-6 animate-pulse" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-emerald-200 to-yellow-100 mb-2">
          Món Quà Sinh Nhật Tuổi 21
        </h1>

        <p className="text-emerald-300/80 text-xs sm:text-sm leading-relaxed mb-6">
          Có một bất ngờ âm thanh và hình ảnh đặc biệt được chuẩn bị dành riêng cho bạn. Hãy bật âm lượng và bắt đầu đếm ngược nhé!
        </p>

        {/* Audio notice pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-600/30 text-emerald-300 text-xs mb-8">
          <Volume2 size={14} className="text-yellow-400" />
          <span>Vui lòng bật loa hoặc đeo tai nghe để có trải nghiệm tốt nhất</span>
        </div>

        {/* Big Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-emerald-950 font-bold text-base sm:text-lg shadow-[0_0_25px_rgba(250,204,21,0.5)] hover:shadow-[0_0_35px_rgba(250,204,21,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Khám Phá Ngay ✨</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
