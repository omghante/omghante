import React from 'react';
import Link from 'next/link';
import { getProjects } from '@/lib/content';
import { getGitHubBlogs } from '@/lib/github';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import {
  ArrowRight,
  Github,
  Layers,
  Cpu,
  Terminal,
  Briefcase,
  GraduationCap,
  Mail,
  FileText,
  UserCheck,
  Zap,
  Sparkles,
} from 'lucide-react';

export default async function HomePage() {
  const projects = await getProjects();
  const blogs = await getGitHubBlogs();

  const featuredProjects = projects.filter((p) => p.featured);
  const latestBlogs = blogs.slice(0, 3);

  const experiences = [
    {
      role: 'Software Developer Intern',
      company: 'CurlShell · Internship',
      period: 'Dec 2025 – May 2026 · 6 mos',
      location: 'Pune/Pimpri-Chinchwad Area · Hybrid',
      description: 'Building scalable backend microservices, high-throughput message queues, and cloud infrastructure optimizations.',
      tech: ['React', 'Python', 'AWS', 'Docker'],
    },
    {
      role: 'Founder',
      company: 'Prismas · Self-employed',
      period: 'Apr 2025 – Dec 2025 · 9 mos',
      location: 'Kolhapur, Maharashtra, India · Hybrid',
      description: 'Leading engineering for enterprise-grade ERP, CRM, and HRMS applications serving startups and enterprises.',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    },
    {
      role: 'Software Developer',
      company: 'Synfuse · Freelance',
      period: 'Jan 2023 – Dec 2024 · 2 yrs',
      location: 'Kolhapur, Maharashtra, India · Remote',
      description: 'Delivered production web platforms and cross-platform mobile software for enterprise clients.',
      tech: ['React Native', 'Firebase', 'TypeScript'],
    },
    {
      role: 'Intern',
      company: 'Anthaathi Private Limited · Internship',
      period: 'Aug 2022 – Oct 2022 · 3 mos',
      location: 'Kolhapur, Maharashtra, India · On-site',
      description: 'Worked on web application modules and front-end user interface components.',
      tech: ['JavaScript', 'HTML/CSS', 'UI Design'],
    },
  ];

  const education = [
    {
      degree: 'BCSI Bachelor Of Computer Science ( Hons )',
      field: 'Computer Engineering',
      institution: 'INTI International University',
      period: 'Jul 2025 – Dec 2025',
    },
    {
      degree: 'Bachelor of Technology - BTech',
      field: 'Artificial Intelligence & Machine Learning',
      institution: 'Sanjay Ghodawat University',
      period: 'Jul 2023 – Jun 2026',
    },
    {
      degree: 'Diploma',
      field: 'Computer Engineering',
      institution: 'D. Y. Patil College of Engineering & Technology (DYPCET)',
      period: 'Jul 2021 – Jun 2023',
    },
    {
      degree: '12th, HSC',
      field: 'Higher Secondary School Certificate',
      institution: 'Private High School and Junior College',
      period: 'Apr 2020 – Feb 2021',
    },
    {
      degree: '10th, SSC',
      field: 'Secondary School Certificate',
      institution: 'Private High School',
      period: 'May 2018 – Mar 2019',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased selection:bg-navy-900 selection:text-white">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-12 space-y-20">
        {/* HERO SECTION - SYNCED WITH LINKEDIN TAGLINE */}
        <section className="space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 text-xs font-medium text-zinc-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Backend Engineer Building Distributed Systems & Developer Tools | SDE Intern @ CurlShell
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 max-w-3xl leading-[1.1]">
            From Algorithms to Infrastructure.
          </h1>

          <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed">
            I am <strong className="text-zinc-950 font-semibold">Om Ghante</strong>. Backend Engineer, Distributed Systems Builder, and AI Systems Developer. I build production-grade enterprise platforms, high-throughput microservices, and autonomous AI agents.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-navy-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-navy-950"
            >
              Explore Projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
            >
              GitHub Articles
            </Link>
            <a
              href="https://github.com/omghante"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50"
            >
              <Github className="h-4 w-4" /> GitHub Profile
            </a>
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-zinc-200 pb-4">
            <div>
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-navy-900">
                01. Featured Engineering
              </h2>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-950 mt-1">
                Selected Works & Systems
              </h3>
            </div>
            <Link
              href="/projects"
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-950"
            >
              View All Projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.slug}
                className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="mono">{project.category}</Badge>
                    <Badge variant="accent">{project.status}</Badge>
                  </div>

                  <h4 className="text-xl font-bold text-zinc-950 group-hover:text-navy-900 transition-colors flex items-center justify-between">
                    {project.title}
                    <Link href={`/projects/${project.slug}`} className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-4 w-4 text-navy-900" />
                    </Link>
                  </h4>

                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">
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
                    className="font-medium text-navy-900 hover:underline flex items-center gap-1"
                  >
                    System Overview <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <a
                    href={project.githubUrl}
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

        {/* ENGINEERING PHILOSOPHY - FEATURING ORIGINAL ENGINEERING */}
        <section className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-navy-900">
              02. Philosophy
            </h2>
            <h3 className="text-xl font-bold tracking-tight text-zinc-950">
              How I Engineer Software
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs leading-relaxed">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-zinc-950">
                <Sparkles className="h-4 w-4 text-navy-900" /> Original Engineering
              </div>
              <p className="text-zinc-600">
                The real differentiator isn&apos;t just the tech stack. It&apos;s original engineering and personal design decisions behind every system.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-zinc-950">
                <Layers className="h-4 w-4 text-navy-900" /> Scalable Microservices
              </div>
              <p className="text-zinc-600">
                Building asynchronous message queues with Redis and BullMQ to isolate heavy workloads and maintain sub-150ms API responsiveness.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-zinc-950">
                <Cpu className="h-4 w-4 text-navy-900" /> Applied AI Engineering
              </div>
              <p className="text-zinc-600">
                Integrating Gemini APIs and LLM context trees into real-world business workflows like automated WhatsApp support bots.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-zinc-950">
                <Terminal className="h-4 w-4 text-navy-900" /> Developer Productivity
              </div>
              <p className="text-zinc-600">
                Creating CLI tools like `git-context` (`lexa`) to streamline multi-account Git identity management and per-folder credential isolation.
              </p>
            </div>
          </div>
        </section>

        {/* COMPLETE EXPERIENCE & EDUCATION SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Work Experience */}
          <div className="space-y-6">
            <div className="border-b border-zinc-200 pb-3 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-navy-900" />
              <h3 className="text-lg font-bold text-zinc-950">Work Experience</h3>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-zinc-200 space-y-1.5">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-navy-900"></div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-950">{exp.role}</span>
                    <span className="font-mono text-zinc-400 text-[11px] shrink-0">{exp.period}</span>
                  </div>
                  <div className="text-xs text-navy-900 font-medium">{exp.company}</div>
                  <div className="text-[11px] text-zinc-400 font-mono">{exp.location}</div>
                  <p className="text-xs text-zinc-600 leading-relaxed pt-0.5">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <div className="border-b border-zinc-200 pb-3 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-navy-900" />
              <h3 className="text-lg font-bold text-zinc-950">Education History</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-zinc-200 space-y-1.5">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-navy-900"></div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-950">{edu.degree}</span>
                    <span className="font-mono text-zinc-400 text-[11px] shrink-0">{edu.period}</span>
                  </div>
                  <div className="text-xs text-navy-900 font-medium">{edu.institution}</div>
                  <div className="text-xs text-zinc-600">{edu.field}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WAYS TO WORK TOGETHER SECTION */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200 pb-4">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-navy-900">
              03. Collaboration
            </h2>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-950 mt-1">
              Ways to Work Together
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 01. Full-time / Hire Me */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4 hover:border-zinc-300 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-navy-900">01</span>
                  <Badge variant="accent">Full-Time / Contract</Badge>
                </div>

                <h4 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-navy-900" /> Hire Me
                </h4>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  Available for Full-time Software Engineering roles, Backend Systems Architecture, or AI Integration positions at high-growth engineering teams.
                </p>

                <ul className="text-xs text-zinc-700 space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-navy-900"></span> Distributed Backend Systems (Node.js, Go, Python)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-navy-900"></span> Applied AI Agents & RAG Pipelines
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-navy-900"></span> Scalable Microservices Architecture
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center gap-3">
                <a
                  href="mailto:mr.omghante1@gmail.com?subject=Job%20Opportunity%20-%20Om%20Ghante"
                  className="inline-flex items-center gap-1.5 rounded-md bg-navy-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-navy-950 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> Email Opportunity
                </a>
                <a
                  href="/omghante.pdf"
                  download="Om_Ghante_Resume.pdf"
                  className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
                >
                  <FileText className="h-3.5 w-3.5" /> Download Resume
                </a>
              </div>
            </div>

            {/* 02. Freelance / Consulting */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4 hover:border-zinc-300 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-navy-900">02</span>
                  <Badge variant="mono">Freelance & Consulting</Badge>
                </div>

                <h4 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-navy-900" /> Technical Services
                </h4>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  Available for freelance projects, technical architecture consulting, custom ERP/CRM developments, and specialized AI/LLM integration solutions.
                </p>

                <ul className="text-xs text-zinc-700 space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-navy-900"></span> Enterprise ERP/CRM & SaaS Development
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-navy-900"></span> Meta Graph & WhatsApp API Automation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-navy-900"></span> System Design & Latency Audit
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <a
                  href="mailto:mr.omghante1@gmail.com?subject=Freelance%20/%20Consulting%20Inquiry%20-%20Om%20Ghante"
                  className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> Book Project Consultation <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* DYNAMIC GITHUB BLOGS */}
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-zinc-200 pb-4">
            <div>
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-navy-900 flex items-center gap-1.5">
                <Github className="h-3.5 w-3.5" /> Live GitHub Engineering Articles
              </h2>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-950 mt-1">
                GitHub Repository Synced Writing
              </h3>
            </div>
            <Link
              href="/blogs"
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 flex items-center gap-1"
            >
              All GitHub Articles <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {latestBlogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50 transition-all gap-4"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-zinc-950 group-hover:text-navy-900 transition-colors flex items-center gap-2">
                    {blog.title}
                    <Badge variant="mono">GitHub Live Sync</Badge>
                  </h4>
                  <p className="text-xs text-zinc-500 line-clamp-1">{blog.summary}</p>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono shrink-0">
                  <span>{blog.readingTime}</span>
                  <span>•</span>
                  <span>{blog.publishedDate}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-navy-900 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="rounded-2xl bg-navy-900 p-8 sm:p-12 text-white space-y-6">
          <div className="max-w-2xl space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to collaborate on complex software challenges?
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Open to engineering opportunities, technical system consultation, or discussing distributed backend design and AI integrations.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="mailto:mr.omghante1@gmail.com"
              className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-xs font-bold text-navy-900 transition-colors hover:bg-zinc-100"
            >
              <Mail className="h-4 w-4" /> Email Om Ghante
            </a>
            <a
              href="https://github.com/omghante"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
            >
              <Github className="h-4 w-4" /> GitHub Profile
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
