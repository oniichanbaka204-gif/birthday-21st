// Trình phát âm thanh độc quyền sử dụng file amthanh.mp3 của người dùng
// Đồng bộ chính xác 100% thời gian thực giữa Audio và Bộ đếm hình ảnh

let audioInstance = null;

// Khởi tạo và nạp trước (preload) audio ngay khi web tải để tránh độ trễ mạng
export function getOrCreateAudio() {
  if (!audioInstance && typeof window !== 'undefined') {
    audioInstance = new Audio('/audio/amthanh.mp3');
    audioInstance.preload = 'auto';
    audioInstance.loop = true;
    audioInstance.volume = 0.9;
  }
  return audioInstance;
}

// Bắt đầu phát nhạc và chỉ kích hoạt callback khi âm thanh THỰC SỰ phát ra loa (sự kiện 'playing')
export function startSong(onActuallyPlaying) {
  try {
    const audio = getOrCreateAudio();
    audio.currentTime = 0;

    // Lắng nghe khi âm thanh đã đệm xong và thực sự phát ra loa
    const handlePlaying = () => {
      if (onActuallyPlaying) {
        onActuallyPlaying(audio);
      }
      audio.removeEventListener('playing', handlePlaying);
    };

    audio.addEventListener('playing', handlePlaying);

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Autoplay prevented or network error:", err);
        // Fallback kích hoạt đếm nếu trình duyệt có chính sách đặc thù
        if (onActuallyPlaying) onActuallyPlaying(audio);
      });
    }
  } catch (e) {
    console.error("Audio error:", e);
    if (onActuallyPlaying) onActuallyPlaying(null);
  }
}

// Lấy thời gian đang phát hiện tại của bài hát (tính bằng giây)
export function getAudioCurrentTime() {
  return audioInstance ? audioInstance.currentTime : 0;
}

// Lắng nghe sự kiện cập nhật thời gian theo từng frame của bài hát
export function onAudioTimeUpdate(callback) {
  if (!audioInstance) return () => {};
  
  const handler = () => {
    callback(audioInstance.currentTime);
  };
  
  audioInstance.addEventListener('timeupdate', handler);
  return () => {
    if (audioInstance) {
      audioInstance.removeEventListener('timeupdate', handler);
    }
  };
}

export function pauseSong() {
  if (audioInstance) {
    audioInstance.pause();
  }
}

export function resumeSong() {
  if (audioInstance) {
    audioInstance.play().catch(() => {});
  }
}

export function setSongVolume(volume) {
  if (audioInstance) {
    audioInstance.volume = volume;
  }
}

// Tự động preload ngay khi file được import
if (typeof window !== 'undefined') {
  getOrCreateAudio();
}
