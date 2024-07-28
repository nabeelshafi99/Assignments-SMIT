
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, addDoc, getDocs, setDoc, collection, doc, deleteDoc, updateDoc, } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyD6vEe4Wh1dvhQw6J1PpPh4fd2ZYpXqO8Q",
  authDomain: "todo-app-nabeel.firebaseapp.com",
  databaseURL: "https://todo-app-nabeel-default-rtdb.firebaseio.com",
  projectId: "todo-app-nabeel",
  storageBucket: "todo-app-nabeel.appspot.com",
  messagingSenderId: "802298040455",
  appId: "1:802298040455:web:a52352232a84e84e8ea822",
  measurementId: "G-5X7DF7PSTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  collection,
  getDocs,
  setDoc,
  addDoc,
  doc,
  deleteDoc, updateDoc,
  auth,createUserWithEmailAndPassword , signInWithEmailAndPassword
}