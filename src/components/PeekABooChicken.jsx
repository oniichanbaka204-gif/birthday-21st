import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PeekABooChicken() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState('bottom-right'); // 'bottom-left' or 'bottom-right'
  const [speech, setSpeech] = useState('');
  const [clicked, setClicked] = useState(false);

  const speechLines = [
    "Chúc mừng tuổi 21 rực rỡ nha! 🎂",
    "Gà con chúc bạn luôn mỉm cười! 🐥✨",
    "Tuổi mới xinh đẹp & an yên nhé! 💚",
    "Luôn tỏa sáng như ánh sao! 🌟",
    "Cục ta cục tác... Happy Birthday! 🎈"
  ];

  useEffect(() => {
    // Routine for peeking in and out
    const interval = setInterval(() => {
      // Pick random side
      setPosition(Math.random() > 0.5 ? 'bottom-right' : 'bottom-left');
      setIsVisible(true);

      // Hide after 5 seconds
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
        setSpeech('');
        setClicked(false);
      }, 5500);

      return () => clearTimeout(hideTimeout);
    }, 11000);

    // Initial show after 4 seconds
    const firstShow = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(firstShow);
    };
  }, []);

  const handleClick = () => {
    setClicked(true);
    const randomLine = speechLines[Math.floor(Math.random() * speechLines.length)];
    setSpeech(randomLine);
  };

  const isLeft = position === 'bottom-left';

  return (
    <div
      className={`fixed bottom-0 z-30 pointer-events-auto select-none transition-all duration-700 ${
        isLeft ? 'left-3 sm:left-8' : 'right-3 sm:right-8'
      }`}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', damping: 14, stiffness: 120 }}
            className="relative flex flex-col items-center cursor-pointer group"
            onClick={handleClick}
          >
            {/* Speech bubble */}
            <AnimatePresence>
              {(speech || clicked) && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: -10 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="bg-emerald-950/90 text-emerald-200 border border-emerald-500/40 text-xs sm:text-sm px-3 py-1.5 rounded-2xl shadow-lg backdrop-blur-md whitespace-nowrap mb-1 flex items-center gap-1.5"
                >
                  <span>{speech || "Cục ta cục tác! Chúc mừng sinh nhật! 🐥🎂"}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cute Chick SVG */}
            <motion.div
              animate={clicked ? { y: [-15, 0], scale: [1.1, 1] } : { y: [0, -4, 0] }}
              transition={{ repeat: clicked ? 2 : Infinity, duration: clicked ? 0.4 : 2 }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_8px_16px_rgba(250,204,21,0.35)]"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                {/* Party Hat */}
                <polygon
                  points="50,5 38,32 62,32"
                  fill="#10b981"
                  stroke="#fbbf24"
                  strokeWidth="2"
                />
                <circle cx="50" cy="5" r="4.5" fill="#fde047" className="animate-pulse" />
                <line x1="42" y1="18" x2="58" y2="18" stroke="#fde047" strokeWidth="2" />
                <line x1="45" y1="25" x2="55" y2="25" stroke="#fde047" strokeWidth="2" />

                {/* Chick Body */}
                <ellipse cx="50" cy="62" rx="34" ry="30" fill="#facc15" />
                
                {/* Cheeks */}
                <circle cx="30" cy="64" r="5" fill="#fb7185" opacity="0.6" />
                <circle cx="70" cy="64" r="5" fill="#fb7185" opacity="0.6" />

                {/* Big sparkling eyes */}
                <circle cx="36" cy="54" r="5" fill="#1e293b" />
                <circle cx="34.5" cy="52" r="2" fill="#ffffff" />
                <circle cx="64" cy="54" r="5" fill="#1e293b" />
                <circle cx="62.5" cy="52" r="2" fill="#ffffff" />

                {/* Cute Beak */}
                <polygon points="50,56 43,65 57,65" fill="#f97316" />

                {/* Little Wings */}
                <motion.ellipse
                  cx="20"
                  cy="66"
                  rx="6"
                  ry="12"
                  fill="#eab308"
                  transform="rotate(20 20 66)"
                  animate={{ rotate: [20, 35, 20] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                />
                <motion.ellipse
                  cx="80"
                  cy="66"
                  rx="6"
                  ry="12"
                  fill="#eab308"
                  transform="rotate(-20 80 66)"
                  animate={{ rotate: [-20, -35, -20] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                />

                {/* Tiny little sprout or feather on top */}
                <path
                  d="M48,30 C45,20 40,24 45,18"
                  stroke="#facc15"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
