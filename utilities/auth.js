var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyCXnR4jzGDqjfolEwpMYP2wd6A23Skjryk",
    authDomain: "velvet-gql-f652b.firebaseapp.com",
    projectId: "velvet-gql-f652b",
    storageBucket: "velvet-gql-f652b.appspot.com",
    messagingSenderId: "1036042642556",
    appId: "1:1036042642556:web:e8fdcabdc0dbecc84015f9",
    measurementId: "G-7QERSWE13X"
  };

  firebase.initializeApp(firebaseConfig);

async function signup(email,password){
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

  
async function login(email,password){ 
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}
async function signout(email,password){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}
module.exports ={
    signup,
    signout,
    login
}