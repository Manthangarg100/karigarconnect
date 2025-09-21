import { ImageStudioClient } from '@/components/image-studio-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BackButton } from '@/components/back-button';

export default function ImageStudioPage() {
  return (
    <div className="p-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">AI Image Studio</CardTitle>
          <CardDescription>
            Describe the product image you want to create. Be as specific as possible for the best results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageStudioClient />
        </CardContent>
      </Card>
    </div>
  );
}
