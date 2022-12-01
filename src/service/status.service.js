import {
  addDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db, docRef } from "./firebase.config";

export const statusServ = {
  getStt: (callback) => {
    let q = query(docRef, orderBy("createdAt", "desc"));
    return onSnapshot(q, callback);
  },
  post: (status) => {
    return addDoc(docRef, {
      ...status,
      createdAt: Timestamp.now(),
    });
  },
};
