"use client";

import { useState } from "react";

export default function CompletionPage() {
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const data = await res.json();
      setCompletion(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch bg-black min-h-screen">
      {error && (
        <p className="text-red-500 bg-red-950 border border-red-800 rounded p-3 text-sm">
          {error}
        </p>
      )}
      {loading && <p>Loading...</p>}
      {completion && <div className="whitespace-pre-wrap">{completion}</div>}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-900"
      >
        <div className="flex gap-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white p-2 border border-zinc-300 dark:border-zinc-600 rounded"
            placeholder="How can I help you?"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
