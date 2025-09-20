import data from './artisans.json';
import { PlaceHolderImages } from './placeholder-images';

export type Artisan = {
  id: string;
  name: string;
  craft: string;
  location: string;
  story: string;
  imageUrl: string;
  imageHint: string;
};

export const artisans: Artisan[] = data.artisans.map(artisan => {
    const placeholder = PlaceHolderImages.find(p => p.id === artisan.id);
    return {
        ...artisan,
        imageUrl: placeholder?.imageUrl || '',
        imageHint: placeholder?.imageHint || '',
    }
});
