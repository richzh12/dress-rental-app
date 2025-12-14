import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const logout = () => signOut(auth)

export const onAuthChange = (callback) =>
  onAuthStateChanged(auth, callback)
