import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB8Hw2xxveAjLC5p5NLrDYKWupr6Io38-c",
    authDomain: "sweet-a78be.firebaseapp.com",
    projectId: "sweet-a78be",
    storageBucket: "sweet-a78be.appspot.com",
    messagingSenderId: "47825999325",
    appId: "1:47825999325:web:d29e0e554cd60457ab1234",
    measurementId: "G-PJFMSCQVM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);