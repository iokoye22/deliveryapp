// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLE9-LEjHTkXIhXYAaEXB-nQrk9fN8C5c",
  authDomain: "pharmacy-deliveryapp.firebaseapp.com",
  projectId: "pharmacy-deliveryapp",
  storageBucket: "pharmacy-deliveryapp.firebasestorage.app",
  messagingSenderId: "721096145829",
  appId: "1:721096145829:web:56df568d7381a514f1864c",
  measurementId: "G-PG4ZLW2MGQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);