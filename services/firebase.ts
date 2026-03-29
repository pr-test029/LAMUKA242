
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp, 
  deleteDoc, 
  doc, 
  updateDoc, 
  increment, 
  limit, 
  where, 
  getDoc 
} from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";

const firebaseConfig = {
  apiKey: "AIzaSyDdBudVEEm-2bpqMh1kZBdpaX9bLkznW14",
  authDomain: "lamuka-officiel.firebaseapp.com",
  projectId: "lamuka-officiel",
  storageBucket: "lamuka-officiel.firebasestorage.app",
  messagingSenderId: "851287400173",
  appId: "1:851287400173:web:852b5b91988bf9522d76e4",
  measurementId: "G-7CMBKGHF9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Gemini AI Setup
const GEMINI_API_KEY = "AIzaSyBgQVfJtMCzm7-sLfWJMyZHetI8eE9g1MI";
export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp, 
  deleteDoc, 
  doc, 
  updateDoc, 
  increment, 
  limit, 
  where, 
  getDoc 
};
