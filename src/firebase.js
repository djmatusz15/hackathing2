// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALtleitDyvGSWoCFI5sq4jXghRg6fkh_g",
  authDomain: "hack-a-thing2-6656e.firebaseapp.com",
  projectId: "hack-a-thing2-6656e",
  storageBucket: "hack-a-thing2-6656e.appspot.com",
  messagingSenderId: "453468953745",
  appId: "1:453468953745:web:7531de6acc486ecbfdf330",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
