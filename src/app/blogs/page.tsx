import React from 'react';
import Link from 'next/link';
import { getGitHubBlogs } from '@/lib/github';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import { ArrowRight, Clock, Github } from 'lucide-react';

export const metadata = {
  title: 'GitHub Synced Articles | Om Ghante',
  description: 'Technical writeups and engineering blogs dynamically fetched from GitHub repositories by Om Ghante.',
};

export default async function BlogsPage() {
  const blogs = await getGitHubBlogs();

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 py-12 space-y-10">
        <div className="space-y-4 border-b border-zinc-200 pb-8">
          <div className="flex items-center gap-2">
            <Badge variant="mono">GitHub Live Sync Engine</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Technical Insights & Writing
          </h1>
          <p className="text-sm text-zinc-600 max-w-2xl leading-relaxed">
            All articles are fetched live directly from GitHub repositories. Deep dives into distributed system queues, API performance, developer tooling, and AI.
          </p>
        </div>

        <div className="space-y-6">
          {blogs.map((blog) => (
            <article
              key={blog.slug}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-2">
                  <span>{blog.publishedDate}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {blog.readingTime}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="mono">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <h2 className="text-xl font-bold text-zinc-950 group-hover:text-navy-900 transition-colors">
                <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
              </h2>

              <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2">
                {blog.summary}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-navy-900 hover:underline"
                >
                  Read Article <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <a
                  href={blog.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-950"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub Repo
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
