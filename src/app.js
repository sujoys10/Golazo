import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter.js';
import configureStore from './store/configureStore.js';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import { logout, login } from './actions/auth.js';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { startSetPost } from './actions/post.js';
import { fetchCurrentUserData } from './actions/auth.js';

const store = configureStore();

const jsx =(
    <Provider store={store}>
      <AppRouter />    
    </Provider>
);

const appRoot = document.getElementById('app');

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered){
    ReactDOM.render(jsx, appRoot);
  }
};

ReactDOM.render(<LoadingPage />, appRoot); 

firebase.auth().onAuthStateChanged((user) => {
  if(user){
    store.dispatch(login(user.uid, user.displayName, user.photoURL));
    store.dispatch(fetchCurrentUserData(`/api/user/${user.uid}`));
        renderApp();
        if(history.location.pathname === '/'){
          history.push('/dashboard');
        } 
  } 
  else{
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});



