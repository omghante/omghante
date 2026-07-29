'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error Boundary caught exception:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-xl px-6 py-20 flex flex-col items-center justify-center text-center space-y-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-navy-900 border border-zinc-200">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
            System Runtime Exception
          </h1>
          <p className="text-xs text-zinc-600 leading-relaxed max-w-md">
            An unhandled application error occurred. The system gracefully intercepted the runtime state.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-md bg-navy-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-950"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Retry State
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
          >
            <Home className="h-3.5 w-3.5" /> Return Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
