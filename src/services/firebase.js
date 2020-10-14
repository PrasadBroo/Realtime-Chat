import firebase from "firebase/app";
import "firebase/auth";


var firebaseConfig = {
    apiKey: "AIzaSyBeidjyhC5nmk9IxCuUO2YzwA77I29TJxU",
    authDomain: "fir-login-807c4.firebaseapp.com",
    databaseURL: "https://fir-login-807c4.firebaseio.com",
    projectId: "fir-login-807c4",
    storageBucket: "fir-login-807c4.appspot.com",
    messagingSenderId: "782150749326",
    appId: "1:782150749326:web:b8cfadd35124b6f22f0ddf"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export const auth = firebase.auth;