import { TranslatorClient } from '@/components/translator-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BackButton } from '@/components/back-button';
import { Languages } from 'lucide-react';

export default function TranslatorPage() {
  return (
    <div className="p-6">
      <BackButton />
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <Languages className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline text-3xl">AI Cross-Cultural Translator</CardTitle>
            </div>
          <CardDescription>
            Translate your product story for a global audience. The AI will adapt your message to be culturally resonant with different buyers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TranslatorClient />
        </CardContent>
      </Card>
    </div>
  );
}
