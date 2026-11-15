import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZ8HfBlDvwU1Goei5znzygMkyEGAakw2Y",
  authDomain: "productos-fb.firebaseapp.com",
  projectId: "productos-fb",
  storageBucket: "productos-fb.firebasestorage.app",
  messagingSenderId: "433643580313",
  appId: "1:433643580313:web:8129ab33b2629659f20108",
  measurementId: "G-MN87TLEGEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
