"use client";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  type User
} from "firebase/auth";
import { auth } from "./client";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return { user: result.user };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const signUpWithEmail = async (email: string, password: string):Promise<{user?: User | null, error?: string}> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { user: result.user };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<{user?: User | null, error?: string}> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user };
  } catch (error: any) {
    return { error: error.message };
  }
};


export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const onAuthChanges = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
}
