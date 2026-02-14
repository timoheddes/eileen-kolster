import AnimatedRoutes from './pages/AnimatedRoutes';
import useMenuState from './store/menuState';

const MainContent = () => {
  const { isMenuOpen } = useMenuState();

  return (
    <main style={{ visibility: isMenuOpen ? 'hidden' : 'visible' }}>
      <div className="page-content">
        <AnimatedRoutes />
      </div>
    </main>
  );
};

export default MainContent;
