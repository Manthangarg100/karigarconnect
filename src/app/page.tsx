import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card shadow-sm">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <span className="text-2xl font-headline font-bold">KalaSetu</span>
        </Link>
        <p className="text-muted-foreground ml-4 hidden md:block">Bridging Artisans to the World</p>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Shop
          </Link>
          <Button>Artisan Dashboard</Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[80vh]">
          <Image
            src="https://picsum.photos/seed/paris/1920/1080"
            alt="Hero"
            fill
            className="object-cover"
            data-ai-hint="paris street"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold">The Soul of India, Handcrafted for You.</h1>
            <p className="mt-4 max-w-2xl">
              Discover authentic crafts from the heart of India. Support local artisans and bring home a piece of timeless
              heritage.
            </p>
            <Button size="lg" className="mt-8">
              Explore Crafts
            </Button>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl font-headline">Shop by Category</h2>
            <div className="mx-auto grid max-w-5xl grid-cols-2 items-center justify-center gap-6 py-12 sm:grid-cols-4 lg:gap-12">
              <Button variant="secondary" size="lg">Textiles</Button>
              <Button variant="secondary" size="lg">Pottery</Button>
              <Button variant="secondary" size="lg">Jewelry</Button>
              <Button variant="secondary" size="lg">Décor</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-black text-white">
        <p className="text-xs text-muted-foreground">&copy; 2024 KalaSetu. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
