import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BackButton } from '@/components/back-button';

export default function VoiceStorefrontPage() {
  return (
    <div className="p-6 h-full">
      <BackButton />
      <div className="flex items-center justify-center h-full -mt-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Voice-to-Storefront</CardTitle>
            <CardDescription>
              Coming soon: Manage your products, orders, and storefront using just your voice. Perfect for artisans on the go.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground">
              Tap the button and speak commands like "Add new product" or "Check my recent orders".
            </p>
            <Button size="lg" className="rounded-full w-24 h-24">
              <Mic className="w-12 h-12" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
