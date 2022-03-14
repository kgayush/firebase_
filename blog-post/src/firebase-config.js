// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC0E7nOXH4uD-Q5nYbgsH3VJKSbt20VKSs",
  authDomain: "blog-post-c241b.firebaseapp.com",
  projectId: "blog-post-c241b",
  storageBucket: "blog-post-c241b.appspot.com",
  messagingSenderId: "483892888781",
  appId: "1:483892888781:web:147173cfd27f6925101584"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider;
