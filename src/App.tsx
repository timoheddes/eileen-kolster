import { Particles } from './components/Particles';
import { AnimatedLinkSVG } from './components/AnimatedLink/AnimatedLinkSVG';
import { Router } from 'wouter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import AnimatedRoutes from './pages/AnimatedRoutes';

function App() {
  return (
    <>
      <AnimatedLinkSVG />
      <Header />
      <Router>
        <main className="main-content">
          <AnimatedRoutes />
        </main>
        <Particles numParticles={100} />
      </Router>
      <Footer />
    </>
  );
}

export default App;
