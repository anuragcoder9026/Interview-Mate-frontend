// geminiQuizApi.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCxd0z042alMBmwX97IdfnsiKBvILBOfA8";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "from now Generate [NUMBER_OF_QUESTIONS] multiple-choice questions related to [TOPIC_NAME]. Each question should have a unique qid, a question (ques), an answer (ans), and four options (options). The answer should be indicated by the corresponding option letter (A, B, C, or D). Format the response as a JSON array of objects.",
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
