// Linear interpolation
export const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;

export const calcWinsize = (): { width: number, height: number } => {
  return { width: window.innerWidth, height: window.innerHeight };
};

// Gets the mouse position
export const getMousePos = (e: MouseEvent): { x: number, y: number } => {
  return {
    x: e.clientX,
    y: e.clientY
  };
};

export const distance = (x1: number, y1: number, x2: number, y2: number): number => {
  const a = x1 - x2;
  const b = y1 - y2;

  return Math.hypot(a, b);
}

// Generate a random float.
export const getRandomFloat = (min: number, max: number): string => (Math.random() * (max - min) + min).toFixed(2);
