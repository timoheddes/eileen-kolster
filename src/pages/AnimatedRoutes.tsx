import { Switch, Route, useLocation } from 'wouter';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { PageLoader } from '../components/Loaders';

// Lazy load page components
const Home = lazy(() => import('./Home'));
const Biography = lazy(() => import('./Biography'));
const Contact = lazy(() => import('./Contact'));
const NotFound = lazy(() => import('./NotFound'));

// Wrapper component to handle Suspense
const LazyRoute = ({
  component: Component,
}: {
  component: React.ComponentType;
}) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch key={location[0]} location={location[0]}>
        <Route
          path="/"
          component={() => <LazyRoute component={Home} />}
        />
        <Route
          path="/biography"
          component={() => <LazyRoute component={Biography} />}
        />
        <Route
          path="/contact"
          component={() => <LazyRoute component={Contact} />}
        />
        <Route>
          <LazyRoute component={NotFound} />
        </Route>
      </Switch>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
