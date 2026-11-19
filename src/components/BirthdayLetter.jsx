import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, RefreshCw, FastForward } from 'lucide-react';

export default function BirthdayLetter({ onOpenWishModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [letterContent, setLetterContent] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load letter from /letter.txt
  useEffect(() => {
    fetch('/letter.txt')
      .then((res) => {
        if (!res.ok) throw new Error('Cannot load letter');
        return res.text();
      })
      .then((text) => {
        setLetterContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading letter:', err);
        // Fallback default message
        setLetterContent(
          'Chúc mừng sinh nhật tuổi 21 của cô gái tuyệt vời! Chúc bạn luôn rạng rỡ, hạnh phúc và tràn đầy năng lượng tích cực! 🎂💚'
        );
        setLoading(false);
      });
  }, []);

  // Trigger confetti and typewriter when opened
  const handleOpenLetter = () => {
    setIsOpen(true);
    setIsTyping(true);
    setDisplayedText('');

    // Confetti burst with emerald green and gold colors
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#10b981', '#34d399', '#facc15', '#fef08a', '#fb7185'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#10b981', '#facc15'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#34d399', '#fde047'],
      });
    }, 400);
  };

  // Typewriter effect
  useEffect(() => {
    if (!isOpen || !letterContent || !isTyping) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < letterContent.length) {
        setDisplayedText(letterContent.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 28); // Typing speed

    return () => clearInterval(interval);
  }, [isOpen, letterContent, isTyping]);

  const handleSkipTyping = () => {
    setIsTyping(false);
    setDisplayedText(letterContent);
  };

  return (
    <section className="relative z-10 w-full max-w-3xl px-4 my-10 sm:my-16 flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* CLOSED ENVELOPE STATE */
          <motion.div
            key="envelope"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            whileHover={{ scale: 1.03 }}
            onClick={handleOpenLetter}
            className="group relative cursor-pointer w-full max-w-md bg-gradient-to-br from-[#185c45] via-[#124836] to-[#0d3627] border-2 border-emerald-400/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_45px_rgba(52,211,153,0.35)] text-center flex flex-col items-center transition-all duration-300"
          >
            {/* Ambient glow behind envelope */}
            <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-3xl pointer-events-none" />

            {/* Wax Seal Stamp "21" */}
            <div className="relative mb-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-500 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.7)] border-2 border-yellow-100">
              <span className="font-serif font-black text-2xl sm:text-3xl text-emerald-950">
                21
              </span>
              <Sparkles className="absolute -top-1 -right-1 text-yellow-100 w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-emerald-50 flex items-center gap-2 mb-2 font-serif drop-shadow-sm">
              <Mail className="w-6 h-6 text-yellow-300" />
              Lá Thư Gửi Bạn
            </h3>

            <p className="text-emerald-100 text-xs sm:text-sm max-w-xs mb-4">
              Có một thông điệp đặc biệt đang chờ bạn mở ra nhân ngày sinh nhật tuổi 21...
            </p>

            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-emerald-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 group-hover:from-emerald-400 group-hover:to-teal-300 transition-all hover:scale-105">
              <span>Chạm để mở thư 💌</span>
            </span>
          </motion.div>
        ) : (
          /* OPENED LETTER PARCHMENT STATE */
          <motion.div
            key="letter"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative w-full bg-gradient-to-b from-[#fcfdfa] to-[#f2faf4] text-emerald-950 rounded-2xl p-6 sm:p-10 shadow-[0_0_60px_rgba(245,158,11,0.35)] border-4 border-yellow-400/80"
          >
            {/* Vintage inner border */}
            <div className="absolute inset-2 border border-emerald-700/20 rounded-xl pointer-events-none" />

            {/* Letter Header */}
            <div className="flex items-center justify-between border-b border-emerald-900/15 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                <div>
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-emerald-900">
                    Thư Chúc Mừng Sinh Nhật Tuổi 21
                  </h4>
                  <span className="text-xs text-emerald-700 font-medium">
                    Được viết từ trái tim 💚
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                {isTyping && (
                  <button
                    onClick={handleSkipTyping}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors cursor-pointer"
                    title="Hiện tất cả ngay"
                  >
                    <FastForward size={13} />
                    <span>Xem hết</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setDisplayedText('');
                    setIsTyping(true);
                  }}
                  className="p-1.5 rounded-full hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                  title="Đọc lại từ đầu"
                >
                  <RefreshCw size={15} />
                </button>
              </div>
            </div>

            {/* Letter Body with Typewriter */}
            <div className="relative min-h-[220px] font-['Plus_Jakarta_Sans',sans-serif] text-sm sm:text-base leading-relaxed text-emerald-900/90 whitespace-pre-wrap">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-2 h-4 ml-1 bg-emerald-600 animate-pulse align-middle" />
              )}
            </div>

            {/* Letter Footer */}
            <div className="mt-8 pt-4 border-t border-emerald-900/15 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-emerald-800">
              <div className="flex items-center gap-2 font-medium">
                <span>🎂 Chúc bạn một ngày sinh nhật thật hạnh phúc!</span>
              </div>
              <div className="font-serif italic font-semibold text-emerald-950">
                Tuổi 21 đáng nhớ ✨
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NÚT GỬI LỜI CHÚC NẰM Ở DƯỚI BỨC THƯ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 sm:mt-8 flex flex-col items-center gap-2"
      >
        <button
          onClick={onOpenWishModal}
          className="group relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-emerald-950 font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:shadow-[0_0_45px_rgba(250,204,21,0.7)] transition-all hover:scale-105 cursor-pointer flex items-center gap-2.5"
        >
          <Mail className="w-5 h-5 text-emerald-950" />
          <span>Gửi Lời Chúc Cho Cô Gái Tuổi 21 💌</span>
          <Sparkles className="w-4 h-4 text-emerald-900 group-hover:rotate-45 transition-transform" />
        </button>
        <span className="text-[11px] text-emerald-200/80">
          (Lời chúc của bạn sẽ xuất hiện trên màn hình cuộn phim ✨)
        </span>
      </motion.div>
    </section>
  );
}
