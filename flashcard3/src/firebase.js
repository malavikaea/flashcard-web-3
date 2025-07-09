import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCcfeNuBVG4pJDYDNRLVSMdZqo79ajGn0A",
  authDomain: "flashcard-8e6fa.firebaseapp.com",
  projectId: "flashcard-8e6fa",
  storageBucket: "flashcard-8e6fa.firebasestorage.app",
  messagingSenderId: "817678313887",
  appId: "1:817678313887:web:c69f2d530c3a3d70aab5aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Declare `auth` ONCE here
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔐 Export all auth utilities
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
export { auth, onAuthStateChanged };