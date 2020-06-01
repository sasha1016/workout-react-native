
const firebase = require('firebase') ; 

var firebaseConfig = {
    apiKey: "AIzaSyCXmA81q_KgdJt3-AReVhL-GlN_i6coS60",
    authDomain: "skrtr-2ae42.firebaseapp.com",
    databaseURL: "https://skrtr-2ae42.firebaseio.com",
    projectId: "skrtr-2ae42",
    storageBucket: "skrtr-2ae42.appspot.com",
    messagingSenderId: "1096385567564",
    appId: "1:1096385567564:web:07c3a4a334e63ef168cde9",
    measurementId: "G-LR9TFRSBG1"
};
    // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase ; 
