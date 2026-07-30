import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import { BookOpen, ArrowRight, Github } from 'lucide-react';

export const metadata = {
  title: 'GitHub Documentation Hub | Om Ghante',
  description: 'Technical documentation, architecture guides, and API specs dynamically fetched from GitHub repositories by Om Ghante.',
};

export default function DocsHubPage() {
  const documentedProjects = [
    {
      name: 'Meta Pilot',
      slug: 'metapilot',
      firstDoc: 'portal-readme',
      repoUrl: 'https://github.com/omghante/metapilot',
      description: 'Enterprise Meta Graph API microservices integration engine (98 Documentation Pages Across 13 Categories).',
    },
    {
      name: 'Git Context',
      slug: 'git-context',
      firstDoc: 'getting-started',
      repoUrl: 'https://github.com/om-ghante/git-context',
      description: 'CLI context parser for assembling codebase prompts for AI agents.',
    },
    {
      name: 'Prismas ERP',
      slug: 'prismas-erp',
      firstDoc: 'getting-started',
      repoUrl: 'https://github.com/om-ghante/prismas-erp',
      description: 'Multi-tenant Enterprise Resource Planning system architectural overview.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 py-12 space-y-10">
        <div className="space-y-4 border-b border-zinc-200 pb-8">
          <Badge variant="mono">GitHub Live Sync Documentation</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Technical Specs & System Documentation
          </h1>
          <p className="text-sm text-zinc-600 max-w-2xl leading-relaxed">
            All documentation pages are dynamically fetched directly from GitHub repository markdown files (`README.md`).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documentedProjects.map((proj) => (
            <div
              key={proj.slug}
              className="group rounded-xl border border-zinc-200 bg-white p-6 space-y-4 hover:border-zinc-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="mono">GitHub Live</Badge>
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-500 hover:text-zinc-950 flex items-center gap-1 font-mono"
                  >
                    <Github className="h-3.5 w-3.5" /> Repository
                  </a>
                </div>

                <h2 className="text-xl font-bold text-zinc-950 group-hover:text-navy-900 transition-colors flex items-center justify-between">
                  {proj.name}
                  <ArrowRight className="h-4 w-4 text-navy-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <Link
                  href={`/docs/${proj.slug}/${proj.firstDoc}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:underline"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Read GitHub Specs <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
