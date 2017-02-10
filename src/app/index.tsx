import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Route, IndexRoute, Redirect, Router, hashHistory, browserHistory } from 'react-router';
//import * as ReactRouter from 'react-router';

import App from './app';
import HomeContainer from './home/containers/home.container';
import ShowListContainer from './show/containers/show-list.container';
import { ShowEditContainer } from './show/containers/show-edit.container';

import '../scss/app.scss';

ReactDOM.render(
  <Router history={hashHistory} >
    <Redirect from="/" to="/home"/>
    <Route path="/home" component={App}>
      <IndexRoute component={HomeContainer} />
      <Route path="/shows" component={ShowListContainer} />
      <Route path="/show/(:id)" component={ShowEditContainer} />
    </Route>
  </Router>,
  document.getElementById('app')
);

if(module.hot) {
    module.hot.accept();
}