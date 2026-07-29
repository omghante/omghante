import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-white py-12 text-zinc-600">
      <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Identity & Copyright */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-zinc-950 font-semibold tracking-tight text-sm">
            <Code2 className="h-4 w-4 text-navy-900" />
            Om Ghante
          </div>
          <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
            Software Engineer building scalable distributed backend systems, enterprise software, and developer tools.
          </p>
          <p className="text-xs text-zinc-400 font-mono">
            © {new Date().getFullYear()} Om Ghante. All rights reserved.
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/projects" className="hover:text-zinc-950 transition-colors">Projects Showcase</Link></li>
            <li><Link href="/blogs" className="hover:text-zinc-950 transition-colors">GitHub Engineering Blogs</Link></li>
            <li><Link href="/docs" className="hover:text-zinc-950 transition-colors">GitHub Documentation</Link></li>
            <li><Link href="/about" className="hover:text-zinc-950 transition-colors">About & Experience</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider">
            Connect
          </h4>
          <div className="flex flex-col space-y-2 text-xs">
            <a
              href="https://github.com/omghante"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-zinc-950 transition-colors"
            >
              <Github className="h-3.5 w-3.5" /> github.com/omghante
            </a>
            <a
              href="https://www.linkedin.com/in/om-ghante/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-zinc-950 transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5" /> linkedin.com/in/om-ghante
            </a>
            <a
              href="https://x.com/OmGhante"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-zinc-950 transition-colors"
            >
              <Twitter className="h-3.5 w-3.5" /> x.com/OmGhante
            </a>
            <a
              href="mailto:mr.omghante1@gmail.com"
              className="flex items-center gap-2 hover:text-zinc-950 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" /> mr.omghante1@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
