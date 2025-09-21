'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing dynamic pricing advice for artisan products.
 *
 * - dynamicPriceAdvisor - A function that provides pricing advice.
 * - DynamicPriceAdvisorInput - The input type for the dynamicPriceAdvisor function.
 * - DynamicPriceAdvisorOutput - The return type for the dynamicPriceAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicPriceAdvisorInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productCategory: z.string().describe('The category of the product (e.g., "Textile", "Pottery", "Jewelry").'),
  materials: z.string().describe('The materials used to create the product (e.g., "Pashmina wool, natural dyes").'),
  targetMarket: z.string().describe('The intended target market (e.g., "Luxury buyers", "Tourists", "Eco-conscious consumers").'),
});
export type DynamicPriceAdvisorInput = z.infer<typeof DynamicPriceAdvisorInputSchema>;

const DynamicPriceAdvisorOutputSchema = z.object({
    suggestedPrice: z.number().describe('The AI-recommended retail price for the product in INR.'),
    priceRange: z.object({
        min: z.number().describe('The minimum reasonable price for the product in INR.'),
        max: z.number().describe('The maximum reasonable price for the product in INR.'),
    }).describe('The suggested price range for the product.'),
    justification: z.string().describe('A detailed justification for the pricing strategy, explaining the factors considered.'),
});
export type DynamicPriceAdvisorOutput = z.infer<typeof DynamicPriceAdvisorOutputSchema>;


export async function dynamicPriceAdvisor(
  input: DynamicPriceAdvisorInput
): Promise<DynamicPriceAdvisorOutput> {
  return dynamicPriceAdvisorFlow(input);
}

const dynamicPriceAdvisorPrompt = ai.definePrompt({
  name: 'dynamicPriceAdvisorPrompt',
  input: {schema: DynamicPriceAdvisorInputSchema},
  output: {schema: DynamicPriceAdvisorOutputSchema},
  prompt: `You are an expert pricing strategist specializing in handcrafted goods by Indian artisans. Your task is to provide a detailed pricing recommendation based on the product details provided.

Consider the following factors in your analysis:
- The uniqueness and craftsmanship of the product.
- The cost and quality of materials.
- The perceived value for the specified target market.
- The product category and its typical price points.
- The goal is to maximize profit while remaining fair and competitive.

Provide a suggested retail price, a realistic price range (min and max), and a clear justification for your recommendation in Indian Rupees (INR).

Product Details:
- Name: {{{productName}}}
- Category: {{{productCategory}}}
- Materials: {{{materials}}}
- Target Market: {{{targetMarket}}}
`,
});

const dynamicPriceAdvisorFlow = ai.defineFlow(
  {
    name: 'dynamicPriceAdvisorFlow',
    inputSchema: DynamicPriceAdvisorInputSchema,
    outputSchema: DynamicPriceAdvisorOutputSchema,
  },
  async input => {
    const {output} = await dynamicPriceAdvisorPrompt(input);
    return output!;
  }
);
