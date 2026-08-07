'use client';

import React, { useState, useEffect } from 'react';
import { reecallBenchmarks, BenchmarkMetric } from '@/lib/reecall-benchmarks';
import { CheckCircle2, Cpu, Zap, Activity, Layers, ExternalLink, RefreshCw, BarChart2 } from 'lucide-react';

type TabType = 'benchmark' | 'architecture' | 'stability';
type MetricView = 'retrieval' | 'link';

export default function ReecallBenchmark() {
  const [activeTab, setActiveTab] = useState<TabType>('benchmark');
  const [metricView, setMetricView] = useState<MetricView>('retrieval');
  const [animKey, setAnimKey] = useState(0);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number | null>(null);

  // Trigger re-animation on tab or view change
  useEffect(() => {
    setAnimKey((prev) => prev + 1);
  }, [activeTab, metricView]);

  const metrics: BenchmarkMetric[] =
    metricView === 'retrieval'
      ? reecallBenchmarks.anchorRetrieval
      : reecallBenchmarks.linkPrediction;

  return (
    <div className="w-full space-y-8 py-4">
      {/* SECTION HEADER & TAB PILLS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-900/10 px-3 py-1 text-xs font-mono font-medium text-navy-950">
              <Zap className="h-3.5 w-3.5 text-navy-900" /> Model Benchmarks
            </span>
            <span className="text-xs font-mono text-zinc-500">v1.0 (50K Params)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
            Performance Benchmark & Architecture
          </h2>
          <p className="text-sm text-zinc-600 max-w-xl leading-relaxed">
            Quantitative evaluation on AST repository graphs. PyTorch GNN co-import prediction contrastive learning performance.
          </p>
        </div>

        {/* PILL TABS (MINIMAX M3 STYLE) */}
        <div className="inline-flex p-1 bg-zinc-100/90 backdrop-blur-xs rounded-full border border-zinc-200/80 shadow-2xs self-start md:self-auto items-center">
          <button
            onClick={() => setActiveTab('benchmark')}
            className={`whitespace-nowrap flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              activeTab === 'benchmark'
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
            }`}
          >
            <BarChart2 className="h-3.5 w-3.5" />
            Benchmark
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`whitespace-nowrap flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              activeTab === 'architecture'
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            Architecture
          </button>

          <button
            onClick={() => setActiveTab('stability')}
            className={`whitespace-nowrap flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              activeTab === 'stability'
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            Training Dynamics
          </button>
        </div>
      </div>


      {/* MAIN BENCHMARK CARD (2-COLUMN LAYOUT LIKE MINIMAX M3) */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* TAB 1: BENCHMARK */}
        {activeTab === 'benchmark' && (
          <div key={`tab-bench-${animKey}`} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-tab-fade">
            {/* LEFT COLUMN: DESCRIPTION & BULLETS */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-navy-900 font-semibold">
                  EVALUATION METRICS
                </span>
                <h3 className="text-xl font-bold text-zinc-950">
                  Anchor Retrieval & Link Prediction
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  ReeCall.ai evaluates graph embeddings using two rigid evaluation protocols on TypeScript repositories: anchor-based contextual search and import link prediction.
                </p>
              </div>

              {/* CHECKLIST */}
              <div className="space-y-3 pt-2">
                {reecallBenchmarks.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-zinc-900 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-zinc-900 block">{item.title}</span>
                      <span className="text-zinc-600 leading-normal text-[11px]">{item.description}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* MODEL QUICK STATS BADGES */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-100 text-xs">
                <div className="rounded-lg bg-zinc-50 p-3 border border-zinc-100">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Model Dim</span>
                  <span className="text-lg font-bold text-navy-900 font-mono">128 → 32</span>
                  <span className="text-[10px] text-zinc-600 block mt-0.5">L2-normalized cosine space</span>
                </div>
                <div className="rounded-lg bg-zinc-50 p-3 border border-zinc-100">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">CPU Latency</span>
                  <span className="text-lg font-bold text-navy-900 font-mono">&lt; 8.4 ms</span>
                  <span className="text-[10px] text-zinc-600 block mt-0.5">Single-thread CPU inference</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE ANIMATED BAR CHART */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 rounded-xl bg-zinc-50/70 p-6 border border-zinc-200/80">
              {/* METRIC TOGGLE HEADER */}
              <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                    {metricView === 'retrieval' ? 'Anchor-Based Query Retrieval' : 'Link Prediction (Import Edges)'}
                    <button
                      onClick={() => setAnimKey((prev) => prev + 1)}
                      title="Replay sequence animation"
                      className="p-1 rounded-md text-zinc-400 hover:text-navy-900 hover:bg-zinc-200/60 transition-colors"
                    >
                      <RefreshCw className="h-3 w-3" />
                    </button>
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    {metricView === 'retrieval'
                      ? 'ReeCall.ai vs. Random Baseline (higher is better)'
                      : 'Import link proximity in vector space (higher is better)'}
                  </p>
                </div>

                <div className="inline-flex rounded-lg bg-zinc-200/70 p-0.5 text-[11px] font-medium">
                  <button
                    onClick={() => setMetricView('retrieval')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      metricView === 'retrieval'
                        ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    Retrieval
                  </button>
                  <button
                    onClick={() => setMetricView('link')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      metricView === 'link'
                        ? 'bg-white text-zinc-950 shadow-xs font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    Link Prediction
                  </button>
                </div>
              </div>

              {/* LEGEND */}
              <div className="flex items-center justify-end gap-6 text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-xs bg-navy-900 inline-block shadow-xs" />
                  <span className="font-semibold text-zinc-900">ReeCall.ai v1</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-xs bg-zinc-300 inline-block" />
                  <span className="text-zinc-500">Random Baseline</span>
                </div>
              </div>

              {/* BAR CHART GRAPH AREA */}
              <div className="grid grid-cols-5 gap-2 sm:gap-4 items-end h-56 pt-6 pb-2 border-b border-zinc-200/80 relative">
                {metrics.map((item, idx) => {
                  let valHeightPercent = item.reecall * 100;
                  let randHeightPercent = item.random * 100;

                  if (item.format === 'rank') {
                    valHeightPercent = ((250 - item.reecall) / 250) * 100;
                    randHeightPercent = ((250 - item.random) / 250) * 100;
                  }

                  const groupDelay = idx * 220; // 220ms sequential stagger per metric

                  return (
                    <div key={idx} className="flex flex-col items-center justify-end h-full group relative">
                      {/* TOOLTIP ON HOVER */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] rounded-md px-2 py-1 pointer-events-none z-10 whitespace-nowrap shadow-md">
                        {item.description}
                      </div>

                      {/* BARS CONTAINER */}
                      <div className="flex items-end gap-1.5 w-full max-w-[64px] h-full justify-center">
                        {/* REECALL BAR */}
                        <div className="flex-1 flex flex-col items-center justify-end h-full">
                          <span
                            className="text-[10px] font-mono font-bold text-navy-900 mb-1 animate-tab-fade"
                            style={{ animationDelay: `${groupDelay + 200}ms` }}
                          >
                            {item.format === 'percentage'
                              ? `${(item.reecall * 100).toFixed(1)}%`
                              : item.format === 'rank'
                              ? `${item.reecall}`
                              : item.reecall}
                          </span>
                          <div
                            className="w-full bg-navy-900 rounded-t-sm shadow-xs animate-bar-grow"
                            style={{
                              height: `${Math.max(valHeightPercent, 8)}%`,
                              animationDelay: `${groupDelay}ms`,
                            }}
                          />
                        </div>

                        {/* BASELINE BAR */}
                        <div className="flex-1 flex flex-col items-center justify-end h-full">
                          <span
                            className="text-[9px] font-mono text-zinc-400 mb-1 animate-tab-fade"
                            style={{ animationDelay: `${groupDelay + 300}ms` }}
                          >
                            {item.format === 'percentage'
                              ? `${(item.random * 100).toFixed(1)}%`
                              : item.format === 'rank'
                              ? `${item.random}`
                              : item.random}
                          </span>
                          <div
                            className="w-full bg-zinc-300 rounded-t-sm animate-bar-grow"
                            style={{
                              height: `${Math.max(randHeightPercent, 6)}%`,
                              animationDelay: `${groupDelay + 100}ms`,
                            }}
                          />
                        </div>
                      </div>

                      {/* X-AXIS METRIC LABEL */}
                      <span
                        className="text-[11px] font-mono font-medium text-zinc-700 mt-3 text-center truncate w-full animate-tab-fade"
                        style={{ animationDelay: `${groupDelay}ms` }}
                      >
                        {item.label}
                      </span>

                    </div>
                  );
                })}
              </div>


              {/* FOOTER NOTE */}
              <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-1">
                <span>Evaluated on TS codebases (N=500+ files)</span>
                <span>Margin = 0.5 (Contrastive Loss)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div key={`tab-arch-${animKey}`} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-tab-fade">
            {/* LEFT COLUMN: ARCHITECTURE DESCRIPTION */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-navy-900 font-semibold">
                  GNN ARCHITECTURE
                </span>
                <h3 className="text-xl font-bold text-zinc-950">
                  MLP + Sparse Graph Neighbor Aggregation
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  ReeCall.ai avoids heavy transformer attention layers, opting for a 1-hop sparse graph aggregation network with L2-normalized projection.
                </p>
              </div>

              {/* ARCHITECTURE SUMMARY SPECS */}
              <div className="space-y-2 border-t border-b border-zinc-100 py-4 text-xs">
                <div className="flex justify-between py-1 border-b border-zinc-50">
                  <span className="text-zinc-500">Input Feature Vector</span>
                  <span className="font-mono font-semibold text-zinc-900">128 dimensions</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-50">
                  <span className="text-zinc-500">MLP Hidden Layer</span>
                  <span className="font-mono font-semibold text-zinc-900">Linear(128→64) + ReLU</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-50">
                  <span className="text-zinc-500">Graph Aggregation</span>
                  <span className="font-mono font-semibold text-zinc-900">1-Hop Sparse Neighbor Mean</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-50">
                  <span className="text-zinc-500">Projection Head</span>
                  <span className="font-mono font-semibold text-zinc-900">Linear(128→64→32)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Output Embedding</span>
                  <span className="font-mono font-semibold text-navy-900">32-dim L2 Normalized</span>
                </div>
              </div>

              <div className="rounded-lg bg-navy-900/5 p-4 border border-navy-900/10 text-xs space-y-1">
                <span className="font-bold text-navy-950 block">💡 Why 32 Dimensions?</span>
                <p className="text-zinc-600 leading-relaxed text-[11px]">
                  32 dimensions capture code co-import manifold structures while keeping memory footprint under 128 bytes per file node.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: VISUAL BLOCK DIAGRAM & FEATURE VECTOR MAP */}
            <div className="lg:col-span-7 space-y-6">
              {/* FLOWCHART DIAGRAM (LIGHT MONOCHROME STYLE) */}
              <div className="rounded-xl bg-zinc-50 text-zinc-950 p-6 border border-zinc-200 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                  <span className="text-xs font-mono font-bold text-zinc-900">REE CALL NEURAL MEMORY PIPELINE</span>
                  <span className="text-[10px] font-mono text-zinc-500">PyTorch v2.0+</span>
                </div>

                {/* GRAPH NEURAL PIPELINE FLOW */}
                <div className="space-y-3 text-xs font-mono pt-1">
                  {/* STEP 1 */}
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-zinc-200">
                    <span className="text-white font-bold bg-zinc-950 rounded-md px-2 py-0.5 text-[10px]">IN</span>
                    <div className="flex-1">
                      <span className="font-bold text-zinc-900">128-dim Input Feature Vector</span>
                      <span className="text-[10px] text-zinc-500 block">Structural scalars + Hash buckets + Roles</span>
                    </div>
                  </div>

                  <div className="flex justify-center text-zinc-400">↓</div>

                  {/* STEP 2 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-zinc-200 space-y-1">
                      <span className="text-[10px] text-zinc-900 font-bold uppercase">Branch 1: Self Features</span>
                      <p className="text-[11px] text-zinc-600">MLP Encoder (128→64)</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-zinc-200 space-y-1">
                      <span className="text-[10px] text-zinc-900 font-bold uppercase">Branch 2: Graph Neighbors</span>
                      <p className="text-[11px] text-zinc-600">1-Hop Aggregation (torch.sparse)</p>
                    </div>
                  </div>

                  <div className="flex justify-center text-zinc-400">↓</div>

                  {/* STEP 3 */}
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-zinc-200">
                    <span className="text-zinc-900 font-bold bg-zinc-100 border border-zinc-300 rounded-md px-2 py-0.5 text-[10px]">CAT</span>
                    <div className="flex-1">
                      <span className="font-bold text-zinc-900">Concatenated Representation (128-dim)</span>
                      <span className="text-[10px] text-zinc-500 block">Self representation + Aggregated neighbor representation</span>
                    </div>
                  </div>

                  <div className="flex justify-center text-zinc-400">↓</div>

                  {/* STEP 4 */}
                  <div className="flex items-center gap-3 bg-zinc-950 p-3 rounded-lg border border-zinc-950 text-white">
                    <span className="text-zinc-950 font-bold bg-white rounded-md px-2 py-0.5 text-[10px]">OUT</span>
                    <div className="flex-1">
                      <span className="font-bold text-white">32-dim Embedding Vector</span>
                      <span className="text-[10px] text-zinc-400 block">L2 Normalized for Cosine Similarity Search</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FEATURE VECTOR BREAKDOWN BAR */}
              <div className="rounded-xl bg-zinc-50 p-5 border border-zinc-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider">
                    128-Dimensional Feature Vector Map
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-500">Hover segments</span>
                </div>

                {/* STACKED SEGMENT BAR */}
                <div className="h-6 w-full rounded-md flex overflow-hidden border border-zinc-300/80 shadow-2xs cursor-pointer">
                  {reecallBenchmarks.featureVectorSegments.map((seg, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveFeatureIndex(idx)}
                      onMouseLeave={() => setActiveFeatureIndex(null)}
                      className={`${seg.color} transition-opacity hover:opacity-80 flex items-center justify-center text-[9px] font-mono text-white font-bold truncate`}
                      style={{ width: `${(seg.size / 128) * 100}%` }}
                      title={`${seg.name} ${seg.dims}`}
                    >
                      {seg.size >= 16 ? seg.dims : ''}
                    </div>
                  ))}
                </div>

                {/* DYNAMIC DETAILS BOX FOR FEATURE VECTOR */}
                <div className="rounded-lg bg-white p-3 border border-zinc-200 text-xs min-h-[52px]">
                  {activeFeatureIndex !== null ? (
                    <div className="space-y-0.5 animate-tab-fade">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-zinc-900">
                          {reecallBenchmarks.featureVectorSegments[activeFeatureIndex].name}
                        </span>
                        <span className="font-mono text-[10px] font-semibold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200">
                          {reecallBenchmarks.featureVectorSegments[activeFeatureIndex].dims} (
                          {reecallBenchmarks.featureVectorSegments[activeFeatureIndex].size} dims)
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600">
                        {reecallBenchmarks.featureVectorSegments[activeFeatureIndex].description}
                      </p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-zinc-500 italic">
                      Hover over any colored segment above to inspect feature vector dimensions.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TRAINING STABILITY */}
        {activeTab === 'stability' && (
          <div key={`tab-stab-${animKey}`} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-tab-fade">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-navy-900 font-semibold">
                  TRAINING DYNAMICS
                </span>
                <h3 className="text-xl font-bold text-zinc-950">
                  Contrastive Loss & Pair Distance Separation
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  50-epoch training curve using Contrastive Margin Loss (margin = 0.5). Positive co-import file pairs converge close to 0.0 distance, while negative pairs widen to &gt; 0.95.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="rounded-lg bg-zinc-50 p-3 border border-zinc-200 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-zinc-900">Initial Loss (Epoch 1)</span>
                    <span className="font-mono text-zinc-600">0.485</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-zinc-950">Final Loss (Epoch 50)</span>
                    <span className="font-mono font-bold text-zinc-950">0.027</span>
                  </div>
                </div>

                <div className="rounded-lg bg-zinc-50 p-3 border border-zinc-200 space-y-1 text-xs">
                  <span className="font-bold text-zinc-950 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-zinc-900" /> Positive Pair Convergence
                  </span>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">
                    Average distance of imported file pairs drops from 0.42 to 0.03 in vector space.
                  </p>
                </div>

                <div className="rounded-lg bg-zinc-50 p-3 border border-zinc-200 space-y-1 text-xs">
                  <span className="font-bold text-zinc-950 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-zinc-900" /> Negative Pair Separation
                  </span>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">
                    Average distance of unrelated file pairs expands to 0.99 (reaching max margin bounds).
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SVG LINE GRAPH (WHITE / ZINC BACKGROUND) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 rounded-xl bg-zinc-50 text-zinc-950 p-6 border border-zinc-200 shadow-2xs">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase text-zinc-900">
                    Training Convergence (50 Epochs)
                  </h4>
                  <p className="text-[10px] text-zinc-500">Contrastive Loss vs Pair Distances</p>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-sky-600 font-semibold">
                    <span className="h-2 w-2 rounded-full bg-sky-500 inline-block" /> Loss
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" /> Pos Dist
                  </span>
                  <span className="flex items-center gap-1 text-rose-600 font-semibold">
                    <span className="h-2 w-2 rounded-full bg-rose-500 inline-block" /> Neg Dist
                  </span>
                </div>
              </div>

              {/* SVG GRAPH AREA WITH Y-AXIS LABELS */}
              <div className="h-60 w-full relative pt-4 pb-2 flex gap-2">
                {/* Y-AXIS SCALE LABELS */}
                <div className="flex flex-col justify-between text-[9px] font-mono text-zinc-400 select-none py-1">
                  <span>1.0</span>
                  <span>0.75</span>
                  <span>0.50</span>
                  <span>0.25</span>
                  <span>0.0</span>
                </div>

                {/* SVG CHART CONTAINER */}
                <div className="flex-1 h-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                    {/* GRID LINES */}
                    <line x1="0" y1="20" x2="500" y2="20" stroke="#E4E4E7" strokeDasharray="3 3" strokeWidth="1" />
                    <line x1="0" y1="62.5" x2="500" y2="62.5" stroke="#E4E4E7" strokeDasharray="3 3" strokeWidth="1" />
                    <line x1="0" y1="105" x2="500" y2="105" stroke="#E4E4E7" strokeDasharray="3 3" strokeWidth="1" />
                    <line x1="0" y1="147.5" x2="500" y2="147.5" stroke="#E4E4E7" strokeDasharray="3 3" strokeWidth="1" />
                    <line x1="0" y1="190" x2="500" y2="190" stroke="#D4D4D8" strokeWidth="1.5" />

                    {/* LOSS PATH (BLACK / DARK ZINC) */}
                    <path
                      d={reecallBenchmarks.trainingConvergence.reduce((acc, curr, idx) => {
                        const x = (idx / (reecallBenchmarks.trainingConvergence.length - 1)) * 500;
                        const y = 190 - curr.loss * 170;
                        return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }, '')}
                      fill="none"
                      stroke="#09090B"
                      strokeWidth="3"
                      className="animate-draw-path"
                    />

                    {/* POS DISTANCE PATH (EMERALD GREEN DASHED) */}
                    <path
                      d={reecallBenchmarks.trainingConvergence.reduce((acc, curr, idx) => {
                        const x = (idx / (reecallBenchmarks.trainingConvergence.length - 1)) * 500;
                        const y = 190 - curr.posDist * 170;
                        return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }, '')}
                      fill="none"
                      stroke="#16A34A"
                      strokeWidth="2.5"
                      strokeDasharray="5 3"
                      className="animate-draw-path"
                    />

                    {/* NEG DISTANCE PATH (RED SOLID) */}
                    <path
                      d={reecallBenchmarks.trainingConvergence.reduce((acc, curr, idx) => {
                        const x = (idx / (reecallBenchmarks.trainingConvergence.length - 1)) * 500;
                        const y = 190 - curr.negDist * 170;
                        return `${acc} ${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }, '')}
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="2.5"
                      className="animate-draw-path"
                    />

                    {/* POINT DOTS FOR FINAL EPOCH */}
                    <circle x={500} y={190 - 0.027 * 170} r="4" fill="#09090B" />
                    <circle x={500} y={190 - 0.03 * 170} r="4" fill="#16A34A" />
                    <circle x={500} y={190 - 0.99 * 170} r="4" fill="#DC2626" />
                  </svg>
                </div>
              </div>

              {/* X-AXIS LABELS */}
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-zinc-200 pt-2 pl-7">
                <span>Epoch 1</span>
                <span>Epoch 15</span>
                <span>Epoch 30</span>
                <span>Epoch 50 (Final)</span>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
