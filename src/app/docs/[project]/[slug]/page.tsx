import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGitHubDocBySlug, getGitHubDocs } from '@/lib/github';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DocsSidebar from '@/components/layout/DocsSidebar';
import Badge from '@/components/ui/Badge';
import { ChevronRight } from 'lucide-react';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';

export async function generateStaticParams() {
  const projects = ['metapilot', 'git-context', 'cartera', 'paper', 'reecall-ai', 'patch-ai', 'tide-os'];
  const paramsList = [];

  for (const proj of projects) {
    const docs = await getGitHubDocs(proj);
    for (const doc of docs) {
      paramsList.push({
        project: proj,
        slug: doc.slug,
      });
    }
  }

  return paramsList;
}

export default async function DocDetailPage(props: {
  params: Promise<{ project: string; slug: string }>;
}) {
  const params = await props.params;
  const doc = await getGitHubDocBySlug(params.project, params.slug);
  const allProjectDocs = await getGitHubDocs(params.project);

  if (!doc) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased">
      <Header />

      <div className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 md:py-8 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {/* RESPONSIVE SIDEBAR NAVIGATION */}
        <DocsSidebar
          project={params.project}
          currentSlug={params.slug}
          allProjectDocs={allProjectDocs}
          currentDocTitle={doc.title}
          currentCategory={doc.category}
          repoUrl={doc.repoUrl}
        />

        {/* MAIN DOCUMENTATION ARTICLE (FORMATTED MARKDOWN) */}
        <main className="md:col-span-3 lg:col-span-4 space-y-6 min-w-0 px-2 sm:px-0">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500 font-mono border-b border-zinc-100 pb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link href="/docs" className="hover:text-zinc-950">Docs</Link>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="capitalize">{params.project}</span>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="text-zinc-500 font-medium">{doc.category}</span>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="text-zinc-950 font-semibold truncate max-w-[180px] sm:max-w-none">{doc.title}</span>
            </div>
            <Badge variant="mono">GitHub Live Sync</Badge>
          </div>

          <div className="space-y-2 border-b border-zinc-200 pb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 leading-tight">
              {doc.title}
            </h1>
            {doc.description && (
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-mono">
                {doc.description}
              </p>
            )}
          </div>

          {/* Formatted Markdown Output with Mermaid Diagram & GFM Support */}
          <article className="py-2 overflow-hidden">
            <MarkdownRenderer content={doc.content} />
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}

