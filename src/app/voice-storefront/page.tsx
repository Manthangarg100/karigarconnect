"use client";

import { Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BackButton } from '@/components/back-button';

export default function VoiceStorefrontPage() {
  return (
    <div className="p-6 h-full">
      <BackButton />
      <div className="flex items-center justify-center h-full -mt-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
             <div className="flex flex-col items-center gap-4">
                 <Mic className="w-12 h-12 text-primary" />
                <CardTitle className="font-headline text-3xl">Voice-to-Storefront</CardTitle>
             </div>
            <CardDescription>
              Manage your products, orders, and storefront using just your voice. Perfect for artisans on the go.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="bg-secondary/50 p-6 rounded-lg w-full">
                <h3 className="text-xl font-semibold text-center">Coming Soon!</h3>
                <p className="text-muted-foreground text-center mt-2">This feature is currently under development.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
