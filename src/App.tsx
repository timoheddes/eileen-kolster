import { Particles } from './components/Particles';
import { AnimatedLinkSVG } from './components/AnimatedLink/AnimatedLinkSVG';
import { Router } from 'wouter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Cursor } from './components/Cursor';
import useCustomCursorDetection from './hooks/customCursor';
import MainContent from './MainContent';

import { Analytics } from '@vercel/analytics/next';

function App() {
  const showCustomCursor = useCustomCursorDetection();

  return (
    <>
      <AnimatedLinkSVG />
      <Header />
      <Router>
        <MainContent />
        <Particles numParticles={100} />
      </Router>
      <Footer />
      {showCustomCursor && <Cursor />}
      <Analytics />
    </>
  );
}

export default App;
