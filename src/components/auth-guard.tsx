
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// This is a temporary bypass for development.
// In a real app, you would use Firebase Auth to check the user's session.
const useMockAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to logged in
    const [loading, setLoading] = useState(false);
    
    // Simulate a check
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setIsLoggedIn(true);
            setLoading(false);
        }, 500);
    }, []);

    return { loading, isLoggedIn };
};


export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { loading, isLoggedIn } = useMockAuth();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [loading, isLoggedIn, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // or a redirect component
  }

  return <>{children}</>;
}
