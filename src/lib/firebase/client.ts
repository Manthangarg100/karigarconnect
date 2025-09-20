// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "studio-4704698873-41610",
  "appId": "1:492794398934:web:53f3796da2eb5c3a9b2177",
  "apiKey": "AIzaSyC7sDts2O0DMtQ3jNKvZJcGe2WSyW-g8_U",
  "authDomain": "studio-4704698873-41610.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "492794398934"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
