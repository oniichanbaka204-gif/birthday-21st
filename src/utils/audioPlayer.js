// Audio player with Web Audio API synthesizer fallback
// Supports custom MP3 file at '/audio/birthday-song.mp3'

let audioCtx = null;
let currentAudioElement = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Plays a pleasant crystal bell chime for countdown numbers
export function playCountdownBeep(number) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Scale pitch higher as we approach 1
    // 10 -> low pleasant chime, 1 -> higher sparkling bell
    const baseFreq = 320;
    const freq = baseFreq + (10 - number) * 55;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Envelope
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.55);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (err) {
    console.warn("Audio chime could not play:", err);
  }
}

// Plays a happy fanfare chord when reaching 0 / Happy Birthday reveal
export function playBirthdayFanfare() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const chords = [523.25, 659.25, 783.99, 1046.5]; // C Major arpeggio
    chords.forEach((freq, index) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.3);
      }, index * 120);
    });
  } catch (err) {
    console.warn("Audio fanfare error:", err);
  }
}

// Manages background music playback
export function startSong(onFallback) {
  try {
    const audio = new Audio('/audio/birthday-song.mp3');
    audio.loop = true;
    audio.volume = 0.7;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          currentAudioElement = audio;
        })
        .catch((error) => {
          console.log("No custom MP3 found at /audio/birthday-song.mp3 or autoplay blocked. Using synth audio fallback.");
          if (onFallback) onFallback();
        });
    }
  } catch (e) {
    console.log("Audio creation error:", e);
    if (onFallback) onFallback();
  }
}

export function pauseSong() {
  if (currentAudioElement) {
    currentAudioElement.pause();
  }
}

export function resumeSong() {
  if (currentAudioElement) {
    currentAudioElement.play();
  }
}

export function setSongVolume(volume) {
  if (currentAudioElement) {
    currentAudioElement.volume = volume;
  }
}
