// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// import { getFireStore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5u6XIHAh-FZPdNH7FOeTQ3P4MNADjmC0",
  authDomain: "react-electron-chat-app-507f3.firebaseapp.com",
  projectId: "react-electron-chat-app-507f3",
  storageBucket: "react-electron-chat-app-507f3.appspot.com",
  messagingSenderId: "1096161771425",
  appId: "1:1096161771425:web:b7723c64ccdab0f3ff15e0",
  measurementId: "G-SFJ5QW7QW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);