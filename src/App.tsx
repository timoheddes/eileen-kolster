import { Particles } from './components/Particles';
import { AnimatedLinkSVG } from './components/AnimatedLink/AnimatedLinkSVG';
import { Router, useRoute } from 'wouter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import useAnimationState from './store/animationState';
import AnimatedRoutes from './pages/AnimatedRoutes';
import { useEffect } from 'react';
import useMenuState from './store/menuState';

function App() {
  const [isHome] = useRoute('/');
  const { isSplashScreenVisible } = useAnimationState();
  const { isMenuOpen } = useMenuState();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <>
      <AnimatedLinkSVG />
      {(!isSplashScreenVisible || !isHome) && <Header />}
      <Router>
        <main
          className="main-content"
          style={{ opacity: isMenuOpen ? '0' : '1' }}
        >
          <AnimatedRoutes />
        </main>
        <Particles numParticles={100} />
      </Router>
      {(!isSplashScreenVisible || !isHome) && <Footer />}
    </>
  );
}

export default App;
