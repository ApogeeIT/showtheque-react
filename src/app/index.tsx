import { Show } from './show/models/show';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Route, IndexRoute, Redirect, Router, hashHistory, browserHistory } from 'react-router';
import { App } from './app';
import HomeContainer from './home/containers/home.container';
import ShowListContainer from './show/containers/show-list.container';
import ShowEditContainer from './show/containers/show-edit.container';

import '../scss/app.scss';

declare var module: any;

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { showReducer, IShowStore } from './show/show.reducer';

/*const reducers = combineReducers({
  showReducer
});*/

let initialState: IShowStore = {
  shows: [new Show(), new Show()]
};

initialState.shows[0].id = 1;
initialState.shows[0].title = 'le tritre';
initialState.shows[1].id = 2;

let configureStore1 = (initialState: IShowStore) => {
  return createStore(showReducer, initialState);
};

/*let configureStore2 = (initialState: IShowStore) => {
  const store = createStore(showReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}*/

let store = createStore(showReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={hashHistory} >
        <Redirect from="/" to="/home" />
        <Route path="/home" component={App}>
          <IndexRoute component={HomeContainer} />
          <Route path="/shows" component={ShowListContainer} />
          <Route path="/show/(:id)" component={ShowEditContainer} />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}