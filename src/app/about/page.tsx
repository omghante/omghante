import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import { Briefcase, GraduationCap, Github, Mail, FileText, Award, Users, Code2 } from 'lucide-react';

export const metadata = {
  title: 'About Om Ghante | Backend Engineer & Systems Builder',
  description: 'Detailed background, technical experience, open source contributions, and leadership of Om Ghante.',
};

export default function AboutPage() {
  const experiences = [
    {
      role: 'Software Developer Intern',
      company: 'CurlShell · Internship',
      period: 'Dec 2025 – May 2026 · 6 mos',
      location: 'Pune/Pimpri-Chinchwad Area · Hybrid',
      description: 'Building scalable backend microservices, high-throughput message queues, and cloud infrastructure optimizations.',
      tech: ['React', 'Python', 'AWS', 'Docker', 'Microservices'],
    },
    {
      role: 'Founder',
      company: 'Prismas · Self-employed',
      period: 'Apr 2025 – Dec 2025 · 9 mos',
      location: 'Kolhapur, Maharashtra, India · Hybrid',
      description: 'Leading engineering for enterprise-grade ERP, CRM, and HRMS applications serving startups and enterprises.',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Redis'],
    },
    {
      role: 'Software Developer',
      company: 'Synfuse · Freelance',
      period: 'Jan 2023 – Dec 2024 · 2 yrs',
      location: 'Kolhapur, Maharashtra, India · Remote',
      description: 'Delivered production web platforms and cross-platform mobile software for enterprise clients.',
      tech: ['React Native', 'Firebase', 'TypeScript', 'Node.js'],
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

  const volunteering = [
    {
      role: 'Campus Mantri',
      organization: 'GeeksforGeeks',
      period: 'May 2025 – May 2026 · 1 yr 1 mo',
      description: 'Promoting competitive programming, developer education, and technical workshops on campus.',
    },
    {
      role: 'Event Head – PRABAL 2025 National Hackathon',
      organization: 'GDG On Campus SGU',
      period: 'Jan 2025 – May 2025 · 5 mos',
      description: 'Led planning and execution of Maharashtra’s premier national hackathon with 500+ participants and 120+ competing teams over 3 days & 2 nights.',
    },
    {
      role: 'Secretary',
      organization: 'GDG On Campus SGU',
      period: 'Apr 2024 – Apr 2025 · 1 yr',
      description: 'Managed developer community initiatives, hands-on workshops on Git/GitHub version control, and tech events.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans antialiased">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-4xl px-6 py-12 space-y-16">
        {/* HEADER SECTION */}
        <div className="space-y-4 border-b border-zinc-200 pb-8">
          <Badge variant="mono">Backend Engineer & Systems Builder</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            About Om Ghante
          </h1>
          <p className="text-sm text-zinc-700 font-medium">
            Backend Engineer Building Distributed Systems & Developer Tools | SDE Intern @ CurlShell
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="/omghante.pdf"
              download="Om_Ghante_Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-md bg-navy-900 px-4 py-2 text-xs font-semibold text-white hover:bg-navy-950 transition-colors"
            >
              <FileText className="h-4 w-4" /> Download Resume PDF
            </a>
            <a
              href="https://github.com/omghante"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              <Github className="h-4 w-4" /> GitHub Profile
            </a>
            <a
              href="https://www.linkedin.com/in/om-ghante"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* NARRATIVE ABOUT BIO */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-950 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-navy-900" /> Engineering Story
          </h2>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 space-y-4 text-xs sm:text-sm text-zinc-700 leading-relaxed">
            <p>
              Most of my time goes into building things.
            </p>
            <p>
              Over the years, I&apos;ve worked on developer tools, distributed messaging systems, multi-agent platforms, and AI-powered applications. Some started as hackathon projects, some became long-term experiments, and some found their way into real-world usage.
            </p>
            <p>
              I enjoy taking ideas from a whiteboard, turning them into working systems, and understanding what happens when those systems are pushed beyond their limits. This has led me to work on projects involving asynchronous processing, distributed coordination, automation, and software infrastructure.
            </p>
            <p>
              Along the way, I&apos;ve contributed to open-source projects in the Node.js and Electron ecosystems, organized developer communities and hackathons, and built products both independently and as part of teams.
            </p>
            <p>
              Outside of internships and academics, I spend a significant amount of time building side projects, experimenting with new systems, and documenting ideas through technical projects and engineering content.
            </p>
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-navy-900" />
            <h2 className="text-xl font-bold text-zinc-950">Work Experience</h2>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-zinc-200 space-y-2">
                <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-navy-900"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-bold text-zinc-950 text-sm">{exp.role}</span>
                  <span className="font-mono text-zinc-500">{exp.period}</span>
                </div>
                <div className="text-xs text-navy-900 font-semibold">{exp.company}</div>
                <div className="text-[11px] text-zinc-400 font-mono">{exp.location}</div>
                <p className="text-xs text-zinc-600 leading-relaxed pt-1">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.tech.map((t) => (
                    <span key={t} className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-mono text-zinc-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-navy-900" />
            <h2 className="text-xl font-bold text-zinc-950">Education Timeline</h2>
          </div>

          <div className="space-y-8">
            {education.map((edu, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-zinc-200 space-y-2">
                <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-navy-900"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-bold text-zinc-950 text-sm">{edu.degree}</span>
                  <span className="font-mono text-zinc-500">{edu.period}</span>
                </div>
                <div className="text-xs text-navy-900 font-semibold">{edu.institution}</div>
                <p className="text-xs text-zinc-600">{edu.field}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VOLUNTEERING & LEADERSHIP */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-navy-900" />
            <h2 className="text-xl font-bold text-zinc-950">Community Leadership & Volunteering</h2>
          </div>

          <div className="space-y-6">
            {volunteering.map((vol, idx) => (
              <div key={idx} className="rounded-xl border border-zinc-200 bg-white p-5 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-bold text-zinc-950 text-sm">{vol.role}</span>
                  <span className="font-mono text-zinc-500 text-[11px]">{vol.period}</span>
                </div>
                <div className="text-xs text-navy-900 font-semibold">{vol.organization}</div>
                <p className="text-xs text-zinc-600 leading-relaxed pt-1">{vol.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
