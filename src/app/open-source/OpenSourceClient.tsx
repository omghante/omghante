'use client';

import React, { useState } from 'react';
import { GitHubContribution } from '@/types';
import { GitMerge, ExternalLink, TrendingUp, Table, GitPullRequestClosed, ChevronDown } from 'lucide-react';

interface Props {
  initialPullRequests: GitHubContribution[];
}

export default function OpenSourceClient({ initialPullRequests }: Props) {
  const [repoFilter, setRepoFilter] = useState<'all' | 'minimax' | 'node' | 'electron'>('all');

  const filteredPRs = initialPullRequests.filter((pr) => {
    if (repoFilter === 'all') return true;
    if (repoFilter === 'minimax') return pr.repo.toLowerCase().includes('minimax');
    if (repoFilter === 'node') return pr.repo.includes('node');
    if (repoFilter === 'electron') return pr.repo.includes('electron');
    return true;
  });

  const minimaxCount = initialPullRequests.filter((pr) => pr.repo.toLowerCase().includes('minimax')).length;
  const nodeMergedCount = initialPullRequests.filter((pr) => pr.repo.includes('node')).length;
  const electronMergedCount = initialPullRequests.filter((pr) => pr.repo.includes('electron')).length;

  return (
    <div className="space-y-10">
      {/* SECTION 1: NON-OVERLAPPING MULTI-COLOR LINE GRAPH */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100 pb-5">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-zinc-950 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-red-600" /> Upstream Activity Line Graph
            </h2>
            <p className="text-xs text-zinc-500 font-mono">
              X-Axis: Time · Y-Axis: Cumulative Pull Requests (Separated non-overlapping paths)
            </p>
          </div>

          {/* Graph Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-semibold">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#DC2626]"></span>
              <span className="text-zinc-900">MiniMax-AI/cli ({minimaxCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#059669]"></span>
              <span className="text-zinc-900">nodejs/node ({nodeMergedCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#0F172A]"></span>
              <span className="text-zinc-900">electron/electron ({electronMergedCount})</span>
            </div>
          </div>
        </div>

        {/* SVG Multi-Color Line Graph (Non-overlapping) */}
        <div className="w-full overflow-x-auto pt-2">
          <div className="min-w-[600px]">
            <svg viewBox="0 0 650 210" className="w-full h-auto font-mono text-[10px]">
              {/* Background Grid Lines */}
              <line x1="50" y1="30" x2="610" y2="30" stroke="#F4F4F5" strokeWidth="1" strokeDasharray="4" />
              <line x1="50" y1="85" x2="610" y2="85" stroke="#F4F4F5" strokeWidth="1" strokeDasharray="4" />
              <line x1="50" y1="145" x2="610" y2="145" stroke="#E4E4E7" strokeWidth="1.5" />

              {/* Y-Axis Labels */}
              <text x="35" y="34" fill="#52525B" textAnchor="end">2 PRs</text>
              <text x="35" y="89" fill="#52525B" textAnchor="end">1 PR</text>
              <text x="35" y="149" fill="#52525B" textAnchor="end">0 PR</text>

              {/* X-Axis Labels */}
              <text x="70" y="172" fill="#52525B" textAnchor="middle">Apr 2026</text>
              <text x="210" y="172" fill="#52525B" textAnchor="middle">May 2026 (W1)</text>
              <text x="350" y="172" fill="#52525B" textAnchor="middle">May 2026 (W2)</text>
              <text x="520" y="172" fill="#52525B" textAnchor="middle">May 2026 (W3)</text>

              {/* 1. Electron Line (Dark Navy Blue #0F172A) */}
              <polyline
                fill="none"
                stroke="#0F172A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="70,140 210,85 350,35 520,35"
              />
              <circle cx="70" cy="140" r="4.5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="210" cy="85" r="4.5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="350" cy="35" r="4.5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="520" cy="35" r="4.5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* 2. Node.js Line (Green #059669) */}
              <polyline
                fill="none"
                stroke="#059669"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="70,148 210,148 350,95 520,55"
              />
              <circle cx="70" cy="148" r="4.5" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="210" cy="148" r="4.5" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="350" cy="95" r="4.5" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="520" cy="55" r="4.5" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* 3. MiniMax-AI Line (Red #DC2626) - Distinct non-overlapping Y path */}
              <polyline
                fill="none"
                stroke="#DC2626"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="70,144 210,144 350,115 520,115"
              />
              <circle cx="70" cy="144" r="4.5" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="210" cy="144" r="4.5" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="350" cy="115" r="5" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="520" cy="115" r="5" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* SECTION 2: TABULAR VIEW WITH DROPDOWN FILTER */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-3">
          <div className="flex items-center gap-2">
            <Table className="h-4 w-4 text-zinc-900" />
            <h2 className="text-base font-bold text-zinc-950">Upstream Pull Requests Table</h2>
          </div>

          {/* DROPDOWN FILTER */}
          <div className="flex items-center gap-2">
            <label htmlFor="repo-filter-select" className="text-xs font-mono font-semibold text-zinc-500">
              Filter:
            </label>
            <div className="relative inline-block">
              <select
                id="repo-filter-select"
                value={repoFilter}
                onChange={(e) => setRepoFilter(e.target.value as any)}
                className="appearance-none px-3.5 py-2 pr-8 rounded-lg border border-zinc-300 bg-white text-xs font-mono font-bold text-zinc-950 shadow-xs focus:outline-none focus:ring-2 focus:ring-zinc-950 cursor-pointer transition-all"
              >
                <option value="all">All Pull Requests (5 PRs across 3 Repos)</option>
                <option value="minimax">MiniMax-AI/cli ({minimaxCount} PR)</option>
                <option value="node">nodejs/node ({nodeMergedCount} PRs)</option>
                <option value="electron">electron/electron ({electronMergedCount} PRs)</option>
              </select>
              <ChevronDown className="h-3.5 w-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Clean Monochrome Table */}
        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-[11px] font-mono font-semibold uppercase text-zinc-600">
                <th className="py-3 px-4">Repository</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6">Pull Request Details</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">GitHub Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-900">
              {filteredPRs.map((pr) => (
                <tr key={pr.id} className="hover:bg-zinc-50/60 transition-colors">
                  {/* Repository */}
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-zinc-950">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        pr.repo.toLowerCase().includes('minimax')
                          ? 'bg-[#DC2626]'
                          : pr.repo.includes('node')
                          ? 'bg-[#059669]'
                          : 'bg-[#0F172A]'
                      }`}
                    />
                    {pr.repo}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-mono font-medium text-xs text-zinc-950">
                      {pr.state === 'closed' ? (
                        <span className="inline-flex items-center gap-1 text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200 font-semibold">
                          <GitPullRequestClosed className="h-3.5 w-3.5 text-purple-600" /> Closed (Supersedes)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-semibold">
                          <GitMerge className="h-3.5 w-3.5 text-emerald-600" /> Merged
                        </span>
                      )}
                    </span>
                  </td>

                  {/* Pull Request Details */}
                  <td className="py-3.5 px-6 space-y-1">
                    <div className="font-semibold text-zinc-950 text-xs leading-snug">
                      #{pr.id}: {pr.title}
                    </div>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {pr.tags.map((t) => (
                        <span key={t} className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600 border border-zinc-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-zinc-500 text-[11px]">
                    {pr.createdAt}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <a
                      href={pr.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-zinc-950 hover:underline hover:text-red-600 transition-colors"
                    >
                      View PR <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
