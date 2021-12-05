import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtSwWpIzj01DNufUrLPgxtpEHrCOmLF6o",
  authDomain: "vetri-whatsapp-clone.firebaseapp.com",
  projectId: "vetri-whatsapp-clone",
  storageBucket: "vetri-whatsapp-clone.appspot.com",
  messagingSenderId: "1079114073554",
  appId: "1:1079114073554:web:e451c743e9a72f3399f40b",
  measurementId: "G-E1XD91QQFF",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
