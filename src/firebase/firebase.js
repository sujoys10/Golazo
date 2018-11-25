import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyB-gDCWXGl03Vpj8k4CqqmjKtKFSs--a64",
  authDomain: "golazo-sporty.firebaseapp.com",
  databaseURL: "https://golazo-sporty.firebaseio.com",
  projectId: "golazo-sporty",
  storageBucket: "golazo-sporty.appspot.com",
  messagingSenderId: "626587600444"
};

firebase.initializeApp(config);
const storage = firebase.storage();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase,googleAuthProvider, storage };