'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, FileText, Github, ChevronDown, X, Search, Layers, ListFilter } from 'lucide-react';

export interface DocItem {
  slug: string;
  title: string;
  category?: string;
  description?: string;
}

interface DocsSidebarProps {
  project: string;
  currentSlug: string;
  allProjectDocs: DocItem[];
  currentDocTitle?: string;
  currentCategory?: string;
  repoUrl?: string;
}

export default function DocsSidebar({
  project,
  currentSlug,
  allProjectDocs,
  currentDocTitle,
  currentCategory,
  repoUrl,
}: DocsSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Close mobile drawer when pressing ESC or clicking backdrop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Group docs by category
  const categoriesMap = useMemo(() => {
    const map: Record<string, DocItem[]> = {};
    allProjectDocs.forEach((item) => {
      const cat = item.category || 'Documentation';
      if (!map[cat]) map[cat] = [];
      
      // Filter by search query if present
      if (
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        map[cat].push(item);
      }
    });

    // Remove empty categories if searching
    if (searchQuery.trim()) {
      Object.keys(map).forEach((cat) => {
        if (map[cat].length === 0) delete map[cat];
      });
    }

    return map;
  }, [allProjectDocs, searchQuery]);

  const formattedProjectName = project.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const activeItem = allProjectDocs.find((d) => d.slug === currentSlug);
  const displayTitle = currentDocTitle || activeItem?.title || 'Documentation';
  const displayCategory = currentCategory || activeItem?.category || 'Specs';

  const navContent = (
    <div className="flex flex-col h-full space-y-4">
      {/* HEADER SPECS INFO */}
      <div className="space-y-2 pb-3 border-b border-zinc-200 shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-navy-900 flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-navy-900" />
            {formattedProjectName}
          </h3>
          <span className="text-[10px] font-mono bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full font-semibold">
            {allProjectDocs.length} pages
          </span>
        </div>
        <p className="text-[11px] text-zinc-500 font-mono">
          Live GitHub Synced Specs
        </p>
      </div>

      {/* SEARCH FILTER BOX */}
      {allProjectDocs.length > 5 && (
        <div className="relative shrink-0">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-navy-900 focus:bg-white transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-2 text-[10px] font-mono text-zinc-400 hover:text-zinc-700 bg-zinc-200/60 rounded-full px-1.5 py-0.5"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* CATEGORY & DOC LINKS (SINGLE SCROLLABLE CONTAINER) */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar space-y-5 text-xs pr-1">
        {Object.keys(categoriesMap).length === 0 ? (
          <div className="py-6 text-center text-xs text-zinc-400 font-mono">
            No matching docs found for &quot;{searchQuery}&quot;
          </div>
        ) : (
          Object.entries(categoriesMap).map(([categoryName, items]) => (
            <div key={categoryName} className="space-y-1.5">
              <h4 className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider px-2 flex items-center justify-between">
                <span>{categoryName}</span>
                <span className="text-[9px] text-zinc-400 font-normal">({items.length})</span>
              </h4>
              <div className="space-y-0.5">
                {items.map((item) => {
                  const active = item.slug === currentSlug;
                  return (
                    <Link
                      key={item.slug}
                      href={`/docs/${project}/${item.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-md font-medium transition-all text-[12px] leading-snug ${
                        active
                          ? 'bg-navy-900 text-white font-semibold shadow-xs ring-1 ring-navy-950'
                          : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/90'
                      }`}
                    >
                      <FileText className={`h-3.5 w-3.5 shrink-0 ${active ? 'text-white' : 'text-zinc-400'}`} />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </nav>

      {/* REPOSITORY SOURCE LINK */}
      {repoUrl && (
        <div className="pt-3 border-t border-zinc-200 shrink-0">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-950 font-mono transition-colors"
          >
            <Github className="h-3.5 w-3.5" /> Repository Source
          </a>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* MOBILE / TABLET TOP BAR TOGGLE (Visible on < md screens) */}
      <div className="md:hidden sticky top-[57px] z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 rounded bg-navy-900/10 p-1 text-navy-900">
              <Layers className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider truncate">
                {formattedProjectName} • {displayCategory}
              </div>
              <div className="text-xs font-bold text-zinc-900 truncate">
                {displayTitle}
              </div>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-navy-950 transition-colors"
            aria-label="Toggle Documentation Menu"
          >
            <ListFilter className="h-3.5 w-3.5" />
            <span>Docs Navigation</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER OVERLAY & MODAL (< md screens) */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-zinc-950/60 backdrop-blur-xs transition-opacity">
          {/* Backdrop click to dismiss */}
          <div className="absolute inset-0" onClick={() => setMobileOpen(false)} />

          {/* Drawer Container */}
          <div className="relative z-10 w-full max-h-[85vh] rounded-t-2xl border-t border-zinc-200 bg-white p-6 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-navy-900" />
                <span className="font-bold text-sm text-zinc-950">
                  {formattedProjectName} Documentation
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              {navContent}
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR (Visible on >= md screens) */}
      <aside className="hidden md:flex md:flex-col md:col-span-1 lg:col-span-1 border-r border-zinc-200 pr-4 max-h-[calc(100vh-120px)] sticky top-24 overflow-hidden">
        {navContent}
      </aside>
    </>
  );
}

