import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = streamText({
      model: openai("gpt-4.1-nano"),
      prompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return Response.json({ error: message }, { status: 500 });
  }
}
