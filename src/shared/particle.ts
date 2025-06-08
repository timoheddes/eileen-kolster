export class Particle {
  x: number;
  y: number;
  size: number;
  baseSpeedX: number;
  baseSpeedY: number;
  speedX: number;
  speedY: number;
  opacity: number;
  canvasWidth: number;
  canvasHeight: number;
  twinkleOffset: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    const depth = Math.random();
    this.size = depth * 2 + 0.5;
    this.baseSpeedX = (Math.random() - 0.5) * 0.1;
    this.baseSpeedY = (Math.random() - 0.5) * 0.1;
    this.speedX = this.baseSpeedX;
    this.speedY = this.baseSpeedY;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.twinkleOffset = Math.random() * Math.PI * 2;
  }

  update(bass: number, mouse: { x: number; y: number }) {
    this.speedX = this.baseSpeedX;
    this.speedY = this.baseSpeedY;
    // Mouse interaction: a gentle push away from the cursor
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      const forceDirectionX = dx / dist;
      const forceDirectionY = dy / dist;
      const force = (150 - dist) / 150;
      this.speedX += forceDirectionX * force * this.size * 0.5;
      this.speedY += forceDirectionY * force * this.size * 0.5;
    }

    // Audio influence: bass makes particles move more
    this.speedX += this.baseSpeedX * (bass * 3);
    this.speedY += this.baseSpeedY * (bass * 3);

    this.x += this.speedX;
    this.y += this.speedY;

    // Friction to slow them down
    this.speedX *= 0.98;
    this.speedY *= 0.98;

    // Edge wrapping
    if (this.x > this.canvasWidth) this.x = 0;
    if (this.x < 0) this.x = this.canvasWidth;
    if (this.y > this.canvasHeight) this.y = 0;
    if (this.y < 0) this.y = this.canvasHeight;
  }

  draw(ctx: CanvasRenderingContext2D, treble: number) {
    // --- Twinkling Effect ---
    // A subtle sine wave pulse unique to each particle.
    const twinkle =
      Math.abs(Math.sin(this.twinkleOffset + Date.now() * 0.0005)) *
      0.2;
    const finalOpacity = this.opacity + twinkle + treble * this.size;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(
      finalOpacity,
      1.0
    )})`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
