import firebase from "firebase"
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCFDqXdo5DjCVRYCeo-JcX94myhrGGcz1E",
  authDomain: "rezoom3.firebaseapp.com",
  databaseURL: "https://rezoom3.firebaseio.com",
  projectId: "rezoom3",
  storageBucket: "rezoom3.appspot.com",
  messagingSenderId: "221861344334",
  appId: "1:221861344334:web:ea06de51c0e3ee07237f1f",
  measurementId: "G-0TRMD28LZ7"
};

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default};

  
  