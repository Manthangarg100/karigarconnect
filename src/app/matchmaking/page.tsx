import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Search } from 'lucide-react';
import { artisans } from '@/lib/artisans';
import { BackButton } from '@/components/back-button';

export default function MatchmakingPage() {
  return (
    <div className="p-6 space-y-8">
      <BackButton />
      <header className="space-y-4 text-center">
        <h1 className="text-4xl font-headline">Artisan Directory</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find and connect with fellow artisans from across India. Share techniques, collaborate on projects, or simply build your community.
        </p>
        <div className="mx-auto max-w-lg relative">
          <Input placeholder="Search by craft, name, or location..." className="pl-10" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </header>
      
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {artisans.map(artisan => (
            <Link href={`/profile?id=${artisan.id}`} key={artisan.id}>
              <Card className="overflow-hidden group h-full">
                <CardContent className="p-0">
                  <Image
                    src={artisan.imageUrl}
                    alt={`Portrait of ${artisan.name}`}
                    width={400}
                    height={400}
                    className="aspect-square object-cover w-full group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={artisan.imageHint}
                  />
                </CardContent>
                <CardHeader>
                  <CardTitle>{artisan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{artisan.craft}</p>
                  <p className="text-sm text-muted-foreground flex items-center pt-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    {artisan.location}
                  </p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
