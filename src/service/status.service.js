import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, docRef } from "./firebase.config";

export const statusServ = {
  getStt: () => {
    let q = query(docRef, orderBy("createdAt", "desc"));
    return getDocs(q);
  },
  post: (status) => {
    return addDoc(docRef, {
      ...status,
      createdAt: Timestamp.now(),
    });
  },
  update: (status, id) => {
    return updateDoc(doc(docRef, id), { ...status });
  },
  delete: (id) => {
    return deleteDoc(doc(docRef, id));
  },
};
