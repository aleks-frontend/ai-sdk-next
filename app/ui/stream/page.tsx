"use client";

import { useCompletion } from "@ai-sdk/react";

export default function StreamPage() {
  const { input, handleInputChange, handleSubmit, setInput, completion, isLoading, error, stop } =
    useCompletion({ api: "/api/completion/stream" });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch bg-black min-h-screen">
      {error && (
        <p className="text-red-500 bg-red-950 border border-red-800 rounded p-3 text-sm">
          {error.message}
        </p>
      )}
      {isLoading && <p>Loading...</p>}
      {completion && <div className="whitespace-pre-wrap">{completion}</div>}

      <form
        onSubmit={(e) => { handleSubmit(e); setInput(""); }}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-900"
      >
        <div className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            className="flex-1 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white p-2 border border-zinc-300 dark:border-zinc-600 rounded"
            placeholder="How can I help you?"
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
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
