import { GoogleGenAI, Type } from "@google/genai";
import { NeedsAssessment, ContentParameters, GeneratedContent } from '../types';

// FIX: Implement the geminiService to correctly call the Gemini API.
// The previous file content was invalid, causing module resolution errors.
// This implementation uses the GoogleGenAI SDK according to the provided guidelines.

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

/**
 * Generates advanced course content using the Gemini API.
 * @param needs - The needs assessment data.
 * @param params - The content parameters.
 * @returns A promise that resolves to the generated content.
 */
export async function generateAdvancedCourseContent(
    needs: NeedsAssessment,
    params: ContentParameters
): Promise<Omit<GeneratedContent, 'id' | 'generatedOn'>> {

    const prompt = `
        Tu es un ingénieur pédagogique expert spécialisé dans la création de contenu de formation engageant et efficace.
        Ta mission est de générer un contenu de formation basé sur les spécifications suivantes.
        Le contenu doit être en français.

        **1. Analyse des Besoins :**
        - **Public Cible :**
            - Secteur d'activité : ${needs.targetAudience.sector}
            - Tranche d'âge : ${needs.targetAudience.age}
            - Niveau d'expérience : ${needs.targetAudience.experience}
        - **Objectifs Pédagogiques :** ${needs.learningObjectives}
        - **Difficultés Anticipées :** ${needs.perceivedDifficulties}

        **2. Paramètres du Contenu :**
        - **Type de Contenu à produire :** ${params.contentType}
        - **Type de Parcours :** ${params.courseType}
        - **Instruction Spécifique (Finition) :** ${params.refinementPrompt || 'Aucune instruction spécifique.'}

        **3. Ta Tâche :**
        Génère le contenu demandé en respectant scrupuleusement tous les paramètres ci-dessus.
        Le résultat doit être structuré en JSON avec les champs "title" et "content".
        - "title": Un titre percutant et pertinent pour le contenu.
        - "content": Le contenu pédagogique lui-même, bien structuré et adapté au format demandé (ex: un quiz, un script, un plan, etc.).
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        content: { type: Type.STRING },
                    },
                    required: ['title', 'content'],
                },
            },
        });

        const jsonString = response.text.trim();
        const parsedContent = JSON.parse(jsonString);

        if (!parsedContent || typeof parsedContent.title !== 'string' || typeof parsedContent.content !== 'string') {
            throw new Error("Invalid response format from AI.");
        }

        return {
            title: parsedContent.title,
            content: parsedContent.content,
            type: params.contentType,
        };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate course content. Please try again.");
    }
}
