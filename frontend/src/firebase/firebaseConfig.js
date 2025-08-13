 import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcyCcdo63T8DvRRD84_m_u4LIZLeWvJn8",
  authDomain: "digitallibrary-7b7c1.firebaseapp.com",
  projectId: "digitallibrary-7b7c1",
  storageBucket: "digitallibrary-7b7c1.appspot.com",
  messagingSenderId: "26841446369",
  appId: "1:26841446369:web:58d06778d4e74bda5244a0",
  measurementId: "G-51VTMRD7Q0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
