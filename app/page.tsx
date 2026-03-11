'use client';

import { useActionState } from 'react';
import { shortenUrl } from './actions';

type ActionState = {
  success: boolean;
  message?: string;
  shortUrl?: string;
  id?: string;
};

export default function Shortener() {
  const [state, formAction, isPending] = useActionState(shortenUrl, {
    success: false,
    message: '',
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🔗</div>
          <h1 className="text-4xl font-bold">My Shortener</h1>
          <p className="text-zinc-400 mt-2">Shorten any link instantly</p>
        </div>

        <form action={formAction} className="bg-zinc-900 rounded-3xl p-8 space-y-6">
          <input
            type="url"
            name="url"
            required
            placeholder="https://very-long-url.com/..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 text-white"
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-white text-black font-semibold py-4 rounded-2xl hover:bg-zinc-200 transition disabled:opacity-50"
          >
            {isPending ? 'Shortening...' : 'Shorten URL'}
          </button>

          {state.message && (
            <div className={`rounded-2xl p-4 text-center text-sm ${
              state.success 
                ? 'bg-green-900/50 border border-green-500 text-green-400' 
                : 'bg-red-900/50 border border-red-500 text-red-400'
            }`}>
              {state.success && state.shortUrl ? (
                <p className="font-mono break-all">{state.shortUrl}</p>
              ) : (
                state.message
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}