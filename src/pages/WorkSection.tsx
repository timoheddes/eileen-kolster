import { Route, Switch } from 'wouter';
import WorkLayout from '../components/WorkLayout/WorkLayout';
import Work from './Work';
import Project from './Project';

/**
 * Keeps the side navigation mounted while moving between /work and
 * /work/:slug, so its active state animates instead of jumping.
 */
const WorkSection = () => (
  <WorkLayout>
    <Switch>
      <Route path="/work" component={Work} />
      <Route path="/work/:slug" component={Project} />
    </Switch>
  </WorkLayout>
);

export default WorkSection;
