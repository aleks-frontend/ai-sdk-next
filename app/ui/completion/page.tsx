export default function CompletionPage() {
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch bg-black min-h-screen">
      {/* Display area for completion will go here */}

      <form className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-900">
        <div className="flex gap-2">
          <input
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-600 rounded"
            placeholder="How can I help you?"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
