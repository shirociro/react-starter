import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseAuthService } from "@/shared/services/firebaseClient";

export const authFirebase = {
  login: (email: string, password: string) =>
    signInWithEmailAndPassword(firebaseAuthService, email, password),

  register: (email: string, password: string) =>
    createUserWithEmailAndPassword(firebaseAuthService, email, password),

  logout: () => signOut(firebaseAuthService),
};
