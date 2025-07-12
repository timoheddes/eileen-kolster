import AnimatedRoutes from './pages/AnimatedRoutes';
import useMenuState from './store/menuState';

const MainContent = () => {
  const { isMenuOpen } = useMenuState();

  return (
    <>
      <main
        className="main-content"
        style={{ visibility: isMenuOpen ? 'hidden' : 'visible' }}
      >
        <AnimatedRoutes />
      </main>
    </>
  );
};

export default MainContent;
