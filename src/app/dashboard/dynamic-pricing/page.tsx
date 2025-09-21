import { BackButton } from '@/components/back-button';
import { DynamicPricingClient } from '@/components/dynamic-pricing-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CircleDollarSign } from 'lucide-react';

export default function DynamicPricingPage() {
  return (
    <div className="p-6">
      <BackButton />
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <CircleDollarSign className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline text-3xl">AI Dynamic Pricing Advisor</CardTitle>
            </div>
          <CardDescription>
            Get intelligent pricing recommendations for your products based on materials, category, and target market.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DynamicPricingClient />
        </CardContent>
      </Card>
    </div>
  );
}
