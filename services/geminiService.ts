import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProfile = async (profile: UserProfile): Promise<AnalysisResult> => {
  const prompt = `
    Analyze the following candidate profile for career optimization.
    
    Candidate Name: ${profile.name}
    Education: ${profile.education}
    Stated Skills: ${profile.skills}
    Interests: ${profile.interests}
    Resume Content: ${profile.resumeText}

    Please provide:
    1. A skills analysis (strengths, weaknesses, and a numeric skill matrix for a radar chart).
    2. Top 5 career matches with match percentage, salary range, and demand.
    3. A personalized learning roadmap with phases.
    4. Resume feedback with a score out of 100.
    5. A fully rewritten, professional "Resume Body" text. 
       - IMPORTANT: Do NOT include the Name, Email, or Contact Info at the top (these will be added dynamically).
       - Start directly with a "Professional Summary".
       - Include "Experience", "Projects", "Education" (optimized), and "Skills" sections.
       - Use clear formatting with bullet points where appropriate.
       - Ensure the Education section from the profile is included and formatted professionally.

    Be realistic but encouraging. The tone should be professional and futuristic.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          skillsAnalysis: {
            type: Type.OBJECT,
            properties: {
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
              skillMatrix: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    skill: { type: Type.STRING },
                    level: { type: Type.INTEGER, description: "Skill level from 0 to 100" },
                    category: { type: Type.STRING, description: "e.g., Technical, Soft, Analytical" }
                  }
                }
              }
            }
          },
          careerMatches: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                matchPercentage: { type: Type.INTEGER },
                salaryRange: { type: Type.STRING },
                demandLevel: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                description: { type: Type.STRING }
              }
            }
          },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING, description: "e.g., Phase 1: Foundations" },
                duration: { type: Type.STRING },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          resumeFeedback: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
              improvements: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          optimizedResume: {
            type: Type.STRING,
            description: "The formatted body text of the resume including Summary, Experience, Education and Skills sections."
          }
        }
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as AnalysisResult;
  }
  
  throw new Error("Failed to generate analysis");
};

export const generateJobSimulations = async (matches: any[]) => {
    // This function would typically fetch real jobs. 
    return [];
};

export const askAiAssistant = async (message: string): Promise<string> => {
  const prompt = `
    You are "CareerPilot", an AI support assistant for a career guidance web application.
    
    The user is asking: "${message}"
    
    Guidelines:
    1. If the user is facing an error (e.g., "login failed", "data not saving"), provide specific troubleshooting steps relevant to a modern web app (check internet, clear cache, try again).
    2. If the user asks about career advice, provide a brief, helpful tip but gently remind them to use the main "Start Analysis" feature on the dashboard for a full report.
    3. Keep your response concise (under 50 words usually), friendly, and professional.
    4. Your tone should be helpful and reassuring.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "I'm having a bit of trouble connecting to my knowledge base. Please try again in a moment.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I apologize, but I'm currently unable to process your request. Please check your connection.";
  }
};