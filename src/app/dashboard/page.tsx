import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, PenSquare } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Welcome, Artisan!</CardTitle>
                    <CardDescription>Here's a quick overview of your store. Use the AI tools in the sidebar to grow your business.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>You can start by enhancing your product images or by generating compelling stories for your crafts.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/visual-enhancer">
                            <Card className="hover:bg-accent/50 transition-colors">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl font-headline">
                                        <Sparkles className="text-primary" />
                                        AI Visual Enhancer
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">Automatically create beautiful lifestyle photos of your products.</p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/story-weaver">
                             <Card className="hover:bg-accent/50 transition-colors">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl font-headline">
                                        <PenSquare className="text-primary" />
                                        AI Story Weaver
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                     <p className="text-sm text-muted-foreground">Craft compelling descriptions and stories for your products.</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
