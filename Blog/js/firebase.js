// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { getFirestore, getDocs , getDoc, collection, addDoc, setDoc , doc  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import { getStorage, ref, uploadBytes ,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBg8lnjtlHVpzMqD9zjtdu60XYy8MINg-Q",
    authDomain: "nsblog-nabeelshafi.firebaseapp.com",
    projectId: "nsblog-nabeelshafi",
    storageBucket: "nsblog-nabeelshafi.appspot.com",
    messagingSenderId: "732003960826",
    appId: "1:732003960826:web:b70beab67176545ec24643"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)


export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    db,
    collection,
    doc,
    addDoc,
    setDoc,
    getDocs,
    getDoc,
    storage,
    ref,
    uploadBytes,
    getDownloadURL,

}