// geminiQuizApi.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "./config"; // Adjust the path as needed

const apiKey = "AIzaSyCFuwmLoBPKlTZhWmW7XOGH_A9Tegv8xuw";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: SYSTEM_INSTRUCTION,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function generateQuizData(topic, numQuestions) {
  const prompt = `Generate ${numQuestions} multiple-choice questions related to ${topic}.`;
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return JSON.parse(result.response.text()); // Parse the JSON response
}
