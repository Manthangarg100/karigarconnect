"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { grantAdvisorAction } from '@/app/actions';
import { Loader2, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  craft: z.string().min(2, { message: 'Craft must be at least 2 characters.' }),
  location: z.string().min(3, { message: 'Please provide a location.' }),
});

export function GrantAdvisorClient() {
  const [generatedAdvice, setGeneratedAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      craft: '',
      location: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedAdvice('');

    const result = await grantAdvisorAction(values);
    setIsLoading(false);

    if (result.success && result.data?.advice) {
      setGeneratedAdvice(result.data.advice);
      toast({
        title: 'Advice Generated!',
        description: 'Relevant grants and schemes are now displayed.',
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
    <div className="grid md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="craft"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Craft</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 'Block Printing'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 'Jaipur, Rajasthan'"
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
              <Award className="mr-2 h-4 w-4" />
            )}
            Get Advice
          </Button>
        </form>
      </Form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">AI Recommendations</h3>
        <Card className="min-h-[250px] bg-secondary/50">
            <CardContent className="p-6">
             {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="mt-2">Finding opportunities...</span>
                </div>
              ) : generatedAdvice ? (
                <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{generatedAdvice}</ReactMarkdown>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Award className="h-8 w-8" />
                    <span className="mt-2 text-center">Your recommended grants and schemes will appear here.</span>
                </div>
            )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
