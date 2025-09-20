import { BackButton } from '@/components/back-button';
import { MarketingToolClient } from '@/components/marketing-tool-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function MarketingToolPage() {
  return (
    <div className="p-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">AI Marketing Assistant</CardTitle>
          <CardDescription>
            Generate engaging social media posts for your products. Just enter some details and let the AI do the rest.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MarketingToolClient />
        </CardContent>
      </Card>
    </div>
  );
}
