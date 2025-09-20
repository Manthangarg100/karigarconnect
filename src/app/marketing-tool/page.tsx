import { Megaphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BackButton } from '@/components/back-button';

export default function MarketingToolPage() {
  return (
    <div className="p-6 h-full">
        <BackButton />
        <div className="flex items-center justify-center h-full -mt-12">
            <Card className="w-full max-w-md text-center">
                <CardHeader className="items-center">
                <Megaphone className="w-12 h-12 text-primary" />
                <CardTitle className="font-headline text-3xl">Digital Marketing Tool</CardTitle>
                <CardDescription>
                    This feature is under development.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">
                    Soon, you'll be able to get AI-powered assistance for creating social media posts, email newsletters, and other marketing content to help you reach a wider audience and grow your business.
                </p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
