export const defaultWavesurferOptions = (container: HTMLElement) => {
  return {
    container: container,
    backend: 'MediaElement',
    waveColor: '#c1a790', // Color of the unplayed waveform
    progressColor: '#343f49', // Color of the played waveform
    cursorColor: '#34424b', // Color of the playhead cursor
    cursorWidth: 1, // Width of the playhead cursor
    barWidth: 4, // Width of the waveform bars
    barGap: 1, // Gap between waveform bars
    barRadius: 2, // Radius of the waveform bars for a softer look
    height: 60, // Height of the waveform
    // minPxPerSec: 200,
    // sampleRate: 11025,
    dragToSeek: true,
  };
};
