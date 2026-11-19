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
    <section className="relative z-10 w-full my-6 sm:my-10 flex flex-col items-center">
      {/* Film header info & control */}
      <div className="w-full max-w-5xl px-4 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <h2 className="text-sm sm:text-base font-semibold tracking-wider text-emerald-200 uppercase flex items-center gap-2">
            🎞️ Cuộn Phim Kỷ Niệm Tuổi 21
          </h2>
        </div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-500/30 text-emerald-200 text-xs transition-colors backdrop-blur-sm cursor-pointer"
          title={isPaused ? "Tiếp tục trôi" : "Tạm dừng cuộn phim"}
        >
          {isPaused ? <Play size={13} /> : <Pause size={13} />}
          <span>{isPaused ? 'Tiếp tục' : 'Tạm dừng'}</span>
        </button>
      </div>

      {/* Film Strip Container */}
      <div className="w-full overflow-hidden py-3 bg-gradient-to-b from-[#03100c]/80 via-[#071f18]/60 to-[#03100c]/80 border-y border-emerald-900/50 backdrop-blur-sm">
        
        {/* ROW 1 (Ảnh tầng trên trôi từ trái sang phải) */}
        <div className="relative mb-4 sm:mb-6">
          {/* Top Film Sprocket Holes */}
          <div className="w-full h-3 sm:h-4 flex gap-3 px-2 mb-1.5 opacity-60">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`h1-${i}`}
                className="w-3.5 h-2.5 sm:w-4 sm:h-3 rounded-xs bg-[#030d09] border border-emerald-900/50 flex-shrink-0"
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
          <div className="w-full h-3 sm:h-4 flex gap-3 px-2 mt-1.5 opacity-60">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`h2-${i}`}
                className="w-3.5 h-2.5 sm:w-4 sm:h-3 rounded-xs bg-[#030d09] border border-emerald-900/50 flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* ROW 2 (Ảnh tầng dưới trôi so le từ trái sang phải) */}
        <div className="relative">
          {/* Top Film Sprocket Holes for Row 2 */}
          <div className="w-full h-3 sm:h-4 flex gap-3 px-2 mb-1.5 opacity-60">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`h3-${i}`}
                className="w-3.5 h-2.5 sm:w-4 sm:h-3 rounded-xs bg-[#030d09] border border-emerald-900/50 flex-shrink-0"
              />
            ))}
          </div>

          <div
            className="flex gap-4 sm:gap-6 px-4 animate-marquee-right"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
              animationDuration: '52s', // slightly different tempo for dynamic feel
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
          <div className="w-full h-3 sm:h-4 flex gap-3 px-2 mt-1.5 opacity-60">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`h4-${i}`}
                className="w-3.5 h-2.5 sm:w-4 sm:h-3 rounded-xs bg-[#030d09] border border-emerald-900/50 flex-shrink-0"
              />
            ))}
          </div>
        </div>

      </div>

      <p className="text-emerald-400/60 text-xs mt-3 flex items-center gap-1.5">
        <Sparkles size={13} className="text-yellow-400" />
        Chạm vào bất kỳ ảnh nào để xem chi tiết hoặc thả tim nha!
      </p>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              className="relative max-w-lg w-full bg-[#0a231b] border-2 border-emerald-500/40 rounded-2xl p-4 shadow-[0_0_40px_rgba(16,185,129,0.3)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 transition-colors z-20 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/40 mb-3 border border-emerald-700/30">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-emerald-100 font-semibold text-base sm:text-lg">
                    {selectedPhoto.caption}
                  </h3>
                  <p className="text-emerald-400/70 text-xs sm:text-sm">
                    {selectedPhoto.date}
                  </p>
                </div>
                <button
                  onClick={(e) => toggleLike(selectedPhoto.id, e)}
                  className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                    likedPhotos[selectedPhoto.id]
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 scale-110 shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                      : 'bg-emerald-900/40 border-emerald-600/30 text-emerald-300 hover:text-rose-400'
                  }`}
                >
                  <Heart
                    size={20}
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

// Subcomponent: Individual Film Card
function FilmCard({ item, isLiked, onLike, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="group relative flex-shrink-0 w-44 sm:w-60 bg-[#061812] p-2 sm:p-2.5 rounded-lg border border-emerald-700/40 shadow-md hover:border-yellow-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(250,204,21,0.25)] cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] rounded overflow-hidden bg-emerald-950/60">
        <img
          src={item.url}
          alt={item.caption}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark gradient overlay on bottom for caption */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

        {/* Heart button */}
        <button
          onClick={onLike}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isLiked
              ? 'bg-rose-500/80 text-white scale-110 shadow-sm'
              : 'bg-black/40 text-emerald-200 hover:text-rose-300'
          }`}
        >
          <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
        </button>

        {/* Expand icon */}
        <div className="absolute bottom-2 right-2 p-1 rounded-full bg-black/40 text-emerald-200 opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 size={12} />
        </div>
      </div>

      {/* Caption under photo */}
      <div className="mt-2 px-1">
        <p className="text-emerald-100 text-xs sm:text-sm font-medium truncate">
          {item.caption}
        </p>
        <p className="text-emerald-400/60 text-[10px] sm:text-xs">
          {item.date}
        </p>
      </div>
    </div>
  );
}
