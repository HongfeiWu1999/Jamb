// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU8bUxJv3g_dSWtshkDfaEBl-V2X428_E",
  authDomain: "jamb-387717.firebaseapp.com",
  projectId: "jamb-387717",
  storageBucket: "jamb-387717.appspot.com",
  messagingSenderId: "961179868263",
  appId: "1:961179868263:web:3ca2c0416e13c67d1dc8c2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
