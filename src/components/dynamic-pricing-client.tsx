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
import { dynamicPriceAdvisorAction } from '@/app/actions';
import type { DynamicPriceAdvisorOutput } from '@/ai/flows/dynamic-price-advisor';
import { Loader2, Sparkles, CircleDollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  productName: z.string().min(2, { message: 'Product name is required.' }),
  productCategory: z.string().min(3, { message: 'Product category is required.' }),
  materials: z.string().min(3, { message: 'Please list the key materials.' }),
  targetMarket: z.string().min(3, { message: 'Describe your target market.' }),
});

export function DynamicPricingClient() {
  const [priceAdvice, setPriceAdvice] = useState<DynamicPriceAdvisorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productCategory: '',
      materials: '',
      targetMarket: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPriceAdvice(null);

    const result = await dynamicPriceAdvisorAction(values);
    setIsLoading(false);

    if (result.success && result.data) {
      setPriceAdvice(result.data);
      toast({
        title: 'Pricing Advice Generated!',
        description: 'The AI has provided a price recommendation.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error || 'An unknown error occurred.',
      });
    }
  }

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
          <FormField
            control={form.control}
            name="productCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Apparel', 'Home Decor', 'Jewelry'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="materials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Materials</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., '100% genuine Pashmina wool, organic dyes, silk thread'"
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
            name="targetMarket"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Market</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'International tourists, luxury fashion buyers'" {...field} />
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
            Get Pricing Advice
          </Button>
        </form>
      </Form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center md:text-left">AI Recommendation</h3>
        <Card className="min-h-[400px] bg-secondary/50">
            <CardContent className="p-6">
             {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground pt-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="mt-4">Analyzing market data...</span>
                </div>
              ) : priceAdvice ? (
                <div className="space-y-4">
                    <div className='text-center'>
                        <p className="text-sm text-muted-foreground">Suggested Price</p>
                        <p className="text-5xl font-bold text-primary">₹{priceAdvice.suggestedPrice.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Range: ₹{priceAdvice.priceRange.min.toLocaleString('en-IN')} - ₹{priceAdvice.priceRange.max.toLocaleString('en-IN')}
                        </p>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Justification</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-foreground/80">{priceAdvice.justification}</p>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground pt-12">
                    <CircleDollarSign className="h-10 w-10" />
                    <p className="mt-4 text-center">Your pricing advice will appear here.</p>
                </div>
            )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
