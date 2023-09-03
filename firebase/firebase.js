import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-a7AqRcvFVReAlTlvz5ytAcerWydv--Y",
  authDomain: "fir-todo-project-1c7e4.firebaseapp.com",
  projectId: "fir-todo-project-1c7e4",
  storageBucket: "fir-todo-project-1c7e4.appspot.com",
  messagingSenderId: "575427916787",
  appId: "1:575427916787:web:50d84034ecddb9a09f5886",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
