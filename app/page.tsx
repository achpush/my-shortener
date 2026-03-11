'use client';

import { useActionState } from 'react';
import { shortenUrl } from './actions';

export default function Shortener() {
  const [state, formAction, isPending] = useActionState(shortenUrl, { success: false });

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🔗</div>
          <h1 className="text-4xl font-bold">My Shortener</h1>
          <p className="text-zinc-400 mt-2">Shorten any link • Powered by Vercel</p>
        </div>

        <form action={formAction} className="bg-zinc-900 rounded-3xl p-8 space-y-6">
          <input
            type="url"
            name="url"
            required
            placeholder="https://very-long-url.com/..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-white text-black font-semibold py-4 rounded-2xl hover:bg-zinc-200 transition"
          >
            {isPending ? 'Shortening...' : 'Shorten URL'}
          </button>

          {state.success && (
            <div className="bg-green-900/50 border border-green-500 rounded-2xl p-4 text-center">
              <p className="font-mono text-sm break-all">{state.shortUrl}</p>
              <p className="text-xs text-green-400 mt-2">Copy and share! 🎉</p>
            </div>
          )}
          {state.message && !state.success && (
            <p className="text-red-400 text-center">{state.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}