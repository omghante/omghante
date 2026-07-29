import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import { Mail, Github, Linkedin, Twitter, UserCheck, Zap, FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Contact Om Ghante | Software Engineer & Consultant',
  description: 'Get in touch with Om Ghante for full-time software engineering roles, technical consultation, and freelance services.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 py-12 space-y-12">
        <div className="space-y-4 border-b border-zinc-200 pb-8">
          <Badge variant="mono">Direct Contact & Engagement</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Work With Me & Get in Touch
          </h1>
          <p className="text-sm text-zinc-600 max-w-2xl leading-relaxed">
            Open for Full-time Software Engineering positions, technical architecture consultation, enterprise software development, and specialized AI integrations.
          </p>
        </div>

        {/* WAYS TO WORK TOGETHER GRID */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-zinc-950">Ways to Work Together</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 01. Full-time Roles */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4 hover:border-zinc-300 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-navy-900">01</span>
                  <Badge variant="accent">Full-Time / Contract</Badge>
                </div>

                <h3 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-navy-900" /> 01. You Can Hire Me
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  Open for Full-time Software Engineer, Distributed Backend Architect, or AI Engineer positions at high-growth tech companies.
                </p>

                <ul className="text-xs text-zinc-700 space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-navy-900"></span> Backend Systems & Microservices (Node.js, Go, Python)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-navy-900"></span> AI Agents, RAG & LLM Context Tools
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
                  <FileText className="h-3.5 w-3.5" /> Resume PDF
                </a>
              </div>
            </div>

            {/* 02. Freelance Services */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4 hover:border-zinc-300 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-navy-900">02</span>
                  <Badge variant="mono">Freelance & Consulting</Badge>
                </div>

                <h3 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-navy-900" /> 02. Freelancing & Services
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  Contact me for end-to-end custom software builds, ERP/CRM implementations, API queue rate limiters, and system performance optimizations.
                </p>

                <ul className="text-xs text-zinc-700 space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-navy-900"></span> Enterprise ERP/CRM & SaaS Applications
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-navy-900"></span> Meta Graph & Conversational AI Bots
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <a
                  href="mailto:mr.omghante1@gmail.com?subject=Freelance%20/%20Consulting%20Inquiry%20-%20Om%20Ghante"
                  className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> Book Consultation <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* DIRECT SOCIAL LINKS */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-950">Direct Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="mailto:mr.omghante1@gmail.com"
              className="group rounded-xl border border-zinc-200 bg-white p-5 space-y-2 hover:border-zinc-300 hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-2 text-navy-900 font-semibold text-sm">
                <Mail className="h-4 w-4" /> Email
              </div>
              <p className="text-xs text-zinc-600">mr.omghante1@gmail.com</p>
            </a>

            <a
              href="https://github.com/omghante"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-zinc-200 bg-white p-5 space-y-2 hover:border-zinc-300 hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-2 text-navy-900 font-semibold text-sm">
                <Github className="h-4 w-4" /> GitHub
              </div>
              <p className="text-xs text-zinc-600">github.com/omghante</p>
            </a>

            <a
              href="https://www.linkedin.com/in/om-ghante/"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-zinc-200 bg-white p-5 space-y-2 hover:border-zinc-300 hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-2 text-navy-900 font-semibold text-sm">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </div>
              <p className="text-xs text-zinc-600">linkedin.com/in/om-ghante</p>
            </a>

            <a
              href="https://x.com/OmGhante"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-zinc-200 bg-white p-5 space-y-2 hover:border-zinc-300 hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-2 text-navy-900 font-semibold text-sm">
                <Twitter className="h-4 w-4" /> Twitter / X
              </div>
              <p className="text-xs text-zinc-600">x.com/OmGhante</p>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
