"use server";

import { enhanceProductImage, EnhanceProductImageInput } from "@/ai/flows/enhance-product-images";
import { generateProductDescription, GenerateProductDescriptionInput } from "@/ai/flows/generate-product-descriptions";
import { generateMarketingCopy, GenerateMarketingCopyInput } from "@/ai/flows/generate-marketing-copy";

export async function enhanceImageAction(input: EnhanceProductImageInput) {
    try {
        const result = await enhanceProductImage(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to enhance image." };
    }
}

export async function generateDescriptionAction(input: GenerateProductDescriptionInput) {
    try {
        const result = await generateProductDescription(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to generate description." };
    }
}

export async function generateMarketingCopyAction(input: GenerateMarketingCopyInput) {
    try {
        const result = await generateMarketingCopy(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to generate marketing copy." };
    }
}
