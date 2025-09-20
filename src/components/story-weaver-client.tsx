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
import { generateDescriptionAction } from '@/app/actions';
import { Loader2, PenSquare, Copy } from 'lucide-react';
import { Label } from './ui/label';

const formSchema = z.object({
  productName: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  keywords: z.string().min(5, { message: 'Please provide some keywords.' }),
});

export function StoryWeaverClient() {
  const [generatedDescription, setGeneratedDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      keywords: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedDescription('');

    const result = await generateDescriptionAction(values);
    setIsLoading(false);

    if (result.success && result.data?.description) {
      setGeneratedDescription(result.data.description);
      toast({
        title: 'Description Generated!',
        description: 'Your new product story is ready.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error || 'An unknown error occurred.',
      });
    }
  }

  const handleCopy = () => {
    if (generatedDescription) {
      navigator.clipboard.writeText(generatedDescription);
      toast({
        title: 'Copied to clipboard!',
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Handwoven Pashmina Shawl'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keywords</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'Kashmiri, fine wool, traditional motifs, artisanal, soft, luxurious'"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PenSquare className="mr-2 h-4 w-4" />
            )}
            Generate Description
          </Button>
        </form>
      </Form>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="description">Generated Description</Label>
          <Button variant="ghost" size="icon" onClick={handleCopy} disabled={!generatedDescription}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <Textarea
          id="description"
          placeholder="Your generated product story will appear here..."
          className="min-h-[250px] bg-secondary/50"
          value={generatedDescription}
          readOnly
        />
      </div>
    </div>
  );
}
