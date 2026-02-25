"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import content from "../data/content.json";

export default function Projects() {
    const { projects } = content;
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    return (
        <section id="projects" className="w-full bg-surface py-32 border-t border-border/40">
            <div className="container-max mx-auto px-6 lg:px-0">
                <h2 className="mb-20 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                    Selected Works
                </h2>

                <div className="flex flex-col gap-32">
                    {projects.items.map((project, index) => (
                        <div
                            key={project.id}
                            className={`group flex flex-col gap-12 lg:gap-24 items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                }`}
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            {/* Project Image - Large & Immersive */}
                            <div className="w-full lg:w-3/5">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-surface-raised shadow-sm transition-all duration-700 ease-out group-hover:shadow-2xl group-hover:shadow-accent/5 ring-1 ring-border group-hover:ring-accent/20">
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />

                                    {/* Overlay Action */}
                                    <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/5 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        {project.demoUrl && project.demoUrl !== "#" && (
                                            <Link
                                                href={project.demoUrl}
                                                target="_blank"
                                                className="bg-surface-raised text-ink px-6 py-3 rounded-full font-medium shadow-xl translate-y-4 transition-transform duration-500 group-hover:translate-y-0 flex items-center gap-2"
                                            >
                                                Visit Live Site <ArrowUpRight size={16} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Project Info - Minimal & Typography Driven */}
                            <div className="w-full lg:w-2/5 flex flex-col items-start">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
                                            0{index + 1} — {project.category || "Development"}
                                        </span>
                                        <h3 className="font-display text-4xl font-bold text-ink leading-tight">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <p className="text-lg text-ink-muted leading-relaxed font-light">
                                        {project.description}
                                    </p>

                                    {/* Proof Metric */}
                                    {project.outcome && (
                                        <div className="py-4 border-y border-border/60 w-full my-2">
                                            <p className="font-mono text-sm text-ink font-medium">
                                                <span className="text-accent mr-2">/</span>
                                                {project.outcome}
                                            </p>
                                        </div>
                                    )}

                                    {/* Tech Stack - Text Based */}
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-ink-subtle">
                                        {project.techStack.map((tech) => (
                                            <span key={tech}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-8 pt-4">
                                        {project.demoUrl && project.demoUrl !== "#" && (
                                            <Link href={project.demoUrl} target="_blank" className="text-ink font-medium hover:text-accent transition-colors flex items-center gap-2 group/link">
                                                View Project <ArrowUpRight className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" size={18} />
                                            </Link>
                                        )}
                                        {project.repoUrl && project.repoUrl !== "#" && (
                                            <Link href={project.repoUrl} target="_blank" className="text-ink-muted hover:text-ink transition-colors flex items-center gap-2">
                                                Source Code <Github size={18} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
