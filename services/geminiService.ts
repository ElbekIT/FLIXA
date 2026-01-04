
import { GoogleGenAI } from "@google/genai";

// Initialize GoogleGenAI with the API key from environment variables as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMovieRecommendations = async (genre: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tavsiya qiling: ${genre} janridagi 3 ta mashhur kino nomini ro'yxat ko'rinishida bering. Faqat nomlarini.`,
      config: {
        maxOutputTokens: 200,
      }
    });
    // Access the generated text directly from the response.text property.
    return response.text?.split('\n').filter(Boolean) || [];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
