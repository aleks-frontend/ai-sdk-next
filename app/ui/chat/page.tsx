"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat();

  const isLoading = status === "submitted" || status === "streaming";

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch bg-black min-h-screen">
      {error && (
        <p className="text-red-500 bg-red-950 border border-red-800 rounded p-3 text-sm">
          {error.message}
        </p>
      )}

      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
              {message.role === "user" ? "You:" : "AI:"}
            </span>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return <span key={i}>{part.text}</span>;
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </div>

      {isLoading && (
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
