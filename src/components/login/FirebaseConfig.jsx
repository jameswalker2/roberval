import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC7jz27uM_kGehi4EBUjiDy3IZ_Z3yGsLc",
    authDomain: "roberval-e10d1.firebaseapp.com",
    projectId: "roberval-e10d1",
    storageBucket: "roberval-e10d1.appspot.com",
    messagingSenderId: "745026007705",
    appId: "1:745026007705:web:830e11cf08e6fcf269fe08",
    measurementId: "G-8WKT380PKF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
