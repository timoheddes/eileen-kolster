import { useRef, useEffect } from 'react';
import './Particles.css';
import useAudioState from '../../store/audioState';
import { Particle } from './particle';

export const Particles = ({ numParticles = 300 }) => {
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

  const connectParticles = (
    ctx: CanvasRenderingContext2D,
    distance: number,
    transparency: number
  ) => {
    // This is the maximum distance between particles to draw a line
    const maxDistance = distance;
    const particles = particlesRef.current;

    // Use a nested loop to check every particle against every other particle
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        // Start j at i+1 to avoid duplicates
        const p1 = particles[i];
        const p2 = particles[j];

        const distance = Math.sqrt(
          Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
        );

        // If the particles are close enough, draw a line
        if (distance < maxDistance) {
          // Calculate opacity based on distance.
          // Closer particles get a stronger line (opacity approaches 1).
          const opacity = 1 - distance / maxDistance;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${
            opacity * transparency
          })`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  };

  const createParticle = (index: number) => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (!canvas) return;

    setTimeout(() => {
      particlesRef.current.push(
        new Particle(canvas.width, canvas.height)
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
    };
  }, [numParticles]);

  // Main effect for setting up and running the animation
  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dataArray: Uint8Array | null = null;
    let timeDomainArray: Uint8Array | null = null;

    // Set up the dataArray only if the analyser is available
    if (analyser) {
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      timeDomainArray = new Uint8Array(analyser.fftSize);
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

      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        if (timeDomainArray) {
          analyser.getByteTimeDomainData(timeDomainArray);
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
          mouseRef.current
        );
        p.draw(ctx, {
          subBass: audioData.subBass,
          bass: audioData.bass,
          mids: audioData.mids,
          highMids: audioData.highMids,
          presence: audioData.presence,
          punch: audioData.punch,
        });
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
