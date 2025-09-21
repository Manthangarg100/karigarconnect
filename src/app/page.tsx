import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Mic, BookOpen, CircleDollarSign, Languages, Megaphone, Award, MapPin } from 'lucide-react';
import { Logo } from '@/components/logo';
import { artisans, Artisan } from '@/lib/artisans';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const tools = [
    { icon: Mic, title: 'Voice-to-Storefront', href: '/voice-storefront' },
    { icon: BookOpen, title: 'AI Storytelling', href: '/story-weaver' },
    { icon: CircleDollarSign, title: 'Dynamic Pricing Advisor', href: '/dashboard/dynamic-pricing' },
    { icon: Languages, title: 'Cross-Cultural Translator', href: '#' },
    { icon: Megaphone, title: 'Marketing Assistant', href: '/marketing-tool' },
    { icon: Award, title: 'Grant & Scheme Advisor', href: '/grant-advisor' },
];

export default function Home() {
    const products = PlaceHolderImages.filter(p => p.id.startsWith('product-')).slice(0, 3);
    const featuredArtisans = artisans.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo />
          <span className="sr-only">KarigarConnect</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Marketplace
          </Link>
          <Link href="/matchmaking" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Artisan Directory
          </Link>
        </nav>
        <div className="ml-auto lg:ml-6 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Join as Artisan</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-4">
              <p className="text-muted-foreground">Powered by AI - Crafted by Tradition</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Empowering <span className="text-primary">Indian Artisans</span> with AI
              </h1>
              <p className="max-w-lg text-muted-foreground">
                Connect traditional craftsmanship with modern technology. Help artisans reach a wider global market and preserve cultural heritage through AI-powered tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="#">
                  <Button size="lg">Explore Marketplace <ArrowRight className="ml-2" /></Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline">Artisan Dashboard</Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
               <Image
                    src="https://picsum.photos/seed/indian-artisan/600/400"
                    alt="Indian Artisans at work"
                    width={600}
                    height={400}
                    className="rounded-lg object-cover"
                    data-ai-hint="indian artisan"
                />
                 <Card className="absolute -bottom-8 right-8 flex items-center gap-4 p-4 w-64">
                    <div className="flex -space-x-2">
                        <Image src="https://picsum.photos/seed/user1/40/40" width={40} height={40} alt="User 1" className="rounded-full border-2 border-white" />
                        <Image src="https://picsum.photos/seed/user2/40/40" width={40} height={40} alt="User 2" className="rounded-full border-2 border-white" />
                        <Image src="https://picsum.photos/seed/user3/40/40" width={40} height={40} alt="User 3" className="rounded-full border-2 border-white" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">10,000+</p>
                        <p className="text-sm text-muted-foreground">Artisans Connected</p>
                    </div>
                </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">A Full Suite of AI-Powered Tools</h2>
            <div className="mx-auto grid max-w-5xl grid-cols-2 md:grid-cols-3 gap-6 py-12">
              {tools.map((tool) => (
                <Link href={tool.href} key={tool.title}>
                  <Card className="p-6 flex flex-col items-center justify-center text-center gap-2 hover:shadow-md transition-shadow h-full">
                    <tool.icon className="w-8 h-8 text-primary" />
                    <p className="font-semibold">{tool.title}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Creations</h2>
                    <Button variant="link" className="text-primary">View All <ArrowRight className="ml-2" /></Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {products.map(product => (
                    <Card key={product.id} className="overflow-hidden group">
                      <CardContent className="p-0">
                        <Image
                          src={product.imageUrl}
                          alt={product.description}
                          width={400}
                          height={400}
                          className="aspect-square object-cover w-full group-hover:scale-105 transition-transform duration-300"
                          data-ai-hint={product.imageHint}
                        />
                      </CardContent>
                       <CardHeader>
                          <CardTitle>{product.description}</CardTitle>
                        </CardHeader>
                    </Card>
                  ))}
                </div>
            </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet the Artisans</h2>
                    <Link href="/matchmaking">
                        <Button variant="link" className="text-primary">View All Artisans<ArrowRight className="ml-2" /></Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {featuredArtisans.map(artisan => (
                    <Link href={`/profile?id=${artisan.id}`} key={artisan.id}>
                      <Card className="overflow-hidden group">
                         <CardHeader className="flex-row items-center gap-4">
                            <Avatar className="w-16 h-16">
                                <AvatarImage src={artisan.imageUrl} alt={artisan.name} data-ai-hint={artisan.imageHint} />
                                <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{artisan.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{artisan.craft}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-3">{artisan.story}</p>
                           <p className="text-sm text-primary flex items-center pt-4 font-semibold">
                            Read their story
                            <ArrowRight className="w-4 h-4 ml-2" />
                           </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
            </div>
        </section>


        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/90 text-primary-foreground">
             <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Transform Your Craft Business?</h2>
                <p className="max-w-3xl mx-auto mt-4 text-primary-foreground/80">
                    Join thousands of artisans who are already using AI to tell their stories, connect with buyers, and grow their traditional craft businesses.
                </p>
                <Link href="/story-weaver">
                    <Button size="lg" variant="secondary" className="mt-8 bg-card text-card-foreground hover:bg-card/90">Start Your Story</Button>
                </Link>
            </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
         <div className="flex items-center">
             <Logo />
         </div>
        <p className="text-xs text-muted-foreground sm:ml-auto">Empowering Indian Artisans through AI technology.</p>
      </footer>
    </div>
  );
}
