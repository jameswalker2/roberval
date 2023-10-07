import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'


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
// const analytics = getAnalytics(app);
export const database = getAuth(app)