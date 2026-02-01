import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "../../../shared/services/firebaseClient";

export const authFirebase = {
  login: (email: string, password: string) =>
    signInWithEmailAndPassword(firebaseAuth, email, password),

  register: (email: string, password: string) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password),

  logout: () => signOut(firebaseAuth),
};
