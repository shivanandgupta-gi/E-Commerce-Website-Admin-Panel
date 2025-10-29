//for google login firebase
const VITE_FIREBASE_APP_APIKEY=import.meta.env.VITE_FIREBASE_APP_APIKEY
const VITE_FIREBASE_APP_AUTHDOMAIN=import.meta.env.VITE_FIREBASE_APP_AUTHDOMAIN
const VITE_FIREBASE_APP_PROJECT_ID=import.meta.env.VITE_FIREBASE_APP_PROJECT_ID
const VITE_FIREBASE_APP_STORAGE_BUCKET=import.meta.env.VITE_FIREBASE_APP_STORAGE_BUCKET
const VITE_FIREBASE_APP_MESSAGING_SENDER_ID=import.meta.env.VITE_FIREBASE_APP_MESSAGING_SENDER_ID
const VITE_FIREBASE_APP_APP_ID=import.meta.env.VITE_FIREBASE_APP_APP_ID


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_FIREBASE_APP_APIKEY,
  authDomain: VITE_FIREBASE_APP_AUTHDOMAIN,
  projectId:VITE_FIREBASE_APP_PROJECT_ID,
  storageBucket: VITE_FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_APP_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_APP_ID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);