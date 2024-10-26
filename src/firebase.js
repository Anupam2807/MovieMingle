import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD47ubtxM9pyrB-um0Vkc-b707CBk_LqR8",
  authDomain: "moviemingle-9e720.firebaseapp.com",
  projectId: "moviemingle-9e720",
  storageBucket: "moviemingle-9e720.appspot.com",
  messagingSenderId: "948160974035",
  appId: "1:948160974035:web:57582f174091cc14a11826",
  measurementId: "G-GP4WPK2P0T"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
