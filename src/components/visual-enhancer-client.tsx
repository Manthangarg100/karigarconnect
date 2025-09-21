"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { enhanceImageAction } from '@/app/actions';
import { Loader2, Upload, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export function VisualEnhancerClient() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: `Please upload an image smaller than ${MAX_FILE_SIZE_MB}MB.`,
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setEnhancedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhance = async () => {
    if (!originalImage) {
      toast({
        variant: 'destructive',
        title: 'No image selected',
        description: 'Please upload an image first.',
      });
      return;
    }

    setIsLoading(true);
    setEnhancedImage(null);

    const result = await enhanceImageAction({ photoDataUri: originalImage });

    setIsLoading(false);

    if (result.success && result.data?.enhancedPhotoDataUri) {
      setEnhancedImage(result.data.enhancedPhotoDataUri);
      toast({
        title: 'Image Enhanced!',
        description: 'Your lifestyle mockup has been generated.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Enhancement Failed',
        description: result.error || 'The AI model failed to generate an image. This could be due to a safety policy violation or an issue with the provided image. Please try a different image.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="picture">Product Photo (Max {MAX_FILE_SIZE_MB}MB)</Label>
        <div className="flex gap-2">
            <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} className="cursor-pointer max-w-sm"/>
            <Button onClick={handleEnhance} disabled={!originalImage || isLoading}>
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Sparkles className="mr-2 h-4 w-4" />
            )}
            Enhance
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold font-headline">Original</h3>
          <Card className="aspect-square w-full">
            <CardContent className="p-2 h-full flex items-center justify-center">
              {originalImage ? (
                <Image
                  src={originalImage}
                  alt="Original product"
                  width={500}
                  height={500}
                  className="rounded-md object-contain max-h-full"
                />
              ) : (
                <div className="text-muted-foreground flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8" />
                  <span>Upload an image to start</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold font-headline">Enhanced Lifestyle Mockup</h3>
          <Card className="aspect-square w-full">
            <CardContent className="p-2 h-full flex items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span>Generating...</span>
                </div>
              ) : enhancedImage ? (
                <Image
                  src={enhancedImage}
                  alt="Enhanced product"
                  width={500}
                  height={500}
                  className="rounded-md object-contain max-h-full"
                />
              ) : (
                <div className="text-muted-foreground flex flex-col items-center gap-2">
                  <Sparkles className="h-8 w-8" />
                  <span>Your enhanced image will appear here</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
