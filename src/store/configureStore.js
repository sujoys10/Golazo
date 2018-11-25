import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer, currentUserReducer } from '../reducers/auth';
import {users, userHasErrored, userIsLoading, userConnectionReducer, searchReducers} from '../reducers/users';
import {postHasErrored, postIsLoading, postReducer} from '../reducers/post';
import extraReducer from '../reducers/extras';
import filterReducer from '../reducers/filter';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      currentUser: currentUserReducer, 
      users,
      userHasErrored,
      userIsLoading,
      postHasErrored,
      postIsLoading,
      posts: postReducer,
      userConnection: userConnectionReducer,
      extras: extraReducer,
      filters: filterReducer,
      searchedData: searchReducers
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
