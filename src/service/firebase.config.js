import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBDTJtfXiZ_hy6GZ8SnA7KV0pfhCU8q1lM",
  authDomain: "social-app-fc18b.firebaseapp.com",
  projectId: "social-app-fc18b",
  storageBucket: "gs://social-app-fc18b.appspot.com",
  messagingSenderId: "564610660373",
  appId: "1:564610660373:web:fa49c82c795b19bd4d361c",
  measurementId: "G-XY3L69X5TD",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const docRef = collection(db, "status");
export const storage = getStorage();
