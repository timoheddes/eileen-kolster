import { useState, useEffect, lazy, Suspense } from 'react';
import { Router } from 'wouter';
import { Header } from './components/Header';
import MainContent from './MainContent';
import { Cursor } from './components/Cursor';
import useCustomCursorDetection from './hooks/customCursor';
import usePrefersReducedMotion from './hooks/prefersReducedMotion';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy-load Particles (decorative, below fold) to improve FCP/LCP
const Particles = lazy(() =>
  import('./components/Particles').then((m) => ({ default: m.Particles })),
);

// SSR-safe default for particle count
const DEFAULT_PARTICLES = 50;
const DESKTOP_PARTICLES = 100;
const DESKTOP_BREAKPOINT = 768;

function App() {
  const [numParticles, setNumParticles] = useState(DEFAULT_PARTICLES);
  const showCustomCursor = useCustomCursorDetection();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Update particle count based on screen width after mount
    setNumParticles(
      window.innerWidth > DESKTOP_BREAKPOINT
        ? DESKTOP_PARTICLES
        : DEFAULT_PARTICLES,
    );
  }, []);

  return (
    <>
      {showCustomCursor && <Cursor />}
      <Header />
      <Router>
        <MainContent />
        {!prefersReducedMotion && (
          <Suspense fallback={null}>
            <Particles numParticles={numParticles} gravityWell={false} />
          </Suspense>
        )}
      </Router>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
