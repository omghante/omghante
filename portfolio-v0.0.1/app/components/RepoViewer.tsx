"use client";

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Folder, FileText, ChevronRight, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import MermaidDiagram from './MermaidDiagram';

interface RepoViewerProps {
    owner: string;
    repo: string;
    initialPath?: string;
}

interface FileItem {
    name: string;
    path: string;
    type: 'file' | 'dir';
    url: string;
    download_url: string | null;
}

export default function RepoViewer({ owner, repo, initialPath = '' }: RepoViewerProps) {
    const [currentPath, setCurrentPath] = useState(initialPath);
    const [items, setItems] = useState<FileItem[]>([]);
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewingFile, setViewingFile] = useState(false);

    useEffect(() => {
        fetchPath(currentPath);
    }, [currentPath]);

    async function fetchPath(path: string) {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);

            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.statusText}`);
            }

            const data = await res.json();

            if (Array.isArray(data)) {
                // It's a directory
                const filteredItems = data.filter((item: FileItem) => item.type === 'dir' || item.name.endsWith('.md'));
                setItems(filteredItems.sort((a: any, b: any) => (a.type === b.type ? 0 : a.type === 'dir' ? -1 : 1)));
                setViewingFile(false);
                setFileContent(null);
            } else if (data.type === 'file') {
                // It's a file
                const contentRes = await fetch(data.download_url);
                const text = await contentRes.text();
                setFileContent(text);
                setViewingFile(true);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleNavigate(item: FileItem) {
        if (item.type === 'dir') {
            setCurrentPath(item.path);
        } else {
            // Instead of changing path immediately, just fetch content? 
            // Better to change path so it's consistent
            setCurrentPath(item.path);
        }
    }

    function handleGoBack() {
        if (currentPath === initialPath) return; // Can't go back further
        const parts = currentPath.split('/');
        parts.pop();
        setCurrentPath(parts.join('/'));
    }

    return (
        <div className="w-full max-w-[1120px] mx-auto border border-border rounded-lg overflow-hidden bg-surface-raised shadow-sm">
            {/* Header / Breadcrumbs */}
            <div className="bg-surface border-b border-border p-4 flex items-center gap-4">
                <button
                    onClick={handleGoBack}
                    disabled={currentPath === initialPath}
                    className="p-2 hover:bg-border/50 rounded-full disabled:opacity-30 transition-colors"
                >
                    <ArrowLeft size={18} />
                </button>
                <div className="font-mono text-sm text-ink-muted flex items-center flex-wrap">
                    <span className="font-bold text-ink">{repo}</span>
                    <span className="mx-2">/</span>
                    {currentPath.split('/').map((part, i, arr) => (
                        part ? (
                            <div key={i} className="flex items-center">
                                <span>{part}</span>
                                {i < arr.length - 1 && <ChevronRight size={14} className="mx-1 text-ink-subtle" />}
                            </div>
                        ) : null
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="min-h-[400px] p-0">
                {loading ? (
                    <div className="flex h-[400px] w-full items-center justify-center">
                        <Loader2 className="animate-spin text-accent" size={32} />
                    </div>
                ) : error ? (
                    <div className="flex h-[400px] w-full flex-col items-center justify-center gap-4 text-red-500">
                        <AlertCircle size={32} />
                        <p>{error}</p>
                        <button onClick={() => fetchPath(currentPath)} className="text-sm underline hover:text-red-600">Retry</button>
                    </div>
                ) : viewingFile ? (
                    <div className="prose prose-sm md:prose-base max-w-none p-8 dark:prose-invert">
                        {currentPath.endsWith('.md') ? (
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({ node, inline, className, children, ...props }: any) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        const codeString = String(children).replace(/\n$/, '');

                                        // Render Mermaid diagrams
                                        if (!inline && match && match[1] === 'mermaid') {
                                            return <MermaidDiagram chart={codeString} />;
                                        }

                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={vscDarkPlus}
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            >
                                                {codeString}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >
                                {fileContent || ''}
                            </ReactMarkdown>
                        ) : (
                            <pre className="bg-ink text-surface p-4 rounded-md overflow-x-auto text-sm font-mono">
                                {fileContent}
                            </pre>
                        )}
                    </div>
                ) : (
                    <ul className="divide-y divide-border">
                        {items.map((item) => (
                            <li key={item.path}>
                                <button
                                    onClick={() => handleNavigate(item)}
                                    className="w-full flex items-center gap-3 p-4 hover:bg-surface transition-colors text-left"
                                >
                                    {item.type === 'dir' ? (
                                        <Folder className="text-blue-500 fill-blue-500/20" size={20} />
                                    ) : (
                                        <FileText className="text-ink-muted" size={20} />
                                    )}
                                    <span className="flex-1 font-medium text-ink">{item.name}</span>
                                    <ChevronRight className="text-ink-subtle" size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
