import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyAaPyddYAkx87YM-xz16H2j2W7TBkX2TVc",
  authDomain: "journal-app-b75b6.firebaseapp.com",
  projectId: "journal-app-b75b6",
  storageBucket: "journal-app-b75b6.appspot.com",
  messagingSenderId: "776138519754",
  appId: "1:776138519754:web:36f9c595b16f2e785bf033"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)

