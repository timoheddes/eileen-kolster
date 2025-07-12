import { Switch, Route, useLocation } from 'wouter';
import { AnimatePresence } from 'framer-motion';

import Biography from './Biography';
import Home from './Home';
import NotFound from './NotFound';
import Contact from './Contact';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch key={location[0]} location={location[0]}>
        <Route path="/" component={Home} />
        <Route path="/biography" component={Biography} />
        <Route path="/contact" component={Contact} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
