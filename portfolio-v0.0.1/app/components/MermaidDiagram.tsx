"use client";

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid with a dark theme that matches the portfolio aesthetic
mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
        primaryColor: '#6366f1',
        primaryTextColor: '#e2e8f0',
        primaryBorderColor: '#818cf8',
        lineColor: '#94a3b8',
        secondaryColor: '#1e293b',
        tertiaryColor: '#0f172a',
        background: '#0f172a',
        mainBkg: '#1e293b',
        nodeBorder: '#6366f1',
        clusterBkg: '#1e293b',
        titleColor: '#e2e8f0',
        edgeLabelBackground: '#1e293b',
        noteTextColor: '#e2e8f0',
        noteBkgColor: '#1e293b',
        noteBorderColor: '#6366f1',
    },
    securityLevel: 'loose',
    fontFamily: 'Inter, system-ui, sans-serif',
});

let mermaidCounter = 0;

interface MermaidDiagramProps {
    chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!chart.trim()) return;

            setIsLoading(true);
            setError(null);

            try {
                const id = `mermaid-diagram-${Date.now()}-${mermaidCounter++}`;
                const { svg: renderedSvg } = await mermaid.render(id, chart.trim());
                setSvg(renderedSvg);
            } catch (err: any) {
                console.error('Mermaid rendering error:', err);
                setError(err.message || 'Failed to render diagram');
            } finally {
                setIsLoading(false);
            }
        };

        renderDiagram();
    }, [chart]);

    if (isLoading) {
        return (
            <div className="my-6 flex items-center justify-center rounded-xl border border-border bg-[#0f172a] p-12">
                <div className="flex items-center gap-3 text-ink-muted">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="text-sm font-medium">Rendering diagram...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-6 rounded-xl border border-red-500/30 bg-red-950/20 p-6">
                <div className="mb-3 flex items-center gap-2 text-red-400">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold">Diagram rendering failed</span>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-[#0f172a] p-4 font-mono text-xs text-slate-400">
                    {chart}
                </pre>
            </div>
        );
    }

    return (
        <div className="mermaid-container my-6 overflow-x-auto rounded-xl border border-border bg-[#0f172a] p-6 shadow-lg">
            <div
                ref={containerRef}
                className="flex items-center justify-center [&_svg]:max-w-full"
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </div>
    );
}
