import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWav0b1ZIHw1u8PVY02L1Gg9POA-0P3N4",
  authDomain: "vuetter-e2ace.firebaseapp.com",
  projectId: "vuetter-e2ace",
  storageBucket: "vuetter-e2ace.appspot.com",
  messagingSenderId: "485383688064",
  appId: "1:485383688064:web:5f5379487fc50830cd3b65"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export default db;
