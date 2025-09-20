import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BackButton } from '@/components/back-button';

const artisanAvatar = PlaceHolderImages.find(p => p.id === 'artisan-avatar');
const products = PlaceHolderImages.filter(p => p.id.startsWith('product-'));

export default function ArtisanProfilePage() {
  return (
    <div className="p-6 space-y-8">
      <BackButton />
      <header className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="w-32 h-32 border-4 border-primary">
          {artisanAvatar && <AvatarImage src={artisanAvatar.imageUrl} alt="Artisan" data-ai-hint={artisanAvatar.imageHint} />}
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-headline">Aanya Sharma</h1>
          <p className="text-muted-foreground mt-1">Master Weaver from Varanasi</p>
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
            From the vibrant heart of Varanasi, I bring you threads of tradition woven into contemporary tales. For generations, my family has practiced the art of weaving, a legacy passed down from my grandmother. Each piece is a canvas where I paint with threads, using ancient techniques and natural dyes sourced from my own garden. My craft is not just a profession; it's a prayer, a connection to my roots, and a story I want to share with the world.
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
