import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import { ArrowLeft, Home, BookOpen, Code, FileText, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center max-w-2xl mx-auto space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2">
            <Badge variant="mono">404 Error</Badge>
            <Badge variant="outline">Route Not Found</Badge>
          </div>

          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-zinc-950">
            404
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
            Page Not Found
          </h2>

          <p className="text-sm text-zinc-600 leading-relaxed max-w-md mx-auto">
            The page or article you are looking for doesn't exist, was moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-zinc-200">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-950 text-white font-medium text-xs hover:bg-zinc-800 transition-colors shadow-xs"
          >
            <Home className="h-4 w-4" /> Back to Home
          </Link>

          <Link
            href="/projects"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 font-medium text-xs text-zinc-800 hover:bg-zinc-100 transition-colors"
          >
            <Code className="h-4 w-4 text-zinc-600" /> View Projects
          </Link>

          <Link
            href="/blogs"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 font-medium text-xs text-zinc-800 hover:bg-zinc-100 transition-colors"
          >
            <BookOpen className="h-4 w-4 text-zinc-600" /> Read Blogs
          </Link>

          <Link
            href="/docs"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 font-medium text-xs text-zinc-800 hover:bg-zinc-100 transition-colors"
          >
            <FileText className="h-4 w-4 text-zinc-600" /> Explore Docs
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
