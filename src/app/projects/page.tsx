import React from 'react';
import Link from 'next/link';
import { getProjects } from '@/lib/content';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import { Github, ExternalLink, ArrowRight, Code2, Cpu, Terminal, Layers } from 'lucide-react';

export const metadata = {
  title: 'Engineering Showcase | Om Ghante',
  description: 'Main projects, algorithms, and NPM packages engineered by Om Ghante.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  const mainProjects = projects.filter((p) =>
    ['cartera', 'metapilot', 'paper', 'reecall-ai', 'tide-os'].includes(p.slug)
  );

  const algorithms = projects.filter((p) =>
    ['cascade-algorithm', 'cortex-algorithm'].includes(p.slug)
  );

  const npmPackages = projects.filter((p) =>
    ['git-context', 'om-ghante-custom-components'].includes(p.slug)
  );

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-12 space-y-16">
        {/* Page Header */}
        <div className="space-y-4 border-b border-zinc-200 pb-8">
          <Badge variant="mono">Engineering Showcase</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Projects, Algorithms & Developer Tools
          </h1>
          <p className="text-sm text-zinc-600 max-w-2xl leading-relaxed">
            Enterprise platforms, autonomous agentic ecosystems, high-performance execution algorithms, and open source NPM developer packages engineered by Om Ghante.
          </p>
        </div>

        {/* SECTION 1: MAIN PROJECTS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
            <Layers className="h-5 w-5 text-navy-900" />
            <h2 className="text-xl font-bold text-zinc-950">Main Projects & Ecosystems</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainProjects.map((project) => (
              <div
                key={project.slug}
                className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="mono">{project.category}</Badge>
                    <Badge variant="accent">{project.status}</Badge>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-950 group-hover:text-navy-900 transition-colors flex items-center justify-between">
                    {project.title}
                    <Link href={`/projects/${project.slug}`} className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-4 w-4 text-navy-900" />
                    </Link>
                  </h3>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {project.description}
                  </p>

                  {project.outcome && (
                    <div className="rounded-md bg-zinc-50 p-2.5 border border-zinc-100 text-[11px] font-medium text-zinc-700">
                      ⚡ {project.outcome}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-semibold text-navy-900 hover:underline flex items-center gap-1"
                  >
                    System Specs <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-950 flex items-center gap-1"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-950 flex items-center gap-1"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: ALGORITHMS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
            <Cpu className="h-5 w-5 text-navy-900" />
            <h2 className="text-xl font-bold text-zinc-950">Algorithms & Core Data Systems</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {algorithms.map((algo) => (
              <div
                key={algo.slug}
                className="group rounded-xl border border-zinc-200 bg-white p-6 space-y-4 hover:border-zinc-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="mono">{algo.category}</Badge>
                    <Badge variant="outline">{algo.status}</Badge>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-950 group-hover:text-navy-900 transition-colors">
                    {algo.title}
                  </h3>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {algo.description}
                  </p>

                  {algo.outcome && (
                    <div className="rounded-md bg-zinc-50 p-2 border border-zinc-100 text-[11px] font-medium text-zinc-700">
                      🎯 {algo.outcome}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <a
                    href={algo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-navy-900 hover:underline flex items-center gap-1"
                  >
                    <Github className="h-3.5 w-3.5" /> View Algorithm Repo <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: NPM PACKAGES */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
            <Terminal className="h-5 w-5 text-navy-900" />
            <h2 className="text-xl font-bold text-zinc-950">NPM Packages & DevTools</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {npmPackages.map((pkg) => (
              <div
                key={pkg.slug}
                className="group rounded-xl border border-zinc-200 bg-white p-6 space-y-4 hover:border-zinc-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="mono">NPM Package</Badge>
                    <Badge variant="accent">{pkg.status}</Badge>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-950 group-hover:text-navy-900 transition-colors font-mono">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {pkg.description}
                  </p>

                  {pkg.outcome && (
                    <div className="rounded-md bg-zinc-50 p-2 border border-zinc-100 text-[11px] font-medium text-zinc-700">
                      🚀 {pkg.outcome}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <a
                    href={pkg.demoUrl || pkg.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-navy-900 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> View on NPM <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={pkg.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-zinc-950 flex items-center gap-1"
                  >
                    <Github className="h-3.5 w-3.5" /> Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
