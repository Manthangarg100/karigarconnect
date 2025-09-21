'use server';
/**
 * @fileOverview Generates a video from a text description using the Veo model.
 *
 * - generateVideoFromText - The main function to process the text prompt.
 * - GenerateVideoFromTextInput - Input schema for the flow.
 * - GenerateVideoFromTextOutput - Output schema for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateVideoFromTextInputSchema = z.object({
  prompt: z.string().describe('A detailed text description of the video to generate.'),
});
export type GenerateVideoFromTextInput = z.infer<typeof GenerateVideoFromTextInputSchema>;

const GenerateVideoFromTextOutputSchema = z.object({
  videoUrl: z.string().describe('A data URI of the generated video.'),
});
export type GenerateVideoFromTextOutput = z.infer<typeof GenerateVideoFromTextOutputSchema>;

export async function generateVideoFromText(input: GenerateVideoFromTextInput): Promise<GenerateVideoFromTextOutput> {
  return generateVideoFromTextFlow(input);
}

const generateVideoFromTextFlow = ai.defineFlow(
  {
    name: 'generateVideoFromTextFlow',
    inputSchema: GenerateVideoFromTextInputSchema,
    outputSchema: GenerateVideoFromTextOutputSchema,
  },
  async ({ prompt }) => {
    const fullPrompt = `A cinematic, high-quality, professional video of: ${prompt}. The product should be the central focus, on a clean, modern, and brightly lit background.`;
    
    let { operation } = await ai.generate({
      model: 'googleai/veo-2.0-generate-001',
      prompt: fullPrompt,
      config: {
        durationSeconds: 5,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
        throw new Error('Video generation failed to start. The model did not return an operation.');
    }

    // Poll for completion
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        operation = await ai.checkOperation(operation);
    }
    
    if (operation.error) {
        throw new Error(`Video generation failed: ${operation.error.message}`);
    }

    const video = operation.output?.message?.content.find(p => !!p.media);

    if (!video?.media?.url) {
      throw new Error('Video generation failed. The AI model did not return a valid video. This may be due to a safety policy violation or an issue with the prompt.');
    }

    // The URL from Veo is temporary and needs to be fetched and converted to a data URI
    const response = await fetch(`${video.media.url}&key=${process.env.GEMINI_API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const contentType = response.headers.get('content-type') || 'video/mp4';
    const videoUrl = `data:${contentType};base64,${base64}`;

    return { videoUrl };
  }
);
