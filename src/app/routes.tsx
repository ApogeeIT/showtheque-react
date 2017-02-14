import * as React from 'react';
import { Route, IndexRoute, Redirect, Router, hashHistory, browserHistory } from 'react-router';
import * as ReactRouter from 'react-router';

import { App } from './app';
import HomeContainer from './home/containers/home.container';
import ShowListContainer from './show/containers/show-list.container';
import ShowEditContainer from './show/containers/show-edit.container';

/*export const routes = (
    <Router history={hashHistory} >
      <Redirect from="/" to="/home"/>
      <Route path="/home" component={App}>
        <IndexRoute component={HomeContainer} />
        <Route path="/shows" component={ShowListContainer} />
        <Route path="/show/(:id)" component={ShowEditContainer} />
      </Route>
    </Router>
);*/

const routes = (
      <Route path="/home" component={App}>
        <IndexRoute component={HomeContainer} />
        <Route path="/shows" component={ShowListContainer} />
        <Route path="/show/(:id)" component={ShowEditContainer} />
      </Route>
);

/*export class AppRoot extends React.Component<{}, {}> {
  render() {
    return (
      <Router history={hashHistory} >
        <Redirect from="/" to="/home"/>
        <Route path="/home" component={App}>
          <IndexRoute component={HomeContainer} />
          <Route path="/shows" component={ShowListContainer} />
          <Route path="/show/(:id)" component={ShowEditContainer} />
        </Route>
      </Router>
    )
  }
}*/

/*export class Routers extends React.Component<{}, {}> {
  render() {
     return ( 
      <Router key="45" history={hashHistory} routes={routes} >
        <Redirect from="/" to="/home"/>
      </Router>
      );
    }
}*/



export class Root extends React.Component<{}, {}> {
  render() {
    return <Router history={hashHistory} routes={routes} ></Router>
  }
}