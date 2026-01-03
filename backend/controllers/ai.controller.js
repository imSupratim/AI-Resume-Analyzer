import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateSuggestions = async ({
  role,
  matchedSkills,
  missingSkills,
  jobDescription,
}) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an ATS resume expert and technical recruiter.

Target Role: ${role}

Matched Skills:
${matchedSkills.join(", ")}

Missing Skills:
${missingSkills.join(", ")}

Job Description:
${jobDescription}

Generate:
1. Resume improvement suggestions (bullet points)
2. ATS keyword optimization tips
3. A step-by-step skill gap learning roadmap

Keep responses concise, professional, and actionable.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
