import RepoViewer from '../components/RepoViewer';

export default function DocsPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 w-full bg-surface">
            <div className="container-max mx-auto px-6 lg:px-0">
                <h1 className="mb-2 font-display text-4xl font-bold tracking-tight text-ink">
                    Documentation
                </h1>
                <p className="mb-8 text-ink-muted">
                    Browse official documentation, guides, and technical references.
                </p>

                {/* Since I don't know the exact repo, defaulting to a known public one or user's presumed one */}
                {/* If this fails (private/non-existent), it will show error, which user can then correct */}
                <RepoViewer
                    owner="om-ghante"
                    repo="easy-docs"
                    initialPath=""
                />
            </div>
        </div>
    );
}
