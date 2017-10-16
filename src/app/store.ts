import { Show } from './show/models/show';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { ShowRepositoryReducer, IShowStore } from './show/show.reducer';

/*const reducers = combineReducers({
  showReducer
});*/

let initialState: IShowStore = {
  shows: [],
  show: undefined,
  loading: false
};

/*initialState.shows[0].id = 1;
initialState.shows[0].title = 'le tritre';*/

let showReducer = new ShowRepositoryReducer();

export let store = createStore(showReducer.reduce, initialState);