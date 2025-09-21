"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { generateVideoFromTextAction } from '@/app/actions';
import { Loader2, Sparkles, Film } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  prompt: z.string().min(10, { message: 'Please enter a description of at least 10 characters.' }),
});

export function ProductAnimatorClient() {
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedVideo(null);
    toast({
        title: 'Video Generation Started...',
        description: 'This can take up to a minute. Please be patient.',
    });

    const result = await generateVideoFromTextAction(values);
    setIsLoading(false);

    if (result.success && result.data?.videoUrl) {
      setGeneratedVideo(result.data.videoUrl);
      toast({
        title: 'Video Generated!',
        description: 'Your new product animation is ready.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error || 'The AI failed to generate a video. This could be due to a safety policy violation, high demand, or an issue with the prompt. Please try again.',
        duration: 10000,
      });
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'A hand-painted ceramic vase with blue floral patterns, rotating slowly on a rustic wooden table.'"
                      className="min-h-[120px]"
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
                <Film className="mr-2 h-4 w-4" />
              )}
              Generate Video
            </Button>
          </form>
        </Form>
      </div>

      <div className="space-y-2">
         <h3 className="text-lg font-semibold font-headline text-center md:text-left">Generated Video</h3>
          <Card className="aspect-video w-full bg-muted">
            <CardContent className="p-2 h-full flex items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span>AI is creating your video...</span>
                  <p className="text-xs text-center">(This can take up to a minute)</p>
                </div>
              ) : generatedVideo ? (
                <video
                  src={generatedVideo}
                  controls
                  className="rounded-md object-contain max-h-full w-full"
                />
              ) : (
                <div className="text-muted-foreground flex flex-col items-center gap-2 text-center p-4">
                  <Sparkles className="h-8 w-8" />
                  <span>Your generated video will appear here</span>
                </div>
              )}
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
