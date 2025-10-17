// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🎧 Tu configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBS4raB5EVWsOO62OQ8e_h7lmgHBKwgJEY",
  authDomain: "melodywave-cd25e.firebaseapp.com",
  projectId: "melodywave-cd25e",
  storageBucket: "melodywave-cd25e.appspot.com",
  messagingSenderId: "541667123139",
  appId: "1:541667123139:web:f3ce910a35458e6759a776",
};

// Inicializa Firebase y exporta Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
