import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircleHeart, Sparkles, X, Heart } from 'lucide-react';

export default function WishesMarquee({ wishes }) {
  const [selectedWish, setSelectedWish] = useState(null);

  if (!wishes || wishes.length === 0) return null;

  // Duplicate for smooth continuous marquee
  const displayWishes = [...wishes, ...wishes, ...wishes];

  return (
    <div className="relative z-10 w-full max-w-4xl px-4 my-3 flex flex-col items-center">
      {/* Container dải băng lời chúc */}
      <div className="relative w-full overflow-hidden py-2 px-3 rounded-2xl bg-[#08241b]/80 border border-emerald-400/40 shadow-[0_4px_20px_rgba(5,150,105,0.25)] backdrop-blur-md flex items-center">
        
        {/* Badge tiêu đề */}
        <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-emerald-950 font-bold text-xs shadow-md mr-3 select-none">
          <MessageCircleHeart size={14} />
          <span className="hidden sm:inline">Lời Chúc Yêu Thương</span>
          <span className="sm:hidden">Lời chúc</span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-950/20 text-[10px]">
            {wishes.length}
          </span>
        </div>

        {/* Marquee ticker trôi ngang */}
        <div className="flex-grow overflow-hidden relative">
          <div className="flex gap-8 animate-marquee-right select-none" style={{ animationDuration: '65s' }}>
            {displayWishes.map((item, idx) => (
              <div
                key={`wish-${idx}`}
                onClick={() => setSelectedWish(item)}
                className="flex items-center gap-2 flex-shrink-0 cursor-pointer hover:text-yellow-300 transition-colors"
              >
                <span className="font-semibold text-yellow-300 text-xs sm:text-sm">
                  {item.name}:
                </span>
                <span className="text-emerald-100 text-xs sm:text-sm max-w-xs sm:max-w-md truncate">
                  "{item.wish}"
                </span>
                <span className="text-emerald-400/50 text-xs">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal chi tiết khi click vào 1 lời chúc */}
      <AnimatePresence>
        {selectedWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedWish(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="relative max-w-sm w-full bg-gradient-to-b from-[#144f3b] to-[#0c3325] border-2 border-emerald-400/60 rounded-3xl p-6 shadow-[0_0_40px_rgba(16,185,129,0.35)] text-center text-emerald-50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedWish(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-emerald-900/80 text-emerald-200 hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="w-12 h-12 rounded-full bg-yellow-400/20 text-yellow-300 mx-auto flex items-center justify-center mb-3">
                <Heart size={24} fill="currentColor" />
              </div>

              <h4 className="font-bold text-base text-yellow-200 mb-1">
                Lời chúc từ: {selectedWish.name}
              </h4>
              <p className="text-xs text-emerald-300/70 mb-4">
                {selectedWish.timestamp || 'Gửi tới cô gái tuổi 21'}
              </p>

              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-sm leading-relaxed text-emerald-100 font-medium">
                "{selectedWish.wish}"
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
