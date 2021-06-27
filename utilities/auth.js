var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/auth");

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
    let user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
    return user;
}

async function getCurrentUser() {
    let user = await firebase.auth().currentUser;
    return user;
}
  
async function login(email,password){ 
    let status = await firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
    return status;
}
async function signout(){
    await firebase.auth().signOut().catch((error) => {
        console.error(err);
    });
}


login('adityalm1@gmail.com', '123456').then((us) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          console.log(uid);
          // ...
        } else {
          // User is signed out
          console.log("No user");
          // ...
        }
    });
});


  

module.exports ={
    signup,
    signout,
    login,
    getCurrentUser,
    firebase,
};