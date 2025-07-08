import { Particles } from './components/Particles';
import { AnimatedLinkSVG } from './components/AnimatedLink/AnimatedLinkSVG';
import { Router } from 'wouter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import AnimatedRoutes from './pages/AnimatedRoutes';
import useMenuState from './store/menuState';

function App() {
  const { isMenuOpen } = useMenuState();

  return (
    <>
      <AnimatedLinkSVG />
      <Header />
      <Router>
        <main
          className="main-content"
          style={{ opacity: isMenuOpen ? '0' : '1' }}
        >
          <AnimatedRoutes />
        </main>
        <Particles numParticles={100} />
      </Router>
      <Footer />
    </>
  );
}

export default App;
