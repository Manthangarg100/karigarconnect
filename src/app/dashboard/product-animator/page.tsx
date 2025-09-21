import { ProductAnimatorClient } from '@/components/product-animator-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BackButton } from '@/components/back-button';

export default function ProductAnimatorPage() {
  return (
    <div className="p-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">AI Product Animator</CardTitle>
          <CardDescription>
            Bring your product to life. Describe a short video you want to create, and the AI will generate it for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductAnimatorClient />
        </CardContent>
      </Card>
    </div>
  );
}
