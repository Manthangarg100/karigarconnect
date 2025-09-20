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
import { generateMarketingCopyAction } from '@/app/actions';
import { Loader2, Megaphone, Copy } from 'lucide-react';
import { Label } from './ui/label';

const formSchema = z.object({
  productName: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  productDescription: z.string().min(10, { message: 'Please provide a brief description.' }),
  targetAudience: z.string().min(3, { message: 'Please describe your target audience.' }),
});

export function MarketingToolClient() {
  const [generatedCopy, setGeneratedCopy] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productDescription: '',
      targetAudience: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedCopy('');

    const result = await generateMarketingCopyAction(values);
    setIsLoading(false);

    if (result.success && result.data?.marketingCopy) {
      setGeneratedCopy(result.data.marketingCopy);
      toast({
        title: 'Marketing Copy Generated!',
        description: 'Your new social media post is ready.',
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
    if (generatedCopy) {
      navigator.clipboard.writeText(generatedCopy);
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
            name="productDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'A luxurious and soft shawl made from the finest Kashmiri wool, featuring traditional motifs.'"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="targetAudience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Audience</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Fashion-conscious millennials'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Megaphone className="mr-2 h-4 w-4" />
            )}
            Generate Post
          </Button>
        </form>
      </Form>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="marketing-copy">Generated Social Media Post</Label>
          <Button variant="ghost" size="icon" onClick={handleCopy} disabled={!generatedCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <Textarea
          id="marketing-copy"
          placeholder="Your generated post will appear here..."
          className="min-h-[250px] bg-secondary/50"
          value={generatedCopy}
          readOnly
        />
      </div>
    </div>
  );
}
