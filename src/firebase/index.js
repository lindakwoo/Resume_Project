import firebase from "firebase"
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA-Cuzylr-muqehHCRrk4ClULircnegDCw",
    authDomain: "resume-project-14454.firebaseapp.com",
    databaseURL: "https://resume-project-14454.firebaseio.com",
    projectId: "resume-project-14454",
    storageBucket: "resume-project-14454.appspot.com",
    messagingSenderId: "42133603611",
    appId: "1:42133603611:web:d3a996fa0fc7c6ce99bfbe",
    measurementId: "G-ZXBMN8SHH4"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default};

  
  