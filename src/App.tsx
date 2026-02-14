import { useState, useEffect, lazy, Suspense } from 'react';
import { Router } from 'wouter';
import { Header } from './components/Header';
import MainContent from './MainContent';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy-load Particles (decorative, below fold) to improve FCP/LCP
const Particles = lazy(() =>
  import('./components/Particles').then((m) => ({ default: m.Particles }))
);

// Lazy-load Footer (contains audio player with heavy MP3 imports) to improve FCP/LCP
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);

// SSR-safe default for particle count
const DEFAULT_PARTICLES = 50;
const DESKTOP_PARTICLES = 100;
const DESKTOP_BREAKPOINT = 768;

function App() {
  const [numParticles, setNumParticles] = useState(DEFAULT_PARTICLES);

  useEffect(() => {
    // Update particle count based on screen width after mount
    setNumParticles(
      window.innerWidth > DESKTOP_BREAKPOINT ? DESKTOP_PARTICLES : DEFAULT_PARTICLES
    );
  }, []);

  return (
    <>
      <Header />
      <Router>
        <MainContent />
        <Suspense fallback={null}>
          <Particles numParticles={numParticles} gravityWell={false} />
        </Suspense>
      </Router>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
