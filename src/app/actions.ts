"use server";

import { enhanceProductImage, EnhanceProductImageInput } from "@/ai/flows/enhance-product-images";
import { generateProductDescription, GenerateProductDescriptionInput } from "@/ai/flows/generate-product-descriptions";
import { generateMarketingCopy, GenerateMarketingCopyInput } from "@/ai/flows/generate-marketing-copy";
import { grantAdvisor, GrantAdvisorInput } from "@/ai/flows/grant-advisor";

export async function enhanceImageAction(input: EnhanceProductImageInput) {
    try {
        const result = await enhanceProductImage(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Image enhancement failed:", error);
        return { success: false, error: error.message || "Failed to enhance image." };
    }
}

export async function generateDescriptionAction(input: GenerateProductDescriptionInput) {
    try {
        const result = await generateProductDescription(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Description generation failed:", error);
        return { success: false, error: "Failed to generate description." };
    }
}

export async function generateMarketingCopyAction(input: GenerateMarketingCopyInput) {
    try {
        const result = await generateMarketingCopy(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Marketing copy generation failed:", error);
        return { success: false, error: "Failed to generate marketing copy." };
    }
}

export async function grantAdvisorAction(input: GrantAdvisorInput) {
    try {
        const result = await grantAdvisor(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Grant advisor failed:", error);
        return { success: false, error: "Failed to generate advice." };
    }
}
