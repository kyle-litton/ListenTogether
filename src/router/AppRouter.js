import React from 'react';
import { BrowserRouter, Route, Switch,} from 'react-router-dom';
import Home from '../components/Home';
import CreateGroup from '../components/CreateGroup';
import Group from '../components/Group';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path= {process.env.PUBLIC_URL + "/"} component={Home} exact={true}/>
        <Route path= {process.env.PUBLIC_URL + "/start"} component={CreateGroup} />
        <Route path= {process.env.PUBLIC_URL + '/group'} component={Group} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;