'use client';

import React, { useState } from 'react';
import { GitHubContribution } from '@/types';
import { GitMerge, ExternalLink, TrendingUp, Table } from 'lucide-react';

interface Props {
  initialPullRequests: GitHubContribution[];
}

export default function OpenSourceClient({ initialPullRequests }: Props) {
  const [repoFilter, setRepoFilter] = useState<'all' | 'node' | 'electron'>('all');

  const filteredPRs = initialPullRequests.filter((pr) => {
    if (repoFilter === 'all') return true;
    if (repoFilter === 'node') return pr.repo.includes('node');
    if (repoFilter === 'electron') return pr.repo.includes('electron');
    return true;
  });

  const nodeMergedCount = initialPullRequests.filter((pr) => pr.repo.includes('node')).length;
  const electronMergedCount = initialPullRequests.filter((pr) => pr.repo.includes('electron')).length;

  return (
    <div className="space-y-10">
      {/* SECTION 1: BLACK & WHITE LINE GRAPH TIMELINE */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-zinc-950 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-zinc-900" /> Upstream Pull Request Activity Timeline
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5 font-mono">
              X-Axis: Time · Y-Axis: Cumulative Merged PRs
            </p>
          </div>

          {/* Graph Legend - Black & White / Green & Navy */}
          <div className="flex items-center gap-4 text-xs font-mono font-semibold">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-600"></span>
              <span className="text-zinc-900">nodejs/node ({nodeMergedCount} Merged)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-navy-900"></span>
              <span className="text-zinc-900">electron/electron ({electronMergedCount} Merged)</span>
            </div>
          </div>
        </div>

        {/* SVG Custom Line Graph */}
        <div className="w-full overflow-x-auto pt-2">
          <div className="min-w-[550px]">
            <svg viewBox="0 0 600 200" className="w-full h-auto font-mono text-[10px]">
              {/* Background Grid Lines */}
              <line x1="50" y1="30" x2="560" y2="30" stroke="#F4F4F5" strokeWidth="1" strokeDasharray="4" />
              <line x1="50" y1="90" x2="560" y2="90" stroke="#F4F4F5" strokeWidth="1" strokeDasharray="4" />
              <line x1="50" y1="150" x2="560" y2="150" stroke="#E4E4E7" strokeWidth="1.5" />

              {/* Y-Axis Labels */}
              <text x="35" y="34" fill="#52525B" textAnchor="end">2 PRs</text>
              <text x="35" y="94" fill="#52525B" textAnchor="end">1 PR</text>
              <text x="35" y="154" fill="#52525B" textAnchor="end">0 PR</text>

              {/* X-Axis Labels */}
              <text x="70" y="172" fill="#52525B" textAnchor="middle">Jan 2026</text>
              <text x="210" y="172" fill="#52525B" textAnchor="middle">Feb 2026 (W1)</text>
              <text x="350" y="172" fill="#52525B" textAnchor="middle">Feb 2026 (W3)</text>
              <text x="520" y="172" fill="#52525B" textAnchor="middle">Mar 2026</text>

              {/* Electron Line (Dark Navy #0F172A) */}
              <polyline
                fill="none"
                stroke="#0F172A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="70,150 210,90 350,30 520,30"
              />
              <circle cx="70" cy="150" r="4.5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="210" cy="90" r="4.5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="350" cy="30" r="4.5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="520" cy="30" r="4.5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Node.js Line (Green #059669) */}
              <polyline
                fill="none"
                stroke="#059669"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="70,150 210,150 350,90 520,30"
              />
              <circle cx="70" cy="150" r="4.5" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="210" cy="150" r="4.5" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="350" cy="90" r="4.5" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="520" cy="30" r="4.5" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* SECTION 2: PURE BLACK & WHITE TABULAR VIEW (NO CARD CARDS) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-3">
          <div className="flex items-center gap-2">
            <Table className="h-4 w-4 text-zinc-900" />
            <h2 className="text-base font-bold text-zinc-950">Upstream Pull Requests Table</h2>
          </div>

          {/* Simple Minimal Filter Tabs */}
          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-md border border-zinc-200">
            <button
              onClick={() => setRepoFilter('all')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                repoFilter === 'all'
                  ? 'bg-zinc-950 text-white'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
              }`}
            >
              All Merged (4)
            </button>
            <button
              onClick={() => setRepoFilter('node')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                repoFilter === 'node'
                  ? 'bg-zinc-950 text-white'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
              }`}
            >
              nodejs/node ({nodeMergedCount})
            </button>
            <button
              onClick={() => setRepoFilter('electron')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                repoFilter === 'electron'
                  ? 'bg-zinc-950 text-white'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
              }`}
            >
              electron/electron ({electronMergedCount})
            </button>
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
                <th className="py-3 px-4">Merged Date</th>
                <th className="py-3 px-4 text-right">GitHub Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-900">
              {filteredPRs.map((pr) => (
                <tr key={pr.id} className="hover:bg-zinc-50/60 transition-colors">
                  {/* Repository */}
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-zinc-950">
                    {pr.repo}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-mono font-medium text-xs text-zinc-950">
                      <GitMerge className="h-3.5 w-3.5 text-zinc-950" /> Merged
                    </span>
                  </td>

                  {/* Pull Request Details */}
                  <td className="py-3.5 px-6 space-y-1">
                    <div className="font-semibold text-zinc-950 text-xs leading-snug">{pr.title}</div>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {pr.tags.map((t) => (
                        <span key={t} className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600 border border-zinc-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Merged Date */}
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-zinc-500 text-[11px]">
                    {pr.createdAt}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <a
                      href={pr.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-zinc-950 hover:underline"
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
