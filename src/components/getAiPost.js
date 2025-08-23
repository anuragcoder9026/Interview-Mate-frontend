
import {  GoogleGenerativeAI,HarmCategory,HarmBlockThreshold, } from "@google/generative-ai";
import { marked } from 'marked';

// const apiKey = "AIzaSyCxd0z042alMBmwX97IdfnsiKBvILBOfA8";
const apiKey = "AIzaSyDZQSx-teyN8G-pbMq8i_tWfNV2LbblopQ";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: "creat a detailed post about topic of given prompt by user .",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

export async function GenerateAiPost(prompt) {
 const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  const parsedResponse = marked(result.response.text());
 return parsedResponse;
}
