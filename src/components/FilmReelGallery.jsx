import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryPhotos } from '../data/photos';
import { Heart, Maximize2, X, Sparkles, Play, Pause } from 'lucide-react';

export default function FilmReelGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState({});

  // Split photos into two rows for dual filmstrip
  const midIndex = Math.ceil(galleryPhotos.length / 2);
  const row1Photos = galleryPhotos.slice(0, midIndex);
  const row2Photos = galleryPhotos.slice(midIndex);

  // Duplicate for seamless infinite loop
  const infiniteRow1 = [...row1Photos, ...row1Photos, ...row1Photos];
  const infiniteRow2 = [...row2Photos, ...row2Photos, ...row2Photos];

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="relative z-10 w-full my-6 sm:my-8 flex flex-col items-center">
      {/* Film header info & control */}
      <div className="w-full max-w-5xl px-4 flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
          <h2 className="text-sm sm:text-base font-bold tracking-wider text-emerald-100 uppercase flex items-center gap-2 drop-shadow-sm">
            🎞️ Cuộn Phim Kỷ Niệm Tuổi 21
          </h2>
        </div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-400/50 text-emerald-100 text-xs font-medium transition-all shadow-md backdrop-blur-sm cursor-pointer"
          title={isPaused ? "Tiếp tục trôi" : "Tạm dừng cuộn phim"}
        >
          {isPaused ? <Play size={13} /> : <Pause size={13} />}
          <span>{isPaused ? 'Tiếp tục' : 'Tạm dừng'}</span>
        </button>
      </div>

      {/* Luxury Film Strip Container */}
      <div className="w-full overflow-hidden py-3 bg-gradient-to-b from-[#0e3b2b]/90 via-[#15533d]/80 to-[#0e3b2b]/90 border-y-2 border-emerald-400/40 backdrop-blur-md shadow-[0_10px_35px_rgba(5,150,105,0.3)]">
        
        {/* ROW 1 (Ảnh tầng trên trôi từ trái sang phải) */}
        <div className="relative mb-4 sm:mb-6">
          {/* Top Film Sprocket Holes */}
          <div className="w-full h-3 sm:h-4 flex gap-3 px-2 mb-2 opacity-80">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`h1-${i}`}
                className="w-3.5 h-2.5 sm:w-4 sm:h-3 rounded-xs bg-[#0b2b1f] border border-emerald-400/40 flex-shrink-0 shadow-inner"
              />
            ))}
          </div>

          <div
            className="flex gap-4 sm:gap-6 px-4 animate-marquee-right"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {infiniteRow1.map((item, idx) => (
              <FilmCard
                key={`row1-${item.id}-${idx}`}
                item={item}
                isLiked={likedPhotos[item.id]}
                onLike={(e) => toggleLike(item.id, e)}
                onSelect={() => setSelectedPhoto(item)}
              />
            ))}
          </div>

          {/* Bottom Film Sprocket Holes for Row 1 */}
          <div className="w-full h-3 sm:h-4 flex gap-3 px-2 mt-2 opacity-80">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`h2-${i}`}
                className="w-3.5 h-2.5 sm:w-4 sm:h-3 rounded-xs bg-[#0b2b1f] border border-emerald-400/40 flex-shrink-0 shadow-inner"
              />
            ))}
          </div>
        </div>

        {/* ROW 2 (Ảnh tầng dưới trôi so le từ trái sang phải) */}
        <div className="relative">
          {/* Top Film Sprocket Holes for Row 2 */}
          <div className="w-full h-3 sm:h-4 flex gap-3 px-2 mb-2 opacity-80">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`h3-${i}`}
                className="w-3.5 h-2.5 sm:w-4 sm:h-3 rounded-xs bg-[#0b2b1f] border border-emerald-400/40 flex-shrink-0 shadow-inner"
              />
            ))}
          </div>

          <div
            className="flex gap-4 sm:gap-6 px-4 animate-marquee-right"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
              animationDuration: '52s',
            }}
          >
            {infiniteRow2.map((item, idx) => (
              <FilmCard
                key={`row2-${item.id}-${idx}`}
                item={item}
                isLiked={likedPhotos[item.id]}
                onLike={(e) => toggleLike(item.id, e)}
                onSelect={() => setSelectedPhoto(item)}
              />
            ))}
          </div>

          {/* Bottom Film Sprocket Holes for Row 2 */}
          <div className="w-full h-3 sm:h-4 flex gap-3 px-2 mt-2 opacity-80">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`h4-${i}`}
                className="w-3.5 h-2.5 sm:w-4 sm:h-3 rounded-xs bg-[#0b2b1f] border border-emerald-400/40 flex-shrink-0 shadow-inner"
              />
            ))}
          </div>
        </div>

      </div>

      <p className="text-emerald-100 font-medium text-xs mt-3 flex items-center gap-1.5 drop-shadow-sm">
        <Sparkles size={14} className="text-yellow-300 animate-spin" style={{ animationDuration: '5s' }} />
        Chạm vào ảnh bất kỳ để phóng to hoặc thả tim nhé!
      </p>

      {/* Lightbox Modal - Tối ưu hiển thị trọn vẹn 100% ảnh không bị cắt đầu/mặt */}
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
              {/* Nút đóng to dễ chạm */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-2.5 right-2.5 p-2 rounded-full bg-emerald-950/80 hover:bg-emerald-800 text-emerald-100 transition-colors z-30 cursor-pointer shadow-md border border-emerald-500/30"
                aria-label="Đóng ảnh"
              >
                <X size={20} />
              </button>

              {/* Khung ảnh co dãn linh hoạt hiển thị TOÀN BỘ khuôn mặt và thân hình */}
              <div className="relative w-full max-h-[68vh] flex items-center justify-center rounded-xl overflow-hidden bg-black/60 mb-3 border border-emerald-400/30 p-1">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-lg block"
                />
              </div>

              {/* Thanh thông tin dưới ảnh */}
              <div className="flex items-center justify-between px-1 pt-1">
                <div className="pr-3">
                  <h3 className="text-emerald-50 font-bold text-sm sm:text-base leading-snug">
                    {selectedPhoto.caption}
                  </h3>
                  <p className="text-emerald-200/80 text-xs mt-0.5">
                    {selectedPhoto.date}
                  </p>
                </div>
                <button
                  onClick={(e) => toggleLike(selectedPhoto.id, e)}
                  className={`p-2.5 rounded-full border transition-all cursor-pointer flex-shrink-0 ${
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

// Subcomponent: Individual Film Card - Tối ưu tỷ lệ 3:4 chân dung để không bị cắt mặt
function FilmCard({ item, isLiked, onLike, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="group relative flex-shrink-0 w-36 sm:w-48 bg-gradient-to-b from-[#134a36] to-[#0c3225] p-2 sm:p-2.5 rounded-xl border border-emerald-400/50 shadow-md hover:border-yellow-300 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(250,204,21,0.35)] cursor-pointer"
    >
      {/* Tỷ lệ 3:4 chuẩn ảnh dọc chân dung + object-top ưu tiên khuôn mặt */}
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-emerald-950/80">
        <img
          src={item.url}
          alt={item.caption}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

        {/* Heart button */}
        <button
          onClick={onLike}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isLiked
              ? 'bg-rose-500/90 text-white scale-110 shadow-md'
              : 'bg-black/50 text-emerald-100 hover:text-rose-300'
          }`}
          aria-label="Thả tim"
        >
          <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
        </button>

        {/* Expand icon */}
        <div className="absolute bottom-2 right-2 p-1 rounded-full bg-black/40 text-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 size={12} />
        </div>
      </div>

      {/* Caption under photo */}
      <div className="mt-2 px-1">
        <p className="text-emerald-50 text-xs sm:text-sm font-semibold truncate">
          {item.caption}
        </p>
        <p className="text-emerald-200/80 text-[10px] sm:text-xs">
          {item.date}
        </p>
      </div>
    </div>
  );
}
