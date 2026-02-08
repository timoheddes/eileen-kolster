import { useState, useEffect } from 'react';
import { Particles } from './components/Particles';
import { AnimatedLinkSVG } from './components/AnimatedLink/AnimatedLinkSVG';
import { Router } from 'wouter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import MainContent from './MainContent';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

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
      <AnimatedLinkSVG />
      <Header />
      <Router>
        <MainContent />
        <Particles numParticles={numParticles} gravityWell={false} />
      </Router>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
