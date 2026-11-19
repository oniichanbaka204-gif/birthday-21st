import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MessageCircleHeart } from 'lucide-react';

export default function FloatingWishes({ wishes }) {
  const [currentWish, setCurrentWish] = useState(null);
  const [wishKey, setWishKey] = useState(0);
  const [positionStyle, setPositionStyle] = useState({
    top: '16%',
    left: '5%',
    right: 'auto',
  });

  useEffect(() => {
    if (!wishes || wishes.length === 0) return;

    let index = 0;
    // Các vị trí bay bổng thanh lịch quanh màn hình (tránh che khuất giữa trung tâm cuộn phim)
    const positions = [
      { top: '15%', left: '4%', right: 'auto', bottom: 'auto' },
      { top: '18%', left: 'auto', right: '4%', bottom: 'auto' },
      { top: '68%', left: '5%', right: 'auto', bottom: 'auto' },
      { top: '72%', left: 'auto', right: '5%', bottom: 'auto' },
      { top: '22%', left: '8%', right: 'auto', bottom: 'auto' },
      { top: '64%', left: 'auto', right: '8%', bottom: 'auto' },
    ];

    const displayNext = () => {
      const selected = wishes[index % wishes.length];
      const pos = positions[index % positions.length];
      setCurrentWish(selected);
      setPositionStyle(pos);
      setWishKey((prev) => prev + 1);
      index = (index + 1) % wishes.length;
    };

    // Khởi tạo lời chúc đầu tiên sau 1s
    const firstTimer = setTimeout(displayNext, 1000);

    // Mỗi 7.5 giây chuyển đổi sang một lời chúc mới bay bổng ở vị trí khác
    const cycleInterval = setInterval(displayNext, 7500);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(cycleInterval);
    };
  }, [wishes]);

  if (!currentWish) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`float-wish-${wishKey}-${currentWish.name}`}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{
            opacity: [0, 1, 1, 0.9, 0],
            y: [30, 0, -12, -25, -45],
            scale: [0.9, 1, 1, 1, 0.95],
          }}
          transition={{
            duration: 7,
            times: [0, 0.12, 0.5, 0.88, 1],
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: positionStyle.top,
            bottom: positionStyle.bottom,
            left: positionStyle.left,
            right: positionStyle.right,
          }}
          className="max-w-[85vw] w-max sm:max-w-sm pointer-events-auto select-none"
        >
          {/* Bong bóng lời chúc phát sáng ánh ngọc Emerald & viền vàng hoàng kim */}
          <div className="relative group px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0c3627]/95 via-[#08281d]/95 to-[#041710]/95 border border-yellow-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(250,204,21,0.25)] backdrop-blur-md flex items-start gap-2.5 sm:gap-3.5 transition-transform hover:scale-105 cursor-default">
            
            {/* Vầng hào quang nhẹ */}
            <div className="absolute -inset-1 bg-yellow-400/10 rounded-2xl sm:rounded-3xl blur-md pointer-events-none" />

            {/* Icon Avatar */}
            <div className="relative flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-300 text-emerald-950 flex items-center justify-center shadow-md mt-0.5">
              <MessageCircleHeart size={18} className="text-emerald-950" />
              <Sparkles className="absolute -top-1 -right-1 text-yellow-100 w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
            </div>

            {/* Nội dung lời chúc: hiển thị trọn vẹn, người xem không cần bấm click */}
            <div className="relative flex-grow min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-xs sm:text-sm text-yellow-200 drop-shadow-sm font-serif truncate">
                  {currentWish.name} 💚
                </span>
                <span className="text-[10px] text-emerald-300/60 font-mono whitespace-nowrap">
                  {currentWish.timestamp || 'Gửi bạn'}
                </span>
              </div>
              <p className="text-emerald-50 text-xs sm:text-sm leading-relaxed font-medium break-words">
                "{currentWish.wish}"
              </p>
            </div>

            {/* Trái tim hồng nhỏ rung rinh */}
            <div className="relative flex-shrink-0 self-center pl-1">
              <Heart size={15} className="text-rose-400 animate-pulse" fill="currentColor" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
