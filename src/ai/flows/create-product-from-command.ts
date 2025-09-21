'use server';
/**
 * @fileOverview Creates a full product listing (name, description, image) from a single voice command.
 *
 * - createProductFromCommand - The main function to process the voice command.
 * - CreateProductFromCommandInput - Input schema for the flow.
 * - CreateProductFromCommandOutput - Output schema for the flow.
 */

import { ai } from '@/ai/genkit';
import { generateProductDescription } from './generate-product-descriptions';
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

// Define schema for extracting product details from the command
const ProductDetailsSchema = z.object({
    name: z.string().describe("The name of the product, extracted from the command."),
    keywords: z.string().describe("A comma-separated list of keywords describing the product's features, materials, and style."),
});

// Define a prompt to extract structured data from the voice command
const extractDetailsPrompt = ai.definePrompt({
    name: 'extractProductDetailsPrompt',
    input: { schema: CreateProductFromCommandInputSchema },
    output: { schema: ProductDetailsSchema },
    prompt: `You are an expert at understanding product descriptions. Extract the product name and descriptive keywords from the following user command.

    Command: {{{command}}}

    Extract the product name and a comma-separated list of descriptive keywords.`,
});

// Define a prompt for generating an image based on a description
const generateImagePrompt = ai.definePrompt({
    name: 'generateProductImageFromDescription',
    input: { schema: z.object({ description: z.string() }) },
    output: { schema: z.object({ imageUrl: z.string() }) },
    prompt: `Generate a photorealistic, high-quality lifestyle image of the following product. The product should be the main focus, presented in an appealing setting.
    
    Product Description: {{{description}}}`,
});

export async function createProductFromCommand(input: CreateProductFromCommandInput): Promise<CreateProductFromCommandOutput> {
  return createProductFromCommandFlow(input);
}

const createProductFromCommandFlow = ai.defineFlow(
  {
    name: 'createProductFromCommandFlow',
    inputSchema: CreateProductFromCommandInputSchema,
    outputSchema: CreateProductFromCommandOutputSchema,
  },
  async (input) => {
    // 1. Extract structured details from the voice command
    const { output: productDetails } = await extractDetailsPrompt(input);
    if (!productDetails) {
        throw new Error("Could not extract product details from the command.");
    }
    
    // 2. Generate a compelling product description
    const { description } = await generateProductDescription({
      productName: productDetails.name,
      keywords: productDetails.keywords,
    });

    // 3. Generate a product image from the description
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `A photorealistic, high-quality lifestyle image of a ${productDetails.name}, described as: ${description}. The product is the central focus, on a clean, modern background.`,
    });

    if (!media?.url) {
        throw new Error('Image generation failed. The AI model did not return a valid image.');
    }

    // 4. Return the complete product object
    return {
      name: productDetails.name,
      description,
      imageUrl: media.url,
    };
  }
);
