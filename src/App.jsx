import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroGate from './components/IntroGate';
import CountdownScreen from './components/CountdownScreen';
import DrawingTitleReveal from './components/DrawingTitleReveal';
import FilmReelGallery from './components/FilmReelGallery';
import BirthdayLetter from './components/BirthdayLetter';
import PeekABooChicken from './components/PeekABooChicken';
import HeartParticles from './components/HeartParticles';
import AudioControls from './components/AudioControls';
import FloatingWishes from './components/FloatingWishes';
import FloatingWishCTA from './components/FloatingWishCTA';
import WishModal from './components/WishModal';
import { GOOGLE_SCRIPT_URL, initialWishes } from './config/wishesConfig';
import { Heart } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState('intro');
  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('birthday_wishes_saved');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.log('Error reading cached wishes:', e);
    }
    return initialWishes;
  });
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);

  // Tải danh sách lời chúc từ Google Sheets (nếu đã cài đặt URL)
  useEffect(() => {
    if (GOOGLE_SCRIPT_URL) {
      fetch(GOOGLE_SCRIPT_URL)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setWishes(data);
            try {
              localStorage.setItem('birthday_wishes_saved', JSON.stringify(data));
            } catch (e) {}
          }
        })
        .catch((err) => {
          console.log("Google Sheets sync pending:", err);
        });
    }
  }, []);

  const handleStart = () => {
    setStage('countdown');
  };

  const handleCountdownComplete = () => {
    setStage('drawing_title');
  };

  const handleTitleComplete = () => {
    setStage('film_showcase');
  };

  const handleRestart = () => {
    setStage('intro');
  };

  const handleAddWish = (newWish) => {
    setWishes((prev) => {
      const updated = [newWish, ...prev];
      try {
        localStorage.setItem('birthday_wishes_saved', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#165641] via-[#114433] to-[#0c3327] text-emerald-50 selection:bg-emerald-400 selection:text-emerald-950 flex flex-col items-center justify-center overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Luxurious ambient festive light ribbons */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[550px] bg-gradient-to-b from-emerald-400/25 via-teal-400/15 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-t from-emerald-500/20 via-yellow-400/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      {/* Dynamic Background Glowing Hearts, Sparkles & Soft Fairy Light Bokeh */}
      <HeartParticles />

      {/* Floating Audio & Restart Controls */}
      {stage !== 'intro' && <AudioControls onRestart={handleRestart} />}

      {/* GIAI ĐOẠN 1: MÀN HÌNH MỞ ĐẦU (INTRO) */}
      <AnimatePresence>
        {stage === 'intro' && <IntroGate onStart={handleStart} />}
      </AnimatePresence>

      {/* GIAI ĐOẠN 2: ĐẾM NGƯỢC 10 -> 1 */}
      <AnimatePresence>
        {stage === 'countdown' && (
          <CountdownScreen onComplete={handleCountdownComplete} />
        )}
      </AnimatePresence>

      {/* GIAI ĐOẠN 3: VẼ CHỮ "CHÚC MỪNG SINH NHẬT" RỰC SÁNG Ở GIỮA MÀN HÌNH */}
      <AnimatePresence>
        {stage === 'drawing_title' && (
          <DrawingTitleReveal onComplete={handleTitleComplete} />
        )}
      </AnimatePresence>

      {/* GIAI ĐOẠN 4: CHUYỂN CẢNH SANG CUỘN PHIM & LỜI CHÚC Ở CHÍNH GIỮA MÀN HÌNH */}
      {stage === 'film_showcase' && (
        <motion.div
          key="film_showcase"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center py-6 sm:py-10"
        >
          {/* Header nhỏ gọn giữ ánh vàng sinh nhật */}
          <div className="text-center pt-2 pb-2 px-4">
            <h1 className="glow-gold-text text-3xl sm:text-5xl tracking-wide select-none drop-shadow-lg">
              Chúc Mừng Sinh Nhật
            </h1>
            <p className="text-yellow-200 text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold mt-1 drop-shadow-sm">
              Tuổi 21 Rực Rỡ & Hạnh Phúc ✨
            </p>
          </div>

          {/* LỜI CHÚC BAY BỔNG ẨN HIỆN TRÊN MÀN HÌNH (CHỈ HIỆN KHI CÓ NGƯỜI NHẬP) */}
          <FloatingWishes wishes={wishes} />

          {/* NÚT NỔI CỐ ĐỊNH "GỬI LỜI CHÚC" TRÊN MOBILE & DESKTOP (KHÔNG LO BỊ BỎ SÓT) */}
          <FloatingWishCTA onOpenWishModal={() => setIsWishModalOpen(true)} />

          {/* CUỘN PHIM Ở CHÍNH GIỮA MÀN HÌNH */}
          <div className="w-full my-auto flex flex-col items-center justify-center">
            <FilmReelGallery />
          </div>

          {/* BỨC THƯ SINH NHẬT + NÚT GỬI LỜI CHÚC NẰM Ở DƯỚI BỨC THƯ */}
          <div className="w-full flex justify-center pb-8">
            <BirthdayLetter onOpenWishModal={() => setIsWishModalOpen(true)} />
          </div>

          {/* CHÚ GÀ MASCOT LẤP LÓ */}
          <PeekABooChicken />

          {/* Footer */}
          <footer className="w-full py-4 text-center text-xs text-emerald-200/70 font-medium flex items-center justify-center gap-1.5 z-10 drop-shadow-sm">
            <span>Dành tặng tuổi 21 tuyệt đẹp</span>
            <Heart size={13} className="text-rose-400 inline" fill="currentColor" />
            <span>Mãi luôn rạng rỡ nhé</span>
          </footer>
        </motion.div>
      )}

      {/* POPUP MODAL VIẾT VÀ GỬI LỜI CHÚC */}
      <WishModal
        isOpen={isWishModalOpen}
        onClose={() => setIsWishModalOpen(false)}
        onAddWish={handleAddWish}
      />
    </div>
  );
}
