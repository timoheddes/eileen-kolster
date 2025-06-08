export const audioContext = new (window.AudioContext ||
  (window as unknown as { webkitAudioContext: AudioContext })
    .webkitAudioContext)();
