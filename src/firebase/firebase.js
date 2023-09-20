// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8ZDTt2Egg9awEh4Lhbrsl3jWldwGNPOk",
  authDomain: "listen-4e25b.firebaseapp.com",
  projectId: "listen-4e25b",
  storageBucket: "listen-4e25b.appspot.com",
  messagingSenderId: "289487682428",
  appId: "1:289487682428:web:5240a0a7760fc0b32342f9",
  measurementId: "G-RDDXWQLG7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {db};