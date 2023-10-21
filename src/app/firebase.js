// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEYFIREBASE,
  authDomain: process.env.AUTHDOMAINFIREBASE,
  projectId: process.env.PROJECTIDFIREBASE,
  storageBucket: process.env.STORAGEBUCKETFIREBASE,
  messagingSenderId: process.env.MESSAGINGSENDERIDFIREBASE,
  appId: process.env.APPIDFIREBASE,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp }