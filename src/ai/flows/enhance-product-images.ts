'use server';

/**
 * @fileOverview Enhances product images by removing backgrounds, adjusting lighting, and creating lifestyle mockups.
 *
 * - enhanceProductImage - A function that handles the image enhancement process.
 * - EnhanceProductImageInput - The input type for the enhanceProductImage function.
 * - EnhanceProductImageOutput - The return type for the enhanceProductImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceProductImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EnhanceProductImageInput = z.infer<typeof EnhanceProductImageInputSchema>;

const EnhanceProductImageOutputSchema = z.object({
  enhancedPhotoDataUri: z
    .string()
    .describe('The enhanced photo of the product as a data URI.'),
});
export type EnhanceProductImageOutput = z.infer<typeof EnhanceProductImageOutputSchema>;

export async function enhanceProductImage(input: EnhanceProductImageInput): Promise<EnhanceProductImageOutput> {
  return enhanceProductImageFlow(input);
}

const enhanceProductImageFlow = ai.defineFlow(
  {
    name: 'enhanceProductImageFlow',
    inputSchema: EnhanceProductImageInputSchema,
    outputSchema: EnhanceProductImageOutputSchema,
  },
  async input => {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
          { media: { url: input.photoDataUri } },
          { text: 'Generate a photorealistic lifestyle image of this product in a modern living room with soft, natural light. The product should be the main focus.' },
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });

    if (!media?.url) {
        throw new Error('Image generation failed to return a valid image.');
    }

    return { enhancedPhotoDataUri: media.url };
  }
);
