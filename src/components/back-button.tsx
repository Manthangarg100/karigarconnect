"use client";

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.back()} className="mb-4">
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
}
