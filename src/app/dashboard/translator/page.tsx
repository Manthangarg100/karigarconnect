import { BackButton } from '@/components/back-button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
            Adapt your product stories for a global audience, ensuring your message resonates across different cultures.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
            <h2 className="text-2xl font-semibold">Coming Soon!</h2>
            <p className="mt-2">This powerful translation tool is currently under construction.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
