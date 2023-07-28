// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD3o1rFgP0bD5oeeOK_G5U6KLFWGpnzcE",
  authDomain: "adr-backend-dash.firebaseapp.com",
  projectId: "adr-backend-dash",
  storageBucket: "adr-backend-dash.appspot.com",
  messagingSenderId: "209411334272",
  appId: "1:209411334272:web:c08f6ed90d65fbe2120665"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
