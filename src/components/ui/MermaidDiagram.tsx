'use client';

import React, { useEffect, useRef, useState, useId } from 'react';

interface MermaidDiagramProps {
  chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const diagramId = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function renderDiagram() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          securityLevel: 'loose',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        });

        // Clean chart string
        const cleanChart = chart.trim();
        if (!cleanChart) return;

        const { svg } = await mermaid.render(diagramId, cleanChart);
        if (isMounted) {
          setSvgContent(svg);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Mermaid render error:', err);
          setError(err?.message || 'Failed to render diagram');
        }
      }
    }

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart, diagramId]);

  if (error) {
    return (
      <div className="my-6 rounded-xl border border-red-200 bg-red-50/50 p-4 text-xs font-mono text-red-700">
        <p className="font-semibold mb-1">Mermaid Diagram Error</p>
        <pre className="whitespace-pre-wrap">{error}</pre>
        <div className="mt-3 pt-3 border-t border-red-200/60 text-zinc-600">
          <p className="font-sans font-medium mb-1">Raw Diagram Source:</p>
          <pre className="bg-white/80 p-2 rounded border border-red-100 overflow-x-auto text-[11px]">
            {chart}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 flex flex-col items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50/80 p-6 overflow-x-auto shadow-sm">
      {svgContent ? (
        <div
          ref={containerRef}
          className="w-full flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono py-4">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600" />
          Rendering diagram...
        </div>
      )}
    </div>
  );
}
