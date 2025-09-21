'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating social media captions and hashtags based on a product name.
 *
 * - generateSocialCopy - A function that generates a caption and hashtags.
 * - GenerateSocialCopyInput - The input type for the function.
 * - GenerateSocialCopyOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialCopyInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
});
export type GenerateSocialCopyInput = z.infer<
  typeof GenerateSocialCopyInputSchema
>;

const GenerateSocialCopyOutputSchema = z.object({
  caption: z.string().describe('The generated social media caption.'),
  hashtags: z.array(z.string()).describe('An array of generated hashtags, without the # symbol.'),
});
export type GenerateSocialCopyOutput = z.infer<
  typeof GenerateSocialCopyOutputSchema
>;

export async function generateSocialCopy(
  input: GenerateSocialCopyInput
): Promise<GenerateSocialCopyOutput> {
  return generateSocialCopyFlow(input);
}

const generateSocialCopyPrompt = ai.definePrompt({
  name: 'generateSocialCopyPrompt',
  input: {schema: GenerateSocialCopyInputSchema},
  output: {schema: GenerateSocialCopyOutputSchema},
  prompt: `You are a world-class social media marketing expert for handcrafted goods. Your goal is to generate viral content for a product.

Given the product name, create:
1.  An engaging, short, and exciting social media caption that will capture attention.
2.  A list of 5-7 highly relevant and trending hashtags to maximize reach. Do not include the '#' symbol in the hashtag strings.

Product Name: {{{productName}}}
`,
});

const generateSocialCopyFlow = ai.defineFlow(
  {
    name: 'generateSocialCopyFlow',
    inputSchema: GenerateSocialCopyInputSchema,
    outputSchema: GenerateSocialCopyOutputSchema,
  },
  async input => {
    const {output} = await generateSocialCopyPrompt(input);
    return output!;
  }
);
