import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Sparkles, PenSquare, Mic, Megaphone, User, DollarSign, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Visual Enhancer",
    description: "Automatically enhance product photos for a professional look.",
    link: "/visual-enhancer",
  },
  {
    icon: PenSquare,
    title: "AI Story Weaver",
    description: "Generate compelling product descriptions and artisan stories.",
    link: "/story-weaver",
  },
  {
    icon: Mic,
    title: "Voice-to-Storefront",
    description: "Manage your storefront easily using voice commands.",
    link: "/voice-storefront",
  },
  {
    icon: Megaphone,
    title: "Marketing Tool",
    description: "Create marketing strategies to attract a broader audience.",
    link: "/marketing-tool",
  },
  {
    icon: User,
    title: "Artisan Profile",
    description: "Showcase your background, skills, and unique story.",
    link: "/profile",
  },
  {
    icon: DollarSign,
    title: "Transactions",
    description: "A secure system to manage your earnings and payments.",
    link: "/transactions",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col h-full bg-background">
      <header className="p-6">
        <h1 className="text-4xl font-headline text-foreground">Welcome to CraftConnect AI</h1>
        <p className="text-muted-foreground mt-2">Empowering local artisans with the power of AI.</p>
      </header>
      <main className="flex-1 p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <feature.icon className="w-8 h-8 text-primary" />
                <CardTitle className="font-headline">{feature.title}</CardTitle>
              </div>
              <CardDescription className="pt-2">{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Link href={feature.link} className="w-full">
                <Button variant="outline" className="w-full">
                  Go to Feature <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
