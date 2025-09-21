"use server";

import { enhanceProductImage, EnhanceProductImageInput } from "@/ai/flows/enhance-product-images";
import { generateProductDescription, GenerateProductDescriptionInput } from "@/ai/flows/generate-product-descriptions";
import { generateMarketingCopy, GenerateMarketingCopyInput } from "@/ai/flows/generate-marketing-copy";
import { grantAdvisor, GrantAdvisorInput } from "@/ai/flows/grant-advisor";
import { createProductFromCommand, CreateProductFromCommandInput } from "@/ai/flows/create-product-from-command";
import { generateVideoFromText, GenerateVideoFromTextInput } from "@/ai/flows/generate-video-from-text";
import { dynamicPriceAdvisor, DynamicPriceAdvisorInput } from "@/ai/flows/dynamic-price-advisor";


export async function enhanceImageAction(input: EnhanceProductImageInput) {
    try {
        console.log("Enhancing image with input:", input.photoDataUri.substring(0, 50));
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

export async function createProductFromCommandAction(input: CreateProductFromCommandInput) {
    try {
        const result = await createProductFromCommand(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Create product from command failed:", error);
        return { success: false, error: error.message || "Failed to create product from command." };
    }
}

export async function generateVideoFromTextAction(input: GenerateVideoFromTextInput) {
    try {
        const result = await generateVideoFromText(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Video generation from text failed:", error);
        return { success: false, error: error.message || "Failed to generate video from text." };
    }
}

export async function dynamicPriceAdvisorAction(input: DynamicPriceAdvisorInput) {
    try {
        const result = await dynamicPriceAdvisor(input);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Dynamic price advisor failed:", error);
        return { success: false, error: error.message || "Failed to get price advice." };
    }
}
