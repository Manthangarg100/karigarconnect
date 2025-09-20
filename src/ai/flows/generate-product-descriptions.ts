'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating compelling product descriptions based on product name and keywords.
 *
 * The flow takes a product name and keywords as input, and returns a generated product description that highlights the cultural heritage and craftsmanship.
 *
 * @fileOverview
 * generateProductDescription - A function that generates product descriptions.
 * GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  keywords: z
    .string()
    .describe(
      'Keywords that describe the product, its cultural heritage, and craftsmanship.'
    ),
});
export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const generateProductDescriptionPrompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in crafting compelling product descriptions that highlight cultural heritage and craftsmanship.

  Given the product name and keywords, generate a product description that will attract customers and effectively tell the story of the craft.

  Product Name: {{{productName}}}
  Keywords: {{{keywords}}}

  Product Description:`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateProductDescriptionPrompt(input);
    return output!;
  }
);
