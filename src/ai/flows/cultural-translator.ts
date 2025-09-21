'use server';

/**
 * @fileOverview This file defines a Genkit flow for culturally adapting and translating text for artisans.
 *
 * - culturalTranslator - A function that translates and adapts text.
 * - CulturalTranslatorInput - The input type for the function.
 * - CulturalTranslatorOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CulturalTranslatorInputSchema = z.object({
  textToTranslate: z.string().describe('The original text provided by the artisan.'),
  targetAudience: z.string().describe('The specific audience the text should be adapted for (e.g., "American tourist", "Japanese art collector").'),
  targetLanguage: z.string().describe('The target language for translation (e.g., "English", "Japanese").'),
});
export type CulturalTranslatorInput = z.infer<typeof CulturalTranslatorInputSchema>;

const CulturalTranslatorOutputSchema = z.object({
  directTranslation: z.string().describe('The direct, literal translation of the original text into the target language.'),
  culturallyAdaptedText: z.string().describe('The text adapted to be more culturally resonant and appealing to the target audience.'),
  culturalNotes: z.string().describe('A brief explanation of the changes made and why they are more appropriate for the target audience.'),
});
export type CulturalTranslatorOutput = z.infer<typeof CulturalTranslatorOutputSchema>;

export async function culturalTranslator(
  input: CulturalTranslatorInput
): Promise<CulturalTranslatorOutput> {
  return culturalTranslatorFlow(input);
}

const culturalTranslatorPrompt = ai.definePrompt({
  name: 'culturalTranslatorPrompt',
  input: {schema: CulturalTranslatorInputSchema},
  output: {schema: CulturalTranslatorOutputSchema},
  prompt: `You are an expert in both linguistics and marketing, specializing in helping artisans sell their crafts globally. Your task is to translate and culturally adapt a piece of text.

First, provide a direct, literal translation into the target language.

Second, and most importantly, rewrite the text to be culturally resonant for the specified target audience. Consider their values, idioms, and what aspects of the craft's story would be most compelling to them. For example, an American audience might value authenticity and the artisan's personal story, while a Japanese audience might appreciate the history, precision, and harmony of the craft.

Finally, provide brief "cultural notes" explaining the key adaptations you made and the reasoning behind them.

Original Text: "{{{textToTranslate}}}"
Target Audience: {{{targetAudience}}}
Target Language: {{{targetLanguage}}}
`,
});

const culturalTranslatorFlow = ai.defineFlow(
  {
    name: 'culturalTranslatorFlow',
    inputSchema: CulturalTranslatorInputSchema,
    outputSchema: CulturalTranslatorOutputSchema,
  },
  async input => {
    const {output} = await culturalTranslatorPrompt(input);
    if (!output) {
        throw new Error('The AI model failed to produce a translation. Please try again.');
    }
    return output;
  }
);
