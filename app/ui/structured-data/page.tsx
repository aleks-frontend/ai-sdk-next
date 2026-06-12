"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { recipeSchema } from "../../api/structured-data/schema";
import { useState } from "react";

export default function StructuredDataPage() {
  const [dish, setDish] = useState("");
  const { object, submit, isLoading, error, stop } = useObject({
    api: "/api/structured-data",
    schema: recipeSchema,
  });

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!dish.trim()) return;
    submit({ dish });
  }

  const recipe = object?.recipe;

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch bg-black min-h-screen">
      {error && (
        <p className="text-red-500 bg-red-950 border border-red-800 rounded p-3 text-sm">
          {error.message}
        </p>
      )}

      {recipe && (
        <div className="flex flex-col gap-6">
          {recipe.name && (
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {recipe.name}
              </h1>
            </div>
          )}

          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-2">
                Ingredients
              </h2>
              <ul className="flex flex-col gap-1">
                {recipe.ingredients.map((ingredient: { name?: string; amount?: string } | undefined, i: number) => (
                  <li
                    key={i}
                    className="flex justify-between text-sm text-zinc-200 bg-zinc-900 border border-zinc-800 rounded px-3 py-2"
                  >
                    <span>{ingredient?.name}</span>
                    <span className="text-zinc-400">{ingredient?.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe.steps && recipe.steps.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-2">
                Steps
              </h2>
              <ol className="flex flex-col gap-2">
                {recipe.steps.map((step: string | undefined, i: number) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-200">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-semibold">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {isLoading && !recipe && (
        <div className="flex justify-start py-2">
          <div className="w-5 h-5 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-900"
      >
        <div className="flex gap-2">
          <input
            value={dish}
            onChange={(e) => setDish(e.target.value)}
            className="flex-1 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white p-2 border border-zinc-300 dark:border-zinc-600 rounded"
            placeholder="Enter a dish name..."
          />
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Generate
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
