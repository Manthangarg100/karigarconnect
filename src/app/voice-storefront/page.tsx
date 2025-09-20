
"use client";

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BackButton } from '@/components/back-button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function VoiceStorefrontPage() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null); // We use video for permission, but won't show it.
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        // Requesting audio permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
        // We don't need to do anything with the stream yet
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        console.error('Error accessing microphone:', error);
        setHasPermission(false);
        toast({
          variant: 'destructive',
          title: 'Microphone Access Denied',
          description: 'Please enable microphone permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();
  }, [toast]);


  const handleListen = () => {
    if(isListening) {
      // In a real app, you would stop the speech recognition here.
       setIsListening(false);
       if (transcript === '') {
         // Simulate a command for demonstration
         setTranscript('Add a new pashmina shawl to my store.');
       }
    } else {
       // In a real app, you would start the speech recognition here.
       setIsListening(true);
       setTranscript('');
    }
  };

  return (
    <div className="p-6 h-full">
      <BackButton />
      <div className="flex items-center justify-center h-full -mt-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Voice-to-Storefront</CardTitle>
            <CardDescription>
              Manage your products, orders, and storefront using just your voice. Perfect for artisans on the go.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {hasPermission === false && (
                <Alert variant="destructive">
                  <AlertTitle>Microphone Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow microphone access to use this feature.
                  </AlertDescription>
              </Alert>
            )}
            
            <p className="text-muted-foreground">
              Tap the button and speak commands like "Add new product" or "Check my recent orders".
            </p>
            
            <Button size="lg" className="rounded-full w-24 h-24" onClick={handleListen} disabled={hasPermission !== true}>
              {isListening ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
            </Button>
            
            {isListening && (
              <div className="flex items-center gap-2 text-primary">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Listening...</span>
              </div>
            )}
            
            {transcript && (
                <div className="w-full text-left p-4 bg-secondary/50 rounded-md">
                    <p className="font-semibold">You said:</p>
                    <p className="italic">"{transcript}"</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
