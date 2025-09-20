"use server";

import { signInWithEmail, signInWithGoogle, signUpWithEmail, signOut as firebaseSignOut } from "@/lib/firebase/auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});


export async function googleLogin() {
  // This is a client-side flow. The server action is a passthrough.
  // The actual implementation is in the login page component.
  const result = await signInWithGoogle();
  if (result.user) {
    return { success: true, user: result.user };
  }
  return { success: false, error: result.error };
}

export async function emailLogin(values: z.infer<typeof loginSchema>) {
  const validated = loginSchema.safeParse(values);
  if (!validated.success) {
      return { success: false, error: "Invalid input." };
  }
  const { email, password } = validated.data;
  const result = await signInWithEmail(email, password);
  if (result.user) {
    return { success: true, user: result.user };
  }
  return { success: false, error: result.error };
}

export async function emailSignUp(values: z.infer<typeof signupSchema>) {
   const validated = signupSchema.safeParse(values);
   if (!validated.success) {
       return { success: false, error: "Invalid input." };
   }
   const { name, email, password } = validated.data;
   const result = await signUpWithEmail(email, password);
   if (result.user) {
    return { success: true, user: result.user };
  }
  return { success: false, error: result.error };
}

export async function signOut() {
    const result = await firebaseSignOut();
    if(result.success) {
        return { success: true };
    }
    return { success: false, error: result.error };
}