import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAy1swv84tINM9-YdsYHYbAX4L6hUIsNoI",
  authDomain: "shoutouts-99f76.firebaseapp.com",
  projectId: "shoutouts-99f76",
  storageBucket: "shoutouts-99f76.appspot.com",
  messagingSenderId: "96440963708",
  appId: "1:96440963708:web:625ede2454900e67e6eff9",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}

export const storage = getStorage(app);
