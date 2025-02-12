// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSwmUdePpsHz8wVHxMXq2aMVyElifvz1U",
  authDomain: "splam-e35c5.firebaseapp.com",
  projectId: "splam-e35c5",
  storageBucket: "splam-e35c5.firebasestorage.app",
  messagingSenderId: "141834205985",
  appId: "1:141834205985:web:c85643d51deb7667f61c60",
  measurementId: "G-3PSEVF8T4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);  // Initialize Firestore

const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth, db };  // Export auth and db (Firestore)
