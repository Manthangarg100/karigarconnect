"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { generateSocialCopyAction } from '@/app/actions';
import type { GenerateSocialCopyOutput } from '@/ai/flows/generate-social-copy';
import { Loader2, Sparkles, Copy, Hash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const formSchema = z.object({
  productName: z.string().min(2, { message: 'Product name is required.' }),
});

export function SocialCopyGeneratorClient() {
  const [generatedCopy, setGeneratedCopy] = useState<GenerateSocialCopyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedCopy(null);

    const result = await generateSocialCopyAction(values);
    setIsLoading(false);

    if (result.success && result.data) {
      setGeneratedCopy(result.data);
      toast({
        title: 'Social Copy Generated!',
        description: 'Your new caption and hashtags are ready.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error || 'An unknown error occurred.',
      });
    }
  }

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Royal Blue Pashmina Shawl'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate Social Copy
          </Button>
        </form>
      </Form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center md:text-left">AI Generated Content</h3>
        <div className="space-y-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Generated Caption</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyToClipboard(generatedCopy?.caption || '')}
                        disabled={!generatedCopy?.caption}
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    {isLoading && !generatedCopy ? (
                        <div className="flex items-center justify-center text-muted-foreground p-8">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    ) : (
                        <p className="text-sm text-foreground/80 min-h-[80px]">
                            {generatedCopy?.caption || 'Your generated caption will appear here.'}
                        </p>
                    )}
                </CardContent>
            </Card>

             <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Generated Hashtags</CardTitle>
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyToClipboard(generatedCopy?.hashtags.map(h => `#${h}`).join(' ') || '')}
                        disabled={!generatedCopy?.hashtags}
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    {isLoading && !generatedCopy ? (
                         <div className="flex items-center justify-center text-muted-foreground p-8">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    ) : generatedCopy?.hashtags && generatedCopy.hashtags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {generatedCopy.hashtags.map((tag, index) => (
                                <Badge key={index} variant="secondary">#{tag}</Badge>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center text-muted-foreground p-8">
                             <Hash className="h-8 w-8" />
                             <p className="ml-2 text-center">Your hashtags will appear here.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
