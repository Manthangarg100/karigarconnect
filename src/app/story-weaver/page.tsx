import { StoryWeaverClient } from '@/components/story-weaver-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function StoryWeaverPage() {
  return (
    <div className="p-6">
       <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">AI Story Weaver</CardTitle>
          <CardDescription>
            Enter a product name and some keywords to generate a compelling description that highlights its cultural heritage and craftsmanship.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StoryWeaverClient />
        </CardContent>
      </Card>
    </div>
  );
}
