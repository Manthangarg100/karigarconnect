'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing advice on grants and schemes for artisans.
 *
 * - grantAdvisor - A function that provides grant advice.
 * - GrantAdvisorInput - The input type for the grantAdvisor function.
 * - GrantAdvisorOutput - The return type for the grantAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GrantAdvisorInputSchema = z.object({
  craft: z.string().describe('The type of craft the artisan specializes in (e.g., "Pottery", "Weaving").'),
  location: z.string().describe('The location of the artisan (e.g., "Jaipur, Rajasthan").'),
});
export type GrantAdvisorInput = z.infer<typeof GrantAdvisorInputSchema>;

const GrantAdvisorOutputSchema = z.object({
  advice: z.string().describe('The generated advice on relevant grants and schemes in markdown format.'),
});
export type GrantAdvisorOutput = z.infer<typeof GrantAdvisorOutputSchema>;

export async function grantAdvisor(
  input: GrantAdvisorInput
): Promise<GrantAdvisorOutput> {
  return grantAdvisorFlow(input);
}

const grantAdvisorPrompt = ai.definePrompt({
  name: 'grantAdvisorPrompt',
  input: {schema: GrantAdvisorInputSchema},
  output: {schema: GrantAdvisorOutputSchema},
  prompt: `You are an expert advisor for Indian artisans. Your goal is to provide information about relevant government schemes, grants, and financial support programs.

Given the artisan's craft and location, provide a list of potential opportunities. For each opportunity, include a brief description, eligibility criteria, and how to apply. Format the output as markdown.

Craft: {{{craft}}}
Location: {{{location}}}

Relevant Grants and Schemes:`,
});

const grantAdvisorFlow = ai.defineFlow(
  {
    name: 'grantAdvisorFlow',
    inputSchema: GrantAdvisorInputSchema,
    outputSchema: GrantAdvisorOutputSchema,
  },
  async input => {
    const {output} = await grantAdvisorPrompt(input);
    return output!;
  }
);
