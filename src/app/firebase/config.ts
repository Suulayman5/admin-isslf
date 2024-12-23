import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AAIzaSyBpDB8jA3ekeBKROLkMbq1Kcw7RGWoRYDI", // Replace with your Web API Key
    authDomain: "sample-firebase-app-eb7a4.firebaseapp.com", // Replace with your Firebase Auth Domain
    projectId: "task-1bc29", // Replace with your Project ID
    storageBucket: "sample-firebase-app-eb7a4.appspot.com", // Replace with your Firebase Storage Bucket
    messagingSenderId: "1008130769868", // Replace with your Messaging Sender ID
    appId: "1:1049874841148:web:1d3eaa0123b5467f2ea8a3", // Replace with your App ID (you can find it in Firebase console)
  };
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
