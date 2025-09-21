import { BackButton } from '@/components/back-button';
import { SocialCopyGeneratorClient } from '@/components/social-copy-generator-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export default function SocialCopyGeneratorPage() {
  return (
    <div className="p-6">
      <BackButton />
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <TrendingUp className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline text-3xl">AI Social Copy Generator</CardTitle>
            </div>
          <CardDescription>
            Generate trendy captions and hashtags for your products based on the latest trends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SocialCopyGeneratorClient />
        </CardContent>
      </Card>
    </div>
  );
}
