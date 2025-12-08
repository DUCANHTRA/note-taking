// backend/services/geminiService.js
import axios from "axios";

export const getAISuggestions = async ({ title, content, tags }) => {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const prompt = `
You are an AI assistant helping users with note-taking.
Given this note:

Title: ${title}
Content: ${content}
Tags: ${tags.join(", ")}

Provide:
1. 3 related note ideas
2. 3 suggested tags
3. A short summary
`;

  const response = await axios.post(endpoint, {
    contents: [{ parts: [{ text: prompt }] }],
  });

  const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  return text;
};
