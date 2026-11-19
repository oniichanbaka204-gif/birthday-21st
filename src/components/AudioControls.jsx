import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Heart } from 'lucide-react';
import { pauseSong, resumeSong } from '../utils/audioPlayer';

export default function AudioControls({ onRestart }) {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (isMuted) {
      resumeSong();
      setIsMuted(false);
    } else {
      pauseSong();
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      <button
        onClick={toggleMute}
        className="p-2.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 hover:text-yellow-300 backdrop-blur-md shadow-lg transition-all cursor-pointer"
        title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
        aria-label="Toggle Sound"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <button
        onClick={onRestart}
        className="p-2.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 hover:text-yellow-300 backdrop-blur-md shadow-lg transition-all cursor-pointer"
        title="Xem lại từ đầu"
        aria-label="Restart show"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  );
}
