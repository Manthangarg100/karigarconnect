import { GrantAdvisorClient } from '@/components/grant-advisor-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BackButton } from '@/components/back-button';

export default function GrantAdvisorPage() {
  return (
    <div className="p-6">
       <BackButton />
       <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">AI Grant & Scheme Advisor</CardTitle>
          <CardDescription>
            Discover financial support, grants, and government schemes available for your craft and location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GrantAdvisorClient />
        </CardContent>
      </Card>
    </div>
  );
}
