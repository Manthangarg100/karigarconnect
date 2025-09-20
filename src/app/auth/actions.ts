"use server";

import { signOut as firebaseSignOut } from "@/lib/firebase/auth";

export async function signOut() {
    const result = await firebaseSignOut();
    if(result.success) {
        return { success: true };
    }
    return { success: false, error: result.error };
}
