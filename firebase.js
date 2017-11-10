import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBjoTOHGREN02gf457lgKVjKD8DZfTvPDs",
    authDomain: "reactnative-todo-9f7f0.firebaseapp.com",
    databaseURL: "https://reactnative-todo-9f7f0.firebaseio.com",
    projectId: "reactnative-todo-9f7f0",
    storageBucket: "reactnative-todo-9f7f0.appspot.com",
    messagingSenderId: "1000990672369"
  }

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const auth = firebase.auth();
export const database = firebase.database().ref();
