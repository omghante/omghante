import RepoViewer from '../components/RepoViewer';

export default function BlogsPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 w-full bg-surface">
            <div className="container-max mx-auto px-6 lg:px-0">
                <h1 className="mb-2 font-display text-4xl font-bold tracking-tight text-ink">
                    Technical Writings
                </h1>
                <p className="mb-8 text-ink-muted">
                    Thoughts on engineering, systems design, and the future of AI.
                </p>

                {/* Placeholder: Pointing to a potential blogs repo or defaulting to easy-docs if that's the intention */}
                <RepoViewer
                    owner="om-ghante"
                    repo="easy-blogs"
                    initialPath=""
                />
            </div>
        </div>
    );
}
