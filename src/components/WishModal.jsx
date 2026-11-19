import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Heart, Sparkles, MessageCircleHeart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GOOGLE_SCRIPT_URL } from '../config/wishesConfig';

export default function WishModal({ isOpen, onClose, onAddWish }) {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) return;

    setIsSubmitting(true);

    const newWish = {
      name: name.trim(),
      wish: wish.trim(),
      timestamp: 'Vừa xong',
    };

    try {
      if (GOOGLE_SCRIPT_URL) {
        // Gửi tới Google Apps Script (sử dụng text/plain để tránh preflight CORS phức tạp)
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(newWish),
        });
      }

      // Cập nhật lên màn hình ngay lập tức
      onAddWish(newWish);
      setIsSuccess(true);

      confetti({
        particleCount: 70,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#facc15', '#f472b6'],
      });

      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setWish('');
        onClose();
      }, 1800);
    } catch (error) {
      console.error('Error submitting wish:', error);
      // Vẫn thêm vào giao diện người dùng
      onAddWish(newWish);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setWish('');
        onClose();
      }, 1800);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative max-w-md w-full bg-gradient-to-b from-[#15533e] via-[#104332] to-[#0c3326] border-2 border-emerald-400/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.4)] text-emerald-50"
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950/70 hover:bg-emerald-900 text-emerald-200 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-emerald-950 shadow-md">
                <MessageCircleHeart size={22} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-yellow-100">
                  Gửi Lời Chúc Tới Cô Gái
                </h3>
                <p className="text-xs text-emerald-200/80">
                  Lời chúc của bạn sẽ xuất hiện trên cuộn phim kỷ niệm ✨
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">
                  Tên hoặc biệt danh của bạn:
                </label>
                <input
                  type="text"
                  required
                  maxLength={40}
                  placeholder="Ví dụ: Lan Anh, Tuấn, Người bạn giấu tên..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-400/40 text-emerald-100 placeholder-emerald-500/60 text-sm focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">
                  Lời chúc sinh nhật tuổi 21:
                </label>
                <textarea
                  required
                  rows={4}
                  maxLength={250}
                  placeholder="Viết những lời chúc chân thành, ấm áp nhất dành tặng bạn ấy..."
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-400/40 text-emerald-100 placeholder-emerald-500/60 text-sm focus:outline-none focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300 transition-all resize-none"
                />
                <span className="block text-right text-[11px] text-emerald-400/60 mt-1">
                  {wish.length}/250 ký tự
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-emerald-950 font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(250,204,21,0.5)] hover:shadow-[0_0_35px_rgba(250,204,21,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Đang gửi lời chúc...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Gửi Lời Chúc Ngay 🚀</span>
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-400/20 text-yellow-300 flex items-center justify-center mb-3">
              <Sparkles size={32} />
            </div>
            <h4 className="text-xl font-bold text-yellow-200 mb-1">
              Cảm ơn bạn rất nhiều! 💚
            </h4>
            <p className="text-sm text-emerald-200">
              Lời chúc ngọt ngào của bạn đã được gửi tới cô gái tuổi 21!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
