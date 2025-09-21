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
import { culturalTranslatorAction } from '@/app/actions';
import type { CulturalTranslatorOutput } from '@/ai/flows/cultural-translator';
import { Loader2, Sparkles, Languages } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const formSchema = z.object({
  textToTranslate: z.string().min(10, { message: 'Please enter at least 10 characters to translate.' }),
  targetAudience: z.string().min(3, { message: 'Describe the target audience.' }),
  targetLanguage: z.string().min(2, { message: 'Enter a target language.' }),
});

export function TranslatorClient() {
  const [translationResult, setTranslationResult] = useState<CulturalTranslatorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textToTranslate: '',
      targetAudience: 'American tourist',
      targetLanguage: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTranslationResult(null);

    const result = await culturalTranslatorAction(values);
    setIsLoading(false);

    if (result.success && result.data) {
      setTranslationResult(result.data);
      toast({
        title: 'Translation Complete!',
        description: 'The AI has adapted your text for the target audience.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Translation Failed',
        description: result.error || 'An unknown error occurred.',
      });
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="textToTranslate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text to Translate</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your product's story, materials, and significance..."
                      className="min-h-[150px] resize-none"
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
                    <Input placeholder="e.g., 'American art collector', 'Japanese tourist'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Language</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'English', 'French', 'Japanese'" {...field} />
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
              Translate & Adapt
            </Button>
          </form>
        </Form>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center md:text-left">AI-Powered Adaptation</h3>
        <Card className="min-h-[400px] bg-secondary/50">
          <CardContent className="p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground pt-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="mt-4">Adapting your story...</span>
              </div>
            ) : translationResult ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Culturally Adapted Text</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/90">{translationResult.culturallyAdaptedText}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Cultural Notes</CardTitle>
                    <CardDescription>An explanation of the changes made by the AI.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{translationResult.culturalNotes}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Direct Translation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{translationResult.directTranslation}</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground pt-12 text-center">
                <Languages className="h-10 w-10" />
                <p className="mt-4">Your culturally-aware translation will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
