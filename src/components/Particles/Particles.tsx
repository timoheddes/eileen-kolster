import { useRef, useEffect } from 'react';
import './Particles.css';
import useAudioState from '../../store/audioState';
import { Particle } from './particle';

export const Particles = ({
  numParticles = 300,
  gravityWell = false,
}) => {
  const canvasRef = useRef(null);
  const { analyser } = useAudioState();

  // Use refs for animation state that doesn't trigger re-renders
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const mouseRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    lastClickTime: 0,
    isDown: false,
  });

  const supernovaStateRef = useRef({ startTime: 0, duration: 1500 });

  // Spatial partitioning grid for O(n) particle connections instead of O(n²)
  const connectParticles = (
    ctx: CanvasRenderingContext2D,
    maxDistance: number,
    transparency: number
  ) => {
    const particles = particlesRef.current;
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (!canvas || particles.length === 0) return;

    // Cell size should be at least maxDistance to ensure we only need to check adjacent cells
    const cellSize = maxDistance;
    const cols = Math.ceil(canvas.width / cellSize);
    const rows = Math.ceil(canvas.height / cellSize);

    // Build spatial grid - Map<cellIndex, particleIndices[]>
    const grid = new Map<number, number[]>();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const cellX = Math.floor(p.x / cellSize);
      const cellY = Math.floor(p.y / cellSize);
      const cellIndex = cellY * cols + cellX;

      if (!grid.has(cellIndex)) {
        grid.set(cellIndex, []);
      }
      grid.get(cellIndex)!.push(i);
    }

    // Track which pairs we've already checked to avoid duplicates
    const checked = new Set<string>();

    // For each cell, check particles against same cell and neighboring cells
    for (const [cellIndex, cellParticles] of grid) {
      const cellY = Math.floor(cellIndex / cols);
      const cellX = cellIndex % cols;

      // Check neighboring cells (including self)
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const neighborY = cellY + dy;
          const neighborX = cellX + dx;

          // Skip out of bounds
          if (neighborX < 0 || neighborX >= cols || neighborY < 0 || neighborY >= rows) {
            continue;
          }

          const neighborIndex = neighborY * cols + neighborX;
          const neighborParticles = grid.get(neighborIndex);
          if (!neighborParticles) continue;

          // Check all pairs between current cell and neighbor cell
          for (const i of cellParticles) {
            for (const j of neighborParticles) {
              // Avoid checking same particle or duplicate pairs
              if (i >= j) continue;

              const pairKey = `${i}-${j}`;
              if (checked.has(pairKey)) continue;
              checked.add(pairKey);

              const p1 = particles[i];
              const p2 = particles[j];

              const distX = p1.x - p2.x;
              const distY = p1.y - p2.y;
              const distance = Math.sqrt(distX * distX + distY * distY);

              // If the particles are close enough, draw a line
              if (distance < maxDistance) {
                // Calculate opacity based on distance
                const opacity = 1 - distance / maxDistance;

                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * transparency})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }
        }
      }
    }
  };

  const createParticle = (index: number) => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (!canvas) return;

    setTimeout(() => {
      particlesRef.current.push(
        new Particle(canvas.width, canvas.height, gravityWell)
      );
    }, index * Math.random() * 100);
  };

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create a persistent array of particles
    particlesRef.current = [];
    for (let i = 0; i < numParticles; i++) {
      createParticle(i);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseDown = (e: MouseEvent) => {
      // Update the ref with the click's location AND the current time
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        lastClickTime: Date.now(),
        isDown: true,
      };
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [numParticles, gravityWell]);

  // Main effect for setting up and running the animation
  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dataArray: Uint8Array<ArrayBuffer> | null = null;
    let timeDomainArray: Uint8Array<ArrayBuffer> | null = null;

    // Capture analyser reference for use in animation loop
    const currentAnalyser = analyser;

    // Set up the dataArray only if the analyser is available
    if (currentAnalyser) {
      dataArray = new Uint8Array(currentAnalyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;
      timeDomainArray = new Uint8Array(currentAnalyser.fftSize) as Uint8Array<ArrayBuffer>;
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let subBass = 0;
      let bass = 0;
      let mids = 0;
      let highMids = 0;
      let presence = 0;
      let punch = 0;

      if (currentAnalyser && dataArray) {
        currentAnalyser.getByteFrequencyData(dataArray);
        if (timeDomainArray) {
          currentAnalyser.getByteTimeDomainData(timeDomainArray);
          for (let i = 0; i < timeDomainArray.length; i++) {
            // Get the absolute distance from the "silent" center point
            const value = Math.abs(timeDomainArray[i] - 128);
            punch += value;
          }
          // Average it out and normalize to a 0-1 range
          punch = punch / timeDomainArray.length / 128;
        }

        // ~20-60 Hz
        subBass =
          dataArray.slice(0, 2).reduce((a, b) => a + b) / 2 / 255;

        // ~60-250 Hz
        bass =
          dataArray.slice(2, 8).reduce((a, b) => a + b) / 6 / 255;

        // ~250-2000 Hz
        mids =
          dataArray.slice(8, 40).reduce((a, b) => a + b) / 32 / 255;

        // ~2000-20000 Hz
        highMids =
          dataArray.slice(40, 60).reduce((a, b) => a + b) / 20 / 255;

        // ~6000-20000 Hz
        presence =
          dataArray.slice(60, 128).reduce((a, b) => a + b) / 68 / 255;
      }

      const audioData = {
        subBass,
        bass,
        mids,
        highMids,
        presence,
        punch,
      };

      const timeSinceSupernova =
        Date.now() - supernovaStateRef.current.startTime;
      let supernovaActive = false;
      let supernovaProgress = 0;

      if (timeSinceSupernova < supernovaStateRef.current.duration) {
        supernovaActive = true;
        // Progress goes from 1 (full strength) down to 0 (faded)
        supernovaProgress =
          1 - timeSinceSupernova / supernovaStateRef.current.duration;
      }

      const supernova = {
        active: supernovaActive,
        progress: supernovaProgress,
      };

      const SUPERNOVA_RADIUS = 60; // The radius of the "core"
      const DENSITY_THRESHOLD = numParticles / 5; // How many particles trigger a supernova
      const COOLDOWN = 5000; // The cooldown between supernova events
      const particlesInCore: Particle[] = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (const p of particlesRef.current) {
        const distFromCenter = Math.sqrt(
          Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2)
        );
        if (distFromCenter < SUPERNOVA_RADIUS) {
          particlesInCore.push(p);
        }
      }

      // The density factor is a value from 0 to 1 based on how full the core is.
      const densityFactor = Math.min(
        particlesInCore.length / DENSITY_THRESHOLD,
        1
      );

      if (
        Date.now() - supernovaStateRef.current.startTime >
        COOLDOWN
      ) {
        if (particlesInCore.length > DENSITY_THRESHOLD) {
          supernovaStateRef.current.startTime = Date.now();
        }
      }

      particlesRef.current.forEach((p) => {
        p.update(
          {
            subBass: audioData.subBass,
            bass: audioData.bass,
            mids: audioData.mids,
            highMids: audioData.highMids,
            presence: audioData.presence,
            punch: audioData.punch,
          },
          mouseRef.current,
          supernova
        );
        p.draw(
          ctx,
          {
            subBass: audioData.subBass,
            bass: audioData.bass,
            mids: audioData.mids,
            highMids: audioData.highMids,
            presence: audioData.presence,
            punch: audioData.punch,
          },
          densityFactor
        );
      });

      connectParticles(
        ctx,
        Math.max(mids * 300, 100),
        Math.min(highMids * 20, 0.8)
      );

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [numParticles, analyser]);

  return <canvas id="particles" ref={canvasRef} aria-hidden="true" />;
};
