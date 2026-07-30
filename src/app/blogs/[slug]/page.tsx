import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGitHubBlogs, getGitHubBlogBySlug } from '@/lib/github';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import { ArrowLeft, Clock, Calendar, User, Github } from 'lucide-react';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';

export async function generateStaticParams() {
  const blogs = await getGitHubBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const blog = await getGitHubBlogBySlug(params.slug);
  if (!blog) return { title: 'Article Not Found' };
  return {
    title: `${blog.title} | Om Ghante`,
    description: blog.summary,
  };
}

export default async function BlogDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const blog = await getGitHubBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-3xl px-6 py-12 space-y-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to GitHub Articles
        </Link>

        <header className="space-y-4 border-b border-zinc-200 pb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="mono">
                  #{tag}
                </Badge>
              ))}
            </div>
            <Badge variant="mono">GitHub Live Sync</Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-zinc-100 text-xs text-zinc-500 font-mono">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-navy-900" /> {blog.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {blog.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {blog.readingTime}
              </span>
            </div>

            <a
              href={blog.rawUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-950 flex items-center gap-1 self-start sm:self-auto"
            >
              <Github className="h-3.5 w-3.5" /> View Raw
            </a>
          </div>
        </header>

        <article className="py-2">
          <MarkdownRenderer content={blog.content} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
