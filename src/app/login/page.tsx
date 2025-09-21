import { Suspense } from 'react';
import { LoginForm } from '@/components/login-form';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="animate-spin" /></div>}>
        <LoginForm />
    </Suspense>
  );
}
