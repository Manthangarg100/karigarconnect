'use server';

/**
 * @fileOverview Generates an image from a text description using an AI model.
 *
 * - generateImageFromText - The main function to process the text prompt.
 * - GenerateImageFromTextInput - Input schema for the flow.
 * - GenerateImageFromTextOutput - Output schema for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImageFromTextInputSchema = z.object({
  prompt: z.string().describe('A detailed text description of the image to generate.'),
});
export type GenerateImageFromTextInput = z.infer<typeof GenerateImageFromTextInputSchema>;

const GenerateImageFromTextOutputSchema = z.object({
  imageUrl: z.string().describe('A data URI of the generated image.'),
});
export type GenerateImageFromTextOutput = z.infer<typeof GenerateImageFromTextOutputSchema>;

export async function generateImageFromText(input: GenerateImageFromTextInput): Promise<GenerateImageFromTextOutput> {
  return generateImageFromTextFlow(input);
}

const generateImageFromTextFlow = ai.defineFlow(
  {
    name: 'generateImageFromTextFlow',
    inputSchema: GenerateImageFromTextInputSchema,
    outputSchema: GenerateImageFromTextOutputSchema,
  },
  async ({ prompt }) => {
    const fullPrompt = `A photorealistic, high-quality, professional product photograph of: ${prompt}. The product should be the central focus, on a clean, modern, and brightly lit background.`;
    
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: fullPrompt,
    });

    if (!media?.url) {
      throw new Error('Image generation failed. The AI model did not return a valid image. This may be due to a safety policy violation or an issue with the prompt.');
    }

    return { imageUrl: media.url };
  }
);
