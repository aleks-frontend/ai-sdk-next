import { streamText, Output } from "ai";
import { openai } from "@ai-sdk/openai";
import { recipeSchema } from "./schema";

export async function POST(req: Request) {
  try {
    const { dish }: { dish: string } = await req.json();

    const result = streamText({
      model: openai("gpt-4.1-nano"),
      output: Output.object({ schema: recipeSchema }),
      prompt: `generate a recipe for ${dish}`,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return Response.json({ error: message }, { status: 500 });
  }
}
