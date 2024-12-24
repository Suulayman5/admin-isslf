import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBpDB8jA3ekeBKROLkMbq1Kcw7RGWoRYDI",
    authDomain: "task-1bc29.firebaseapp.com",
    projectId: "task-1bc29",
    storageBucket: "task-1bc29.firebasestorage.app",
    messagingSenderId: "1008130769868",
    appId: "1:1008130769868:web:424ef9bd4d6880d8241369",
    measurementId: "G-TTW152FBRK"
  };
  
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
