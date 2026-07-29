import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import content from "../data/content.json";

export default function Contact() {
    const { contact, hero } = content;
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="w-full border-t border-border bg-surface py-16">
            <div className="container-max mx-auto flex flex-col items-start gap-12 px-6 lg:px-0">
                <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between md:items-start">
                    <div className="flex flex-col gap-4 max-w-lg">
                        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                            {contact.title}
                        </h2>
                        <p className="text-lg text-ink-muted leading-relaxed">
                            {contact.description}
                        </p>
                        <a
                            href={`mailto:${contact.emailText}`}
                            className="mt-2 inline-flex items-center text-lg font-medium text-accent hover:underline"
                        >
                            {contact.emailText}
                        </a>
                    </div>

                    <div className="flex gap-6 mt-8 md:mt-0">
                        <Link
                            href={hero.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink-muted hover:text-ink transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="h-6 w-6" strokeWidth={1.5} />
                        </Link>
                        <Link
                            href={hero.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink-muted hover:text-ink transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-6 w-6" strokeWidth={1.5} />
                        </Link>
                        <Link
                            href={hero.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink-muted hover:text-ink transition-colors"
                            aria-label="Twitter"
                        >
                            <Twitter className="h-6 w-6" strokeWidth={1.5} />
                        </Link>
                    </div>
                </div>

                <div className="mt-12 w-full border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ink-subtle">
                    <p>© {currentYear} Om Ghante. All rights reserved.</p>
                    <p className="font-mono text-xs uppercase tracking-widest">Designed & Engineered by Om Ghante</p>
                </div>
            </div>
        </footer>
    );
}
