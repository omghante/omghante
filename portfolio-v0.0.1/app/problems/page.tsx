import RepoViewer from '../components/RepoViewer';

export default function ProblemsPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 w-full bg-surface">
            <div className="container-max mx-auto px-6 lg:px-0">
                <h1 className="mb-2 font-display text-4xl font-bold tracking-tight text-ink">
                    Problem Solving
                </h1>
                <p className="mb-8 text-ink-muted">
                    A collection of leetcode solutions, algorithm implementations, and coding challenges.
                </p>

                <RepoViewer
                    owner="om-ghante"
                    repo="easy-problems"
                    initialPath=""
                />
            </div>
        </div>
    );
}
