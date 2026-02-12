import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
};

const app = initializeApp(firebaseConfig);
export const firebaseAuthService = getAuth(app);
