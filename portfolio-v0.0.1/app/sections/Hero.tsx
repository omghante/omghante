import Link from "next/link";
import { ArrowDown, FileText } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-surface py-0">
            {/* Background Grid */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(var(--color-ink) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
                }}
            />

            <div className="mx-auto flex w-full max-w-[1120px] flex-col px-6 lg:px-0 z-10">
                <div className="flex flex-col gap-6">
                    <h1 className="font-display text-5xl font-bold tracking-tight text-ink sm:text-7xl lg:text-8xl">
                        <span className="block text-accent">Om Ghante</span>
                    </h1>

                    <h2 className="max-w-2xl font-display text-2xl font-semibold leading-tight text-ink-muted sm:text-3xl md:text-4xl">
                        Full Stack Developer building intelligent systems at <span className="text-ink">Prismas</span> & <span className="text-ink">CurlShell</span>
                    </h2>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="#projects"
                            className="inline-flex h-12 items-center justify-center rounded-none bg-accent px-8 font-medium text-white transition-transform active:scale-95"
                        >
                            Scroll to Projects
                            <ArrowDown className="ml-2 h-4 w-4" />
                        </Link>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center justify-center rounded-none border border-ink bg-transparent px-8 font-medium text-ink transition-colors hover:bg-ink hover:text-surface-raised active:scale-95"
                        >
                            Download CV
                            <FileText className="ml-2 h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Credibility Strip */}
            <div className="absolute bottom-12 left-0 w-full border-t border-border/40 py-6">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-0">
                    <p className="font-mono text-xs uppercase tracking-widest text-ink-subtle">
                        Currently building: <span className="font-bold text-ink-muted">ERP, CRM & HRMS</span> for early-stage startups at <a href="https://prismas.in" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">prismas.in</a>
                    </p>
                </div>
            </div>
        </section>
    );
}
