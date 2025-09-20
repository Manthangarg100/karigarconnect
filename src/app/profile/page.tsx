"use client";

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BackButton } from '@/components/back-button';
import { artisans } from '@/lib/artisans';

export default function ArtisanProfilePage() {
    const searchParams = useSearchParams();
    const artisanId = searchParams.get('id');
    const artisan = artisans.find(a => a.id === artisanId);
    
    const products = PlaceHolderImages.filter(p => p.id.startsWith('product-'));

    if (!artisan) {
        return (
            <div className="p-6 space-y-8">
                <BackButton />
                <div className="text-center">
                    <h1 className="text-2xl font-headline">Artisan not found</h1>
                    <p className="text-muted-foreground mt-2">
                        Sorry, we couldn't find the artisan you're looking for.
                    </p>
                </div>
            </div>
        );
    }


  return (
    <div className="p-6 space-y-8">
      <BackButton />
      <header className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="w-32 h-32 border-4 border-primary">
          {artisan && <AvatarImage src={artisan.imageUrl} alt={artisan.name} data-ai-hint={artisan.imageHint} />}
          <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-headline">{artisan.name}</h1>
          <p className="text-muted-foreground mt-1">{artisan.craft} from {artisan.location}</p>
          <div className="flex gap-2 mt-4 justify-center md:justify-start">
            <Badge>Textiles</Badge>
            <Badge variant="secondary">Weaving</Badge>
            <Badge variant="secondary">Natural Dyes</Badge>
          </div>
        </div>
      </header>

      <main className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-2xl font-headline">My Story</h2>
          <p className="text-foreground/80 leading-relaxed">
            {artisan.story}
          </p>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-headline mb-4">My Creations</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <Card key={product.id} className="overflow-hidden group">
                <CardContent className="p-0">
                  <Image
                    src={product.imageUrl}
                    alt={product.description}
                    data-ai-hint={product.imageHint}
                    width={400}
                    height={400}
                    className="aspect-square object-cover w-full group-hover:scale-105 transition-transform duration-300"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
