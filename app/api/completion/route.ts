import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST() {
  const { text } = await generateText({
    model: openai("gpt-4.1-nano"),
    prompt: "explain what llm is in simple words",
  });

  return Response.json({ text });
}
