import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, getProjects } from '@/lib/content';
import { getGitHubDocs } from '@/lib/github';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';
import ReecallBenchmark from '@/components/ui/ReecallBenchmark';
import { ArrowLeft, ExternalLink, Github, BookOpen, Layers, Cpu } from 'lucide-react';


interface Props {
  params: Promise<{ slug: string }>;
}


export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} - System Overview | Om Ghante`,
    description: project.description,
  };
}

export default async function ProjectDetailPage(props: Props) {
  const params = await props.params;
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  // Fetch GitHub README documentation if available
  const docs = project.docsSlug ? await getGitHubDocs(project.docsSlug) : [];
  const readmeDoc = docs.length > 0 ? docs[0] : null;

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-12 space-y-12">

        {/* BACK LINK */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Projects
          </Link>
        </div>

        {/* PROJECT HEADER */}
        <section className="space-y-6 border-b border-zinc-200 pb-8">
          <div className="flex items-center gap-2">
            <Badge variant="mono">{project.category}</Badge>
            <Badge variant="accent">{project.status}</Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
            {project.description}
          </p>

          {project.outcome && (
            <div className="rounded-lg bg-zinc-50 p-4 border border-zinc-200 text-xs font-medium text-zinc-800 flex items-center gap-2">
              <span className="text-navy-900 font-bold">⚡ Impact Outcome:</span> {project.outcome}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-navy-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-950"
            >
              <Github className="h-4 w-4" /> View GitHub Repository
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
              >
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            )}

            {project.docsSlug && (
              <Link
                href={`/docs/${project.docsSlug}/getting-started`}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 transition-colors"
              >
                <BookOpen className="h-4 w-4 text-navy-900" /> Read GitHub Docs
              </Link>
            )}
          </div>
        </section>

        {/* SYSTEM SPECS & STACK */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-navy-900 flex items-center gap-1.5">
              <Cpu className="h-4 w-4" /> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-mono font-medium text-zinc-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-navy-900 flex items-center gap-1.5">
              <Layers className="h-4 w-4" /> Architecture Concepts
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.architectureTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-navy-900/10 text-navy-950 px-2.5 py-1 text-xs font-mono font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* AI MODEL BENCHMARKS — only for reecall-ai */}
        {params.slug === 'reecall-ai' && (
          <section className="pt-6 border-t border-zinc-200">
            <ReecallBenchmark />
          </section>
        )}

        {/* LIVE GITHUB README DOCUMENTATION */}

        {readmeDoc && (
          <section className="space-y-6 pt-6 border-t border-zinc-200">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h2 className="text-xl font-bold tracking-tight text-zinc-950 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-navy-900" /> Live GitHub Repository README
              </h2>
              <span className="text-xs font-mono text-zinc-500">Live Synced</span>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8">
              <MarkdownRenderer content={readmeDoc.content} />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
