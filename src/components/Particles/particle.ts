export class Particle {
  // Position and size
  x: number;
  y: number;
  size: number;

  // Base speed (before any audio influence)
  baseSpeedX: number;
  baseSpeedY: number;

  // Current speed (after audio influence)
  speedX: number;
  speedY: number;

  // Opacity (0-1)
  opacity: number;

  // Canvas dimensions
  canvasWidth: number;
  canvasHeight: number;

  // Twinkle offset (for twinkling effect)
  twinkleOffset: number;

  // Punch speed (for drum hits)
  punchSpeedX: number;
  punchSpeedY: number;

  // Color (optional)
  color?: string;

  // Creation time
  creationTime: number;

  // Fade in delay
  fadeInDelay: number;
  // Fade in duration
  fadeInDuration: number;

  // Target opacity (final base opacity after fading in)
  targetOpacity: number;
  // Current opacity (opacity on the current frame)
  currentOpacity: number;

  supportMouseDown?: boolean;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    // Support mouse down
    this.supportMouseDown = false;

    // Size, speed, and opacity
    const depth = Math.random();
    this.size = depth * 2 + 0.5;
    this.baseSpeedX = (Math.random() - 0.5) * depth * 0.1;
    this.baseSpeedY = (Math.random() - 0.5) * depth * 0.1;
    this.speedX = this.baseSpeedX;
    this.speedY = this.baseSpeedY;
    this.opacity = depth * 0.5 + 0.1;

    // Position
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;

    // Twinkle offset
    this.twinkleOffset = Math.random() * Math.PI * 2;

    // Color
    this.color = '255, 255, 255';

    // Punch speed
    this.punchSpeedX = 0;
    this.punchSpeedY = 0;

    // Creation time
    this.creationTime = Date.now();

    // Fade in delay and duration
    // Each particle waits for a random time before starting to fade in (e.g., up to 2 seconds)
    this.fadeInDelay = Math.random() * 10000;
    // Each particle takes a random amount of time to complete its fade-in (e.g., 1 to 3 seconds)
    this.fadeInDuration = 1000 + Math.random() * 2000;
    // Store the final opacity we want to reach
    this.targetOpacity = depth * 0.5 + 0.1;
    // Start completely transparent
    this.currentOpacity = 0;
  }

  // The update method accepts an object with all our audio data
  // subBass (20-60 Hz), bass (60-250 Hz), mids (250-2000 Hz), highMids (2000-20000 Hz), presence (6000-20000 Hz), punch
  update(
    audio: {
      subBass: number;
      bass: number;
      mids: number;
      highMids: number;
      presence: number;
      punch: number;
    },
    mouse: {
      x: number;
      y: number;
      lastClickTime: number;
      isDown: boolean;
    }
  ) {
    const timeSinceCreation = Date.now() - this.creationTime;
    if (timeSinceCreation > this.fadeInDelay) {
      const fadeInElapsedTime = timeSinceCreation - this.fadeInDelay;
      const fadeInProgress = Math.min(
        fadeInElapsedTime / this.fadeInDuration,
        1
      );
      this.currentOpacity = fadeInProgress * this.targetOpacity;
    }

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

    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (mouse.isDown && this.supportMouseDown) {
      document.body.style.cursor = 'grabbing';
      // --- ATTRACT FORCE (when mouse is held down) ---
      const attractRadius = 300;
      const attractStrength = 2.5;

      if (dist < attractRadius) {
        // The force gets stronger as the particle is closer to the center
        const force = 1 - dist / attractRadius;

        // The force direction is TOWARDS the mouse (the opposite of repel)
        const forceDirectionX = dx / dist;
        const forceDirectionY = dy / dist;

        // Apply a gentle pull
        this.speedX -= forceDirectionX * force * attractStrength;
        this.speedY -= forceDirectionY * force * attractStrength;
      }
    } else {
      // document.body.style.cursor = 'default';
      // --- REPEL FORCE (on click burst) & HOVER (gentle push) ---
      // This runs only when the mouse button is NOT held down.

      // Repel Burst
      const clickTimeDelta = Date.now() - mouse.lastClickTime;
      const clickEffectDuration = 500;
      if (clickTimeDelta < clickEffectDuration) {
        const clickRadius = 250;
        if (dist < clickRadius) {
          const force = 1 - dist / clickRadius;
          const timeFalloff =
            1 - clickTimeDelta / clickEffectDuration;
          const forceDirectionX = dx / dist;
          const forceDirectionY = dy / dist;
          const repelStrength = 30;

          this.speedX +=
            forceDirectionX * force * timeFalloff * repelStrength;
          this.speedY +=
            forceDirectionY * force * timeFalloff * repelStrength;
        }
      }
    }

    // --- HOVER FORCE ---
    // A gentle push towards the mouse when the particle is close
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

    // --- BOUNDARY CHECKS ---
    if (this.y <= this.size) {
      this.y = this.canvasHeight - this.size * 2;
    } else if (this.y >= this.canvasHeight - this.size) {
      this.y = 0 + this.size;
    } else if (this.x <= this.size) {
      this.x = this.canvasWidth - this.size;
    } else if (this.x >= this.canvasWidth - this.size) {
      this.x = 0 + this.size;
    }
  }

  // Presence affects the brightness of the particle
  // Mids affect the size of the particle
  draw(
    ctx: CanvasRenderingContext2D,
    audio: {
      subBass: number;
      bass: number;
      mids: number;
      highMids: number;
      presence: number;
      punch: number;
    }
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
      this.currentOpacity +
      twinkle +
      audio.presence * this.size * 0.5;

    ctx.beginPath();
    ctx.fillStyle = `rgba(${this.color}, ${Math.min(
      finalOpacity,
      1.0
    )})`;
    ctx.arc(this.x, this.y, finalSize, 0, Math.PI * 2);
    ctx.fill();
  }
}
