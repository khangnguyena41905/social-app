import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase.config";

export const userServ = {
  userLogin: ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  userSignUp: ({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },
  userLogOut: () => {
    return signOut(auth);
  },
};
