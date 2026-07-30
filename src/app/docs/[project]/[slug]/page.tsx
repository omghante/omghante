import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGitHubDocBySlug, getGitHubDocs } from '@/lib/github';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import { ChevronRight, FileText, Github, BookOpen } from 'lucide-react';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';

export async function generateStaticParams() {
  const projects = ['metapilot', 'git-context', 'cartera', 'paper'];
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

  // Group docs by category for Left Sidebar
  const categoriesMap: Record<string, typeof allProjectDocs> = {};
  allProjectDocs.forEach((item) => {
    const cat = item.category || 'Documentation';
    if (!categoriesMap[cat]) {
      categoriesMap[cat] = [];
    }
    categoriesMap[cat].push(item);
  });

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased">
      <Header />

      <div className="flex-1 mx-auto w-full max-w-7xl px-6 py-8 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside className="md:col-span-1 lg:col-span-1 space-y-6 border-r border-zinc-200 pr-6 overflow-y-auto max-h-[calc(100vh-120px)] sticky top-20">
          <div className="space-y-1 pb-2 border-b border-zinc-200">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-navy-900 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {params.project.replace('-', ' ')}
            </h3>
            <p className="text-[11px] text-zinc-500 font-mono">
              Live GitHub Docs ({allProjectDocs.length} pages)
            </p>
          </div>

          <nav className="space-y-5 text-xs">
            {Object.entries(categoriesMap).map(([categoryName, items]) => (
              <div key={categoryName} className="space-y-1.5">
                <h4 className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider px-2">
                  {categoryName}
                </h4>
                <div className="space-y-0.5">
                  {items.map((item) => {
                    const active = item.slug === params.slug;
                    return (
                      <Link
                        key={item.slug}
                        href={`/docs/${params.project}/${item.slug}`}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium transition-all text-[12px] leading-snug ${
                          active
                            ? 'bg-navy-900 text-white font-semibold shadow-xs'
                            : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/80'
                        }`}
                      >
                        <FileText className={`h-3.5 w-3.5 shrink-0 ${active ? 'text-white' : 'text-zinc-400'}`} />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="pt-4 border-t border-zinc-200">
            <a
              href={doc.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-950 font-mono"
            >
              <Github className="h-3.5 w-3.5" /> Repository File Source
            </a>
          </div>
        </aside>

        {/* MAIN DOCUMENTATION ARTICLE (FORMATTED MARKDOWN) */}
        <main className="md:col-span-3 lg:col-span-4 space-y-6 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500 font-mono border-b border-zinc-100 pb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link href="/docs" className="hover:text-zinc-950">Docs</Link>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="capitalize">{params.project}</span>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="text-zinc-500 font-medium">{doc.category}</span>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
              <span className="text-zinc-950 font-semibold">{doc.title}</span>
            </div>
            <Badge variant="mono">GitHub Live Sync</Badge>
          </div>

          <div className="space-y-2 border-b border-zinc-200 pb-6">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              {doc.title}
            </h1>
            {doc.description && (
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-mono">
                {doc.description}
              </p>
            )}
          </div>

          {/* Formatted Markdown Output with Mermaid Diagram & GFM Support */}
          <article className="py-2">
            <MarkdownRenderer content={doc.content} />
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
