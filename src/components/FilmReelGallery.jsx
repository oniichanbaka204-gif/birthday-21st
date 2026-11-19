import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryPhotos } from '../data/photos';
import { Heart, Maximize2, X, Sparkles, Play, Pause, Film } from 'lucide-react';

export default function FilmReelGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState({});

  // Split photos into two rows for dual filmstrip
  const midIndex = Math.ceil(galleryPhotos.length / 2);
  const row1Photos = galleryPhotos.slice(0, midIndex);
  const row2Photos = galleryPhotos.slice(midIndex);

  // Duplicate for seamless infinite loop (2 sets loop seamlessly with 50% marquee keyframe)
  const infiniteRow1 = [...row1Photos, ...row1Photos];
  const infiniteRow2 = [...row2Photos, ...row2Photos];

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="relative z-10 w-full my-6 sm:my-8 flex flex-col items-center">
      {/* Header điều khiển cuộn phim thanh lịch */}
      <div className="w-full max-w-5xl px-4 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Film className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-pulse" />
          <h2 className="text-sm sm:text-base font-bold tracking-widest text-emerald-100 uppercase drop-shadow-sm">
            CUỘN PHIM KỶ NIỆM 35MM
          </h2>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-400/30 text-yellow-300 font-mono">
            {galleryPhotos.length} KHOẢNH KHẮC
          </span>
        </div>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-400/40 text-emerald-200 text-xs font-medium transition-all shadow-md backdrop-blur-sm cursor-pointer"
          title={isPaused ? "Tiếp tục trôi" : "Tạm dừng cuộn phim"}
        >
          {isPaused ? <Play size={13} className="text-yellow-300" /> : <Pause size={13} className="text-yellow-300" />}
          <span>{isPaused ? 'Tiếp tục' : 'Tạm dừng'}</span>
        </button>
      </div>

      {/* DẢI PHIM NHỰA 35MM CINEMATIC CAO CẤP */}
      <div className="relative w-full overflow-hidden py-4 bg-[#051912]/90 border-y border-emerald-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.4)] backdrop-blur-md">
        
        {/* Soft edge vignetting fades on left and right */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#165641] via-[#165641]/70 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#165641] via-[#165641]/70 to-transparent z-20" />

        {/* ================= HÀNG 1 (TRÔI CHẬM TỪ TRÁI SANG PHẢI) ================= */}
        <div className="relative mb-5 sm:mb-6">
          {/* Lỗ răng cưa phim 35mm phía trên kèm thông số cuộn phim vintage */}
          <div className="w-full flex items-center justify-between px-2 mb-2 select-none overflow-hidden opacity-75">
            <div className="flex gap-4 sm:gap-5">
              {Array.from({ length: 45 }).map((_, i) => (
                <div key={`h1-${i}`} className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-2.5 h-3.5 sm:w-3 sm:h-4 rounded-[2px] bg-[#020b08] border border-emerald-500/40 shadow-inner" />
                  {i % 4 === 0 && (
                    <span className="text-[9px] font-mono tracking-widest text-yellow-400/60 font-semibold">
                      PORTRA 21 • {i}A
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dải ảnh trôi cực kỳ chậm rãi (115s) */}
          <div
            className="flex gap-4 sm:gap-6 px-4 animate-marquee-right"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {infiniteRow1.map((item, idx) => (
              <FilmFrame
                key={`row1-${item.id}-${idx}`}
                item={item}
                index={idx % row1Photos.length + 1}
                isLiked={likedPhotos[item.id]}
                onLike={(e) => toggleLike(item.id, e)}
                onSelect={() => setSelectedPhoto(item)}
              />
            ))}
          </div>

          {/* Lỗ răng cưa phim 35mm phía dưới */}
          <div className="w-full flex items-center justify-between px-2 mt-2 select-none overflow-hidden opacity-75">
            <div className="flex gap-4 sm:gap-5">
              {Array.from({ length: 45 }).map((_, i) => (
                <div key={`h2-${i}`} className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-2.5 h-3.5 sm:w-3 sm:h-4 rounded-[2px] bg-[#020b08] border border-emerald-500/40 shadow-inner" />
                  {i % 4 === 2 && (
                    <span className="text-[9px] font-mono tracking-widest text-emerald-400/50">
                      SAFETY FILM 35mm
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= HÀNG 2 (TRÔI SO LE SIÊU CHẬM 125s) ================= */}
        <div className="relative">
          {/* Lỗ răng cưa phim hàng 2 phía trên */}
          <div className="w-full flex items-center justify-between px-2 mb-2 select-none overflow-hidden opacity-75">
            <div className="flex gap-4 sm:gap-5">
              {Array.from({ length: 45 }).map((_, i) => (
                <div key={`h3-${i}`} className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-2.5 h-3.5 sm:w-3 sm:h-4 rounded-[2px] bg-[#020b08] border border-emerald-500/40 shadow-inner" />
                  {i % 4 === 1 && (
                    <span className="text-[9px] font-mono tracking-widest text-yellow-400/60 font-semibold">
                      FUJI 21 • #{i + 22}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dải ảnh hàng 2 */}
          <div
            className="flex gap-4 sm:gap-6 px-4 animate-marquee-right"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
              animationDuration: '125s',
            }}
          >
            {infiniteRow2.map((item, idx) => (
              <FilmFrame
                key={`row2-${item.id}-${idx}`}
                item={item}
                index={midIndex + (idx % row2Photos.length) + 1}
                isLiked={likedPhotos[item.id]}
                onLike={(e) => toggleLike(item.id, e)}
                onSelect={() => setSelectedPhoto(item)}
              />
            ))}
          </div>

          {/* Lỗ răng cưa phim hàng 2 phía dưới */}
          <div className="w-full flex items-center justify-between px-2 mt-2 select-none overflow-hidden opacity-75">
            <div className="flex gap-4 sm:gap-5">
              {Array.from({ length: 45 }).map((_, i) => (
                <div key={`h4-${i}`} className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-2.5 h-3.5 sm:w-3 sm:h-4 rounded-[2px] bg-[#020b08] border border-emerald-500/40 shadow-inner" />
                  {i % 4 === 3 && (
                    <span className="text-[9px] font-mono tracking-widest text-emerald-400/50">
                      HAPPY 21ST
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <p className="text-emerald-200/90 font-medium text-xs mt-3 flex items-center gap-1.5 drop-shadow-sm">
        <Sparkles size={14} className="text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
        Chạm vào bất kỳ khung phim nào để xem ảnh đầy đủ không bị cắt nhé!
      </p>

      {/* LIGHTBOX MODAL PHÓNG TO 100% ẢNH KHÔNG CẮT ĐẦU */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              className="relative max-w-lg w-full max-h-[92vh] flex flex-col bg-gradient-to-b from-[#144f3b] to-[#0c3325] border-2 border-emerald-400/60 rounded-2xl p-3 sm:p-5 shadow-[0_0_50px_rgba(16,185,129,0.4)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-2.5 right-2.5 p-2 rounded-full bg-emerald-950/80 hover:bg-emerald-800 text-emerald-100 transition-colors z-30 cursor-pointer shadow-md border border-emerald-500/30"
                aria-label="Đóng"
              >
                <X size={20} />
              </button>

              <div className="relative w-full max-h-[68vh] flex items-center justify-center rounded-xl overflow-hidden bg-black/60 mb-3 border border-emerald-400/30 p-1">
                <img
                  src={selectedPhoto.url}
                  alt="Ảnh kỷ niệm tuổi 21"
                  className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-lg block"
                />
              </div>

              <div className="flex items-center justify-between px-1 pt-1">
                <div>
                  <h3 className="text-emerald-50 font-bold text-sm sm:text-base">
                    Khoảnh khắc tuổi 21 rạng rỡ ✨
                  </h3>
                  <p className="text-emerald-200/80 text-xs mt-0.5">
                    Happy 21st Birthday
                  </p>
                </div>
                <button
                  onClick={(e) => toggleLike(selectedPhoto.id, e)}
                  className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                    likedPhotos[selectedPhoto.id]
                      ? 'bg-rose-500/30 border-rose-400 text-rose-300 scale-110 shadow-[0_0_20px_rgba(244,63,94,0.6)]'
                      : 'bg-emerald-900/50 border-emerald-500/40 text-emerald-200 hover:text-rose-300'
                  }`}
                  aria-label="Thả tim"
                >
                  <Heart
                    size={22}
                    fill={likedPhotos[selectedPhoto.id] ? 'currentColor' : 'none'}
                  />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Subcomponent: Khung phim 35mm chân thực (Không còn hộp chữ rườm rà)
function FilmFrame({ item, index, isLiked, onLike, onSelect }) {
  // Pad frame number: 01, 02, 03...
  const frameNum = String(index).padStart(2, '0');

  return (
    <div
      onClick={onSelect}
      className="group relative flex-shrink-0 w-32 sm:w-44 bg-[#081f18] p-1.5 sm:p-2 rounded-md border border-emerald-500/40 shadow-lg hover:border-yellow-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] cursor-pointer select-none"
    >
      {/* Top Film Frame Stamp Header */}
      <div className="flex items-center justify-between px-1 pb-1 text-[9px] font-mono text-emerald-300/70">
        <span className="font-semibold text-yellow-300/80">#{frameNum}</span>
        <span className="tracking-widest">21A</span>
      </div>

      {/* Khung ảnh 3:4 chân dung tự nhiên */}
      <div className="relative w-full aspect-[3/4] rounded overflow-hidden bg-black">
        <img
          src={item.thumb || item.url}
          alt={`Kỷ niệm ${frameNum}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            if (e.currentTarget.src !== item.url) {
              e.currentTarget.src = item.url;
            }
          }}
        />

        {/* Vintage Camera Amber Date Stamp in the bottom-right corner */}
        <div className="absolute bottom-1 right-1.5 text-[9px] font-mono font-bold text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] opacity-85 tracking-tighter">
          '26 11
        </div>

        {/* Floating Heart Button on Hover */}
        <button
          onClick={onLike}
          className={`absolute top-1.5 right-1.5 p-1 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isLiked
              ? 'bg-rose-500/90 text-white scale-110 shadow-sm'
              : 'bg-black/50 text-white/80 opacity-0 group-hover:opacity-100 hover:text-rose-300'
          }`}
          aria-label="Thả tim"
        >
          <Heart size={12} fill={isLiked ? 'currentColor' : 'none'} />
        </button>

        {/* Expand icon on hover */}
        <div className="absolute bottom-1 left-1.5 p-1 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow">
          <Maximize2 size={11} />
        </div>
      </div>
    </div>
  );
}
