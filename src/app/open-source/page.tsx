import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getGitHubPullRequests } from '@/lib/github';
import OpenSourceClient from './OpenSourceClient';
import { GitPullRequest } from 'lucide-react';

export const metadata = {
  title: 'Open Source Contributions | Om Ghante',
  description: 'Upstream open source pull requests and contributions to nodejs/node and electron/electron by Om Ghante.',
};

export default async function OpenSourcePage() {
  const pullRequests = await getGitHubPullRequests();

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-12 space-y-10">
        {/* HEADER BANNER */}
        <div className="space-y-3 border-b border-zinc-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-xs font-mono text-zinc-700">
            <GitPullRequest className="h-3.5 w-3.5 text-navy-900" />
            GitHub Upstream Open Source Contributions
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Open Source Upstream PRs
          </h1>

          <p className="text-sm text-zinc-600 max-w-2xl leading-relaxed">
            I contribute to core open-source frameworks and infrastructure projects including Node.js Core and Electron Core.
          </p>
        </div>

        {/* INTERACTIVE ECOSYSTEM CARDS & PR LIST */}
        <section className="space-y-6">
          <OpenSourceClient initialPullRequests={pullRequests} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
