'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, FileText, Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Projects', href: '/projects' },
    { name: 'Open Source', href: '/open-source' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Docs', href: '/docs' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) =>
    pathname ? pathname === path || pathname.startsWith(`${path}/`) : false;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md">
      {/* Primary Navigation Bar */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        {/* Identity / Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-white font-bold text-sm tracking-tight transition-transform group-hover:scale-105">
            OG
          </div>
          <div>
            <span className="font-bold text-zinc-950 tracking-tight block text-sm">
              Om Ghante
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100/80 p-1 rounded-full border border-zinc-200">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive(item.href)
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/omghante"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-600 hover:text-zinc-950 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="/omghante.pdf"
            download="Om_Ghante_Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-md bg-navy-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-navy-950"
          >
            <FileText className="h-3.5 w-3.5" />
            Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-600 hover:text-zinc-950"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Full-Width Dark Announcement Update Row */}
      <div className="w-full bg-[#141414] text-zinc-300 border-t border-b border-zinc-900 py-1.5 overflow-hidden text-[11px] font-sans flex items-center">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
          <div className="flex items-center gap-2.5">
            <span className="text-zinc-600 font-bold">•</span>
            <span className="bg-zinc-800 text-zinc-200 text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold uppercase tracking-wider">
              FOCUS
            </span>
            <span className="text-zinc-200">
              Currently working on ScheduleSomething and LayerdEvents algorithms
            </span>
            <Link
              href="/projects"
              className="text-white hover:underline flex items-center gap-1 font-medium pl-1"
            >
              Learn More <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-zinc-600 font-bold">•</span>
            <span className="bg-zinc-800 text-zinc-200 text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold uppercase tracking-wider">
              FOCUS
            </span>
            <span className="text-zinc-200">
              Currently working on ScheduleSomething and LayerdEvents algorithms
            </span>
            <Link
              href="/projects"
              className="text-white hover:underline flex items-center gap-1 font-medium pl-1"
            >
              Learn More <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-zinc-600 font-bold">•</span>
            <span className="bg-zinc-800 text-zinc-200 text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold uppercase tracking-wider">
              FOCUS
            </span>
            <span className="text-zinc-200">
              Currently working on ScheduleSomething and LayerdEvents algorithms
            </span>
            <Link
              href="/projects"
              className="text-white hover:underline flex items-center gap-1 font-medium pl-1"
            >
              Learn More <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-zinc-600 font-bold">•</span>
            <span className="bg-zinc-800 text-zinc-200 text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold uppercase tracking-wider">
              FOCUS
            </span>
            <span className="text-zinc-200">
              Currently working on ScheduleSomething and LayerdEvents algorithms
            </span>
            <Link
              href="/projects"
              className="text-white hover:underline flex items-center gap-1 font-medium pl-1"
            >
              Learn More <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 bg-white px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-sm font-medium ${
                isActive(item.href) ? 'text-navy-900 font-semibold' : 'text-zinc-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-zinc-100 flex items-center gap-4">
            <a
              href="https://github.com/omghante"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-medium text-zinc-600"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href="/omghante.pdf"
              download="Om_Ghante_Resume.pdf"
              className="flex items-center gap-1.5 text-xs font-medium text-navy-900"
            >
              <FileText className="h-3.5 w-3.5" /> Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
