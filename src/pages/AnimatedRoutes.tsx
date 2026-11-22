import { Switch, Route, Redirect, useLocation } from 'wouter';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { PageLoader } from '../components/Loaders';

// Home is eager-loaded for faster LCP on landing page
import Home from './Home';
// Other pages lazy-loaded to reduce initial bundle
const Biography = lazy(() => import('./Biography'));
const Music = lazy(() => import('./Music'));
const WorkSection = lazy(() => import('./WorkSection'));
const NotFound = lazy(() => import('./NotFound'));
const Contact = lazy(() => import('./Contact'));

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
  // /work and /work/:slug share one layout, so they share one key and the
  // side navigation stays mounted between them.
  const routeKey = location[0].startsWith('/work') ? '/work' : location[0];

  return (
    <AnimatePresence mode="wait">
      <Switch key={routeKey} location={location[0]}>
        <Route path="/" component={() => <LazyRoute component={Home} />} />
        <Route
          path="/about"
          component={() => <LazyRoute component={Biography} />}
        />
        <Route path="/biography">
          <Redirect to="/about" replace />
        </Route>
        <Route path="/work/:slug?">
          {/* Children, not an inline component, so it is not remounted on navigation. */}
          <LazyRoute component={WorkSection} />
        </Route>
        <Route
          path="/music"
          component={() => <LazyRoute component={Music} />}
        />
        <Route path="/play">
          <Redirect to="/music" replace />
        </Route>
        <Route
          path="/contact"
          component={() => <LazyRoute component={Contact} />}
        />
        <Route path="/share/:track">
          <Redirect to="/music" replace />
        </Route>
        <Route>
          <LazyRoute component={NotFound} />
        </Route>
      </Switch>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
