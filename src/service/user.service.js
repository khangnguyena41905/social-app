import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase.config";

const provider = new GoogleAuthProvider();

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
  googleLogin: () => {
    return signInWithPopup(auth, provider);
  },
};
