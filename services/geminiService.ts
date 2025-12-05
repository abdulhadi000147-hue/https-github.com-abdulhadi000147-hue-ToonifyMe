import { GoogleGenAI } from "@google/genai";
import { CartoonStyle } from "../types";
import { stripBase64Prefix, getMimeTypeFromDataUrl } from "../utils/imageUtils";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPromptForStyle = (style: CartoonStyle): string => {
  switch (style) {
    case CartoonStyle.Pixar3D:
      return "Transform this image into a high-quality 3D animated movie character style (like Pixar or Disney). Make it look cute, expressive, and vibrant with soft lighting and smooth textures. Keep the original composition and facial features recognizable but stylized.";
    case CartoonStyle.Anime:
      return "Transform this image into a high-quality Japanese anime style illustration. Use vibrant colors, sharp lines, and distinct anime facial characteristics while keeping the subject recognizable.";
    case CartoonStyle.ComicBook:
      return "Transform this image into a classic western comic book style. Use bold outlines, half-tone patterns, and dramatic shading. Make it look like a panel from a superhero comic.";
    case CartoonStyle.Caricature:
      return "Transform this image into a funny and artistic caricature. Exaggerate distinct facial features slightly for a humorous effect while maintaining a high-quality hand-drawn artistic look.";
    case CartoonStyle.PixelArt:
      return "Transform this image into a 16-bit pixel art style. Use a limited, vibrant color palette and blocky pixels reminiscent of retro video games. Keep the subject recognizable but stylized as a game sprite.";
    case CartoonStyle.Claymation:
      return "Transform this image into a claymation style. Give the subject a textured, plasticine look with soft, rounded edges and stop-motion lighting, resembling a character from a stop-motion animated movie.";
    case CartoonStyle.Cyberpunk:
      return "Transform this image into a futuristic cyberpunk style. Add neon lighting (pink, blue, cyan), high-tech cybernetic details, and a dark, atmospheric background while keeping the facial features clear.";
    case CartoonStyle.Sketch:
      return "Transform this image into a charcoal or pencil sketch. Use visible hatching, shading lines, and a monochrome or sepia palette on a textured paper background.";
    default:
      return "Transform this image into a cartoon style.";
  }
};

export const generateCartoonImage = async (
  imageBase64: string,
  style: CartoonStyle
): Promise<string> => {
  try {
    const mimeType = getMimeTypeFromDataUrl(imageBase64);
    const cleanBase64 = stripBase64Prefix(imageBase64);
    
    const prompt = getPromptForStyle(style);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts) {
      throw new Error("No content generated");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        // Construct the data URL for the generated image
        // The API returns raw base64, usually in PNG or JPEG depending on the model output
        // We assume generic image/png for the output of image generation unless specified otherwise,
        // but let's check if the API provides a mimeType in the response part. 
        // Note: The GenAI SDK types suggest inlineData has mimeType.
        const outputMime = part.inlineData.mimeType || 'image/png';
        return `data:${outputMime};base64,${part.inlineData.data}`;
      }
    }

    // If no image part found, maybe there was text explaining why?
    const textPart = parts.find(p => p.text);
    if (textPart) {
      throw new Error(`Model returned text instead of image: ${textPart.text}`);
    }

    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};