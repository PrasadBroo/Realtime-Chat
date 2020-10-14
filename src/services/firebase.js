import firebase from "firebase/app";
import "firebase/auth";


var firebaseConfig = {
    apiKey: "AIzaSyAkluxZQF94qVir5gboMdWB6isQTV7fDnY",
    authDomain: "realtime-chat-c1b78.firebaseapp.com",
    databaseURL: "https://realtime-chat-c1b78.firebaseio.com",
    projectId: "realtime-chat-c1b78",
    storageBucket: "realtime-chat-c1b78.appspot.com",
    messagingSenderId: "612232899709",
    appId: "1:612232899709:web:5a7fde4b9fd3a6418b1514"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;