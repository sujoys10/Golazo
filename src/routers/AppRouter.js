import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LogInPage from '../components/LogInPage';
import DashboardPage from '../components/DashboardPage.js';
import AddPost from '../components/AddPost';
import NotFound from '../components/NotFound.js';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import EditPostPage from '../components/EditPostPage';
import UserProfile from '../components/UserProfile';
import EditUserDetails from '../components/EditUserDetails';
import Extras from '../components/Extras';
import TrendList from '../components/TrendList';
import Connections from '../components/Connections';
import UserPost from '../components/UserPost';


export const history = createHistory();

const AppRouter = () => (   
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path="/" component={LogInPage} exact={true} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/user/:uid" component={UserProfile} />
          <PrivateRoute path="/p/:user/:pid" component={UserPost} />
          <PrivateRoute path="/f/:username/:connection" component={Connections} />
          <PrivateRoute path="/trending" component={TrendList} />
          <PrivateRoute path="/posts/:tag" component={Extras} />
          <PrivateRoute path="/editUser/:uid" component={EditUserDetails} />
          <PrivateRoute path="/addPost" component={AddPost} />
          <PrivateRoute path="/editPost/:id" component={EditPostPage}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
);

export default AppRouter;