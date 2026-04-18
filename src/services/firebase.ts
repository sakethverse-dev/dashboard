import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxHbyEd22l5AxhVZmrOJUQd3B9-qxTRzA",
  authDomain: "campus-activities-e19b2.firebaseapp.com",
  projectId: "campus-activities-e19b2",
  storageBucket: "campus-activities-e19b2.firebasestorage.app",
  messagingSenderId: "118414672005",
  appId: "1:118414672005:web:47b0ce21a1163e6103a9ec",
  measurementId: "G-DGHYV3Y660"
};

// Initialize Firebase (checking if app already exists to prevent duplicate-app error in HMR)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };