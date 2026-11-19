// Trình phát âm thanh độc quyền sử dụng file amthanh.mp3 của người dùng
// Đã loại bỏ hoàn toàn các tiếng chuông beep / synthesizer tự tạo

let currentAudioElement = null;

// Phát bài hát amthanh.mp3
export function startSong() {
  try {
    if (currentAudioElement) {
      currentAudioElement.play().catch(() => {});
      return;
    }

    const audio = new Audio('/audio/amthanh.mp3');
    audio.loop = true;
    audio.volume = 0.9;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          currentAudioElement = audio;
        })
        .catch((error) => {
          console.log("Audio play request failed or blocked by browser:", error);
        });
    }
  } catch (e) {
    console.error("Audio error:", e);
  }
}

export function pauseSong() {
  if (currentAudioElement) {
    currentAudioElement.pause();
  }
}

export function resumeSong() {
  if (currentAudioElement) {
    currentAudioElement.play().catch(() => {});
  }
}

export function setSongVolume(volume) {
  if (currentAudioElement) {
    currentAudioElement.volume = volume;
  }
}
