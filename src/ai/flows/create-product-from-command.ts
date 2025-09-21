'use server';
/**
 * @fileOverview Creates a full product listing (name, description, image) from a single voice command.
 *
 * - createProductFromCommand - The main function to process the voice command.
 * - CreateProductFromCommandInput - Input schema for the flow.
 * - CreateProductFromCommandOutput - Output schema for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define Input and Output Schemas using Zod
const CreateProductFromCommandInputSchema = z.object({
  command: z.string().describe('The voice command from the user describing the product.'),
});
export type CreateProductFromCommandInput = z.infer<typeof CreateProductFromCommandInputSchema>;

const CreateProductFromCommandOutputSchema = z.object({
  name: z.string().describe('The generated name of the product.'),
  description: z.string().describe('The generated description for the product.'),
  imageUrl: z.string().describe('A data URI of the generated product image.'),
});
export type CreateProductFromCommandOutput = z.infer<typeof CreateProductFromCommandOutputSchema>;


export async function createProductFromCommand(input: CreateProductFromCommandInput): Promise<CreateProductFromCommandOutput> {
  return createProductFromCommandFlow(input);
}

const createProductFromCommandFlow = ai.defineFlow(
  {
    name: 'createProductFromCommandFlow',
    inputSchema: CreateProductFromCommandInputSchema,
    outputSchema: CreateProductFromCommandOutputSchema,
  },
  async ({ command }) => {
    const { output } = await ai.generate({
      prompt: `You are an expert product lister for an e-commerce platform. A user will provide a voice command to describe a product. Your task is to:
        1.  Extract or create a suitable name for the product.
        2.  Write a compelling, professional product description that highlights its features.
        3.  Generate a photorealistic, high-quality lifestyle image of the product. The product should be the central focus, on a clean, modern background.

        User Command: "${command}"
      `,
      model: 'googleai/gemini-2.5-flash-image-preview',
      output: {
        schema: CreateProductFromCommandOutputSchema,
      },
       config: {
          responseModalities: ['TEXT', 'IMAGE'],
        }
    });

    if (!output || !output.imageUrl) {
        throw new Error('AI failed to generate a complete product listing. Please try a more descriptive command.');
    }

    return output;
  }
);