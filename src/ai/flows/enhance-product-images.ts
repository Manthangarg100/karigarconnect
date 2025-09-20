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

const removeBackgroundTool = ai.defineTool(
  {
    name: 'removeBackground',
    description: 'Remove the background from an image.',
    inputSchema: z.object({
      image: z.string().describe("A data URI of the image to process. Must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
    }),
    outputSchema: z.string().describe('A data URI of the image with the background removed.'),
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image-preview',
      prompt: [
        { media: { url: input.image } },
        { text: 'remove the background of this product image, the output should have a transparent background' },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    return media!.url;
  }
);


const generateLifestyleMockup = ai.defineTool({
  name: 'generateLifestyleMockup',
  description: 'Generates a lifestyle mockup image of a product.',
  inputSchema: z.object({
    productPhoto: z
      .string()
      .describe(
        "A photo of the product with a transparent background, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
      ),
    style: z.string().describe('The desired style for the lifestyle mockup (e.g., modern living room, rustic kitchen).'),
  }),
  outputSchema: z.string().describe('The lifestyle mockup image as a data URI.'),
},
async (input) => {
  const { media } = await ai.generate({
    model: 'googleai/gemini-2.5-flash-image-preview',
    prompt: [
      { media: { url: input.productPhoto } },
      { text: `generate an image of this product in a ${input.style}` },
    ],
    config: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  });
  return media!.url;
});

const enhanceProductImageFlow = ai.defineFlow(
  {
    name: 'enhanceProductImageFlow',
    inputSchema: EnhanceProductImageInputSchema,
    outputSchema: EnhanceProductImageOutputSchema,
  },
  async input => {
    // First, remove the background
    const backgroundRemovedImage = await removeBackgroundTool({ image: input.photoDataUri });

    // Then, generate the lifestyle mockup
    const lifestyleMockup = await generateLifestyleMockup({
      productPhoto: backgroundRemovedImage,
      style: 'modern living room',
    });

    return { enhancedPhotoDataUri: lifestyleMockup };
  }
);
