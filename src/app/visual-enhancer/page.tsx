import { VisualEnhancerClient } from '@/components/visual-enhancer-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BackButton } from '@/components/back-button';

export default function VisualEnhancerPage() {
  return (
    <div className="p-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">AI Visual Enhancer</CardTitle>
          <CardDescription>
            Upload a product photo to automatically remove the background, adjust lighting, and generate a lifestyle mockup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VisualEnhancerClient />
        </CardContent>
      </Card>
    </div>
  );
}
