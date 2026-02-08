import { Switch, Route, useLocation } from 'wouter';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { PageLoader } from '../components/Loaders';

// Home is eager-loaded for faster LCP on landing page
import Home from './Home';
// Other pages lazy-loaded to reduce initial bundle
const Biography = lazy(() => import('./Biography'));
const Contact = lazy(() => import('./Contact'));
const Share = lazy(() => import('./Share'));

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
        <Route
          path="/share/:track"
          component={() => <LazyRoute component={Share} />}
        />
        <Route>
          <LazyRoute component={Contact} />
        </Route>
      </Switch>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
