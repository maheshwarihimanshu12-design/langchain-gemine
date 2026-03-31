import { config } from "dotenv";
config();

import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.8,
  apiKey: process.env.GOOGLE_API_KEY,
  maxOutputTokens: 2076,
});

const prompt = PromptTemplate.fromTemplate(
  "Answer the following question: {question}"
);

const chain = prompt.pipe(model);

try {
  const response = await chain.invoke({
    question: "Updates on Russia and Ukraine conflict?",
  });

  console.log(response.content);
} catch (err) {
  console.error(err);
}