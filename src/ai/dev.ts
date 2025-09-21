import { config } from 'dotenv';
config();

import '@/ai/flows/enhance-product-images.ts';
import '@/ai/flows/generate-product-descriptions.ts';
import '@/ai/flows/generate-marketing-copy.ts';
import '@/ai/flows/grant-advisor.ts';
import '@/ai/flows/create-product-from-command.ts';
