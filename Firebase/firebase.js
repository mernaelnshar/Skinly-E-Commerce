import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCcgIdo-Jxabr2RMK0IWqYt3mFC-vLLnsM",
    authDomain: "skinly-1fee8.firebaseapp.com",
    projectId: "skinly-1fee8",
    storageBucket: "skinly-1fee8.firebasestorage.app",
    messagingSenderId: "1090836493511",
    appId: "1:1090836493511:web:4b41c660a0c9c72e37fae2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };