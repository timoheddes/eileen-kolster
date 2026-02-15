export const squiglyWaveform = (
  channels: (Float32Array<ArrayBufferLike> | number[])[],
  ctx: CanvasRenderingContext2D,
) => {
  const { width, height } = ctx.canvas;
  const scale = channels[0].length / width;
  const step = 7;

  ctx.translate(0, height / 2);
  ctx.strokeStyle = ctx.fillStyle;
  ctx.beginPath();

  for (let i = 0; i < width; i += step * 2) {
    const index = Math.floor(i * scale);
    const value = Math.abs(channels[0][index]);
    let x = i;
    let y = value * height;

    ctx.moveTo(x, 0);
    ctx.lineTo(x, y);
    ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, true);
    ctx.lineTo(x + step, 0);

    x = x + step;
    y = -y;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, y);
    ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, false);
    ctx.lineTo(x + step, 0);
  }

  ctx.stroke();
  ctx.closePath();
};

const themeColors = {
  light: {
    waveColor: '#343f49',
    progressColor: '#f81754',
    cursorColor: '#34424b',
  },
  dark: {
    waveColor: '#fff',
    progressColor: '#c1a790',
    cursorColor: '#ccc',
  },
  footer: {
    waveColor: '#fff',
    progressColor: '#3794be',
    cursorColor: '#ccc',
  },
};

export const squiglyWave = (
  container: HTMLElement,
  theme: 'light' | 'dark' | 'footer',
) => {
  return {
    container: container,
    waveColor: themeColors[theme].waveColor,
    progressColor: themeColors[theme].progressColor,
    cursorColor: themeColors[theme].cursorColor,
    cursorWidth: 2,
    barWidth: 4,
    barGap: 1,
    barRadius: 2,
    height: 80,
    dragToSeek: true,
    renderFunction: squiglyWaveform,
  };
};
