import Link from "next/link";

export default function Nav() {
    return (
        <>
            <a
                href="#main-content"
                className="fixed top-4 left-4 z-[100] -translate-y-[200%] bg-accent text-white px-6 py-3 font-medium transition-transform focus:translate-y-0"
            >
                Skip to content
            </a>
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-surface/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6 lg:px-0">
                    <Link href="/" className="group relative flex items-center justify-center" aria-label="Home">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-raised transition-colors group-hover:border-accent/50">
                            <span className="font-display text-xl font-bold tracking-tighter text-accent">OG</span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-muted">
                        <Link href="/projects" className="hover:text-ink transition-colors">
                            Projects
                        </Link>
                        <Link href="/blogs" className="hover:text-ink transition-colors">
                            Blogs
                        </Link>
                        <Link href="/#about" className="hover:text-ink transition-colors">
                            About
                        </Link>
                        <Link href="/#contact" className="hover:text-ink transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Mobile Menu Button could go here, but keeping it minimal for now as requested */}
                </div>
            </header>
        </>
    );
}
