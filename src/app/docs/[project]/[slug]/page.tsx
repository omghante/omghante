import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGitHubDocBySlug, getGitHubDocs } from '@/lib/github';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import { ChevronRight, FileText, Github } from 'lucide-react';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';

export async function generateStaticParams() {
  const metaDocs = await getGitHubDocs('meta-pilot');
  return metaDocs.map((doc) => ({
    project: 'meta-pilot',
    slug: doc.slug,
  }));
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

      <div className="flex-1 mx-auto w-full max-w-6xl px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 space-y-4 border-r border-zinc-200 pr-6">
          <div className="space-y-1">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-navy-900">
              {params.project.replace('-', ' ')}
            </h3>
            <p className="text-[11px] text-zinc-500">Live GitHub Specs</p>
          </div>

          <nav className="space-y-1 text-xs">
            {allProjectDocs.map((item) => {
              const active = item.slug === params.slug;
              return (
                <Link
                  key={item.slug}
                  href={`/docs/${params.project}/${item.slug}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${
                    active
                      ? 'bg-navy-900 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-zinc-100">
            <a
              href={doc.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-950 font-mono"
            >
              <Github className="h-3.5 w-3.5" /> Repository Source
            </a>
          </div>
        </aside>

        <main className="md:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
            <div className="flex items-center gap-1.5">
              <Link href="/docs" className="hover:text-zinc-950">Docs</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="capitalize">{params.project}</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-zinc-950 font-semibold">{doc.title}</span>
            </div>
            <Badge variant="mono">GitHub Live Sync</Badge>
          </div>

          <div className="space-y-2 border-b border-zinc-200 pb-6">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
              {doc.title}
            </h1>
            {doc.description && (
              <p className="text-sm text-zinc-600 leading-relaxed">
                {doc.description}
              </p>
            )}
          </div>

          <article className="py-2">
            <MarkdownRenderer content={doc.content} />
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
