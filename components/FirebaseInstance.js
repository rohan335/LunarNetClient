// database/firebaseDb.js
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDP4vAsuuS5CkufWwP__tttR2Kx3YO6klg",
    authDomain: "lunarnetclients.firebaseapp.com",
    projectId: "lunarnetclients",
    storageBucket: "lunarnetclients.appspot.com",
    messagingSenderId: "360781943002",
    appId: "1:360781943002:web:a2341dd3bf1604e305d5e3",
    measurementId: "G-M054R3MWHT"
};

firebase.initializeApp(firebaseConfig);

export default firebase;