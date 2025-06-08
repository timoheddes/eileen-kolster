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
  punchSpeedX: number;
  punchSpeedY: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    const depth = Math.random();
    this.size = depth * 2 + 0.5;
    this.baseSpeedX = (Math.random() - 0.5) * depth * 0.3;
    this.baseSpeedY = (Math.random() - 0.5) * depth * 0.3;
    this.speedX = this.baseSpeedX;
    this.speedY = this.baseSpeedY;
    this.opacity = depth * 0.5 + 0.1;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.twinkleOffset = Math.random() * Math.PI * 2;

    // Initialize punch speed at zero
    this.punchSpeedX = 0;
    this.punchSpeedY = 0;
  }

  // The update method now accepts an object with all our audio data
  update(
    audio: { bass: number; highMids: number; punch: number },
    mouse: { x: number; y: number }
  ) {
    // --- PUNCH: A sudden burst of speed on drum hits ---
    // We give the particle a strong, random nudge if punch is detected
    if (audio.punch > 0.15) {
      // Use a threshold to avoid reacting to noise
      const angle = Math.random() * Math.PI * 2;
      // The force of the punch is scaled by the punch value itself
      const force = audio.punch * 3;
      this.punchSpeedX = Math.cos(angle) * force;
      this.punchSpeedY = Math.sin(angle) * force;
    }

    // Apply heavy friction to the punch speed so it fades out instantly
    this.punchSpeedX *= 0.9;
    this.punchSpeedY *= 0.9;

    // --- SUSTAINED MOVEMENT ---
    // Reset to base speed for the constant drift
    this.speedX = this.baseSpeedX;
    this.speedY = this.baseSpeedY;

    // BASS: The main driver for sustained movement
    this.speedX += this.baseSpeedX * audio.bass * 10;
    this.speedY += this.baseSpeedY * audio.bass * 10;

    // HIGH-MIDS: A sharper, faster nudge to the velocity
    this.speedX += this.speedX * audio.highMids * 2.0;
    this.speedY += this.speedY * audio.highMids * 2.0;

    // --- MOUSE INTERACTION (as before) ---
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      const forceDirectionX = dx / dist;
      const forceDirectionY = dy / dist;
      const force = (150 - dist) / 150;
      this.speedX += forceDirectionX * force * this.size * 0.5;
      this.speedY += forceDirectionY * force * this.size * 0.5;
    }

    // --- FINAL POSITION UPDATE ---
    // Combine the sustained speed with the fading punch speed
    this.x += this.speedX + this.punchSpeedX;
    this.y += this.speedY + this.punchSpeedY;

    // Edge Wrapping (as before)
    if (this.x > this.canvasWidth + this.size) this.x = -this.size;
    if (this.x < -this.size) this.x = this.canvasWidth + this.size;
    if (this.y > this.canvasHeight + this.size) this.y = -this.size;
    if (this.y < -this.size) this.y = this.canvasHeight + this.size;
  }

  // The draw method also accepts the audio object
  draw(
    ctx: CanvasRenderingContext2D,
    audio: { mids: number; presence: number }
  ) {
    // --- SIZE ---
    // The "body" of the sound (mids) subtly increases the particle's size
    const finalSize = this.size + audio.mids * 2.0;

    // --- OPACITY ---
    const twinkle =
      Math.abs(Math.sin(this.twinkleOffset + Date.now() * 0.0005)) *
      0.2;
    // The "sparkle" of the sound (presence) affects the glow
    const finalOpacity =
      this.opacity + twinkle + audio.presence * this.size * 0.5;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(
      finalOpacity,
      1.0
    )})`;
    ctx.arc(this.x, this.y, finalSize, 0, Math.PI * 2);
    ctx.fill();
  }
}
