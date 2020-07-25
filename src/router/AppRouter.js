import React from 'react';
import { BrowserRouter, Route, Switch,} from 'react-router-dom';
import Home from '../components/Home';
import CreateGroup from '../components/CreateGroup';
import Group from '../components/Group';

const AppRouter = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div>
      <Switch>
        <Route path= "/" component={Home} exact={true}/>
        <Route path= "/start" component={CreateGroup} />
        <Route path= '/group' component={Group} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;