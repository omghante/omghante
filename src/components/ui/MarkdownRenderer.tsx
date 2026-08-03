'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import MermaidDiagram from './MermaidDiagram';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

function preprocessMarkdown(content: string): string {
  if (!content) return '';
  // Ensure $$ block math delimiters have newlines before \begin and after \end
  let res = content.replace(/\$\$(\s*\\begin)/g, "$$\n$1");
  res = res.replace(/(\\end\{[^}]+\})\s*\$\$/g, "$1\n$$");
  return res;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const processedContent = preprocessMarkdown(content);

  return (
    <div className={`prose prose-zinc max-w-none text-zinc-800 leading-relaxed ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');
            const isBlock = !inline || codeString.includes('\n');

            if (language === 'mermaid') {
              return <MermaidDiagram chart={codeString} />;
            }

            if (isBlock) {
              return (
                <div className="relative group my-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg">
                  {language && (
                    <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono text-zinc-400">
                      <span>{language}</span>
                    </div>
                  )}
                  <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-zinc-100 bg-zinc-950">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            }

            return (
              <code
                className="bg-zinc-100 text-zinc-900 px-1.5 py-0.5 rounded text-xs font-mono border border-zinc-200"
                {...props}
              >
                {children}
              </code>
            );
          },
          p({ children, ...props }: any) {
            return (
              <p className="my-4 leading-relaxed text-zinc-800" {...props}>
                {children}
              </p>
            );
          },
          pre({ children }: any) {
            // Un-nest pre if custom code wrapper handled it
            return <>{children}</>;
          },
          a({ href, children, ...props }: any) {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="font-medium text-zinc-950 underline underline-offset-4 hover:text-blue-600 transition-colors"
                {...props}
              >
                {children}
              </a>
            );
          },
          table({ children, ...props }: any) {
            return (
              <div className="my-6 overflow-x-auto rounded-lg border border-zinc-200">
                <table className="w-full text-left text-xs sm:text-sm" {...props}>
                  {children}
                </table>
              </div>
            );
          },
          thead({ children, ...props }: any) {
            return (
              <thead className="bg-zinc-100/80 font-semibold text-zinc-950 border-b border-zinc-200" {...props}>
                {children}
              </thead>
            );
          },
          th({ children, ...props }: any) {
            return (
              <th className="px-4 py-3 font-semibold" {...props}>
                {children}
              </th>
            );
          },
          td({ children, ...props }: any) {
            return (
              <td className="px-4 py-3 border-b border-zinc-100 text-zinc-700" {...props}>
                {children}
              </td>
            );
          },
          blockquote({ children, ...props }: any) {
            return (
              <blockquote
                className="my-6 border-l-4 border-zinc-300 pl-4 italic text-zinc-600 bg-zinc-50/50 py-2 rounded-r-lg"
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          h1({ children, ...props }: any) {
            return (
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mt-8 mb-4 border-b border-zinc-200 pb-2" {...props}>
                {children}
              </h1>
            );
          },
          h2({ children, ...props }: any) {
            return (
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 mt-8 mb-4" {...props}>
                {children}
              </h2>
            );
          },
          h3({ children, ...props }: any) {
            return (
              <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 mt-6 mb-3" {...props}>
                {children}
              </h3>
            );
          },
          h4({ children, ...props }: any) {
            return (
              <h4 className="text-base font-semibold text-zinc-900 mt-4 mb-2" {...props}>
                {children}
              </h4>
            );
          },
          ul({ children, ...props }: any) {
            return (
              <ul className="my-4 ml-6 list-disc space-y-1 text-zinc-800" {...props}>
                {children}
              </ul>
            );
          },
          ol({ children, ...props }: any) {
            return (
              <ol className="my-4 ml-6 list-decimal space-y-1 text-zinc-800" {...props}>
                {children}
              </ol>
            );
          },
          li({ children, ...props }: any) {
            return (
              <li className="pl-1" {...props}>
                {children}
              </li>
            );
          },
          hr({ ...props }: any) {
            return <hr className="my-8 border-zinc-200" {...props} />;
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
