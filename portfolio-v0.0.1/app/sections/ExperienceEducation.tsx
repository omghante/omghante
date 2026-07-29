"use client";

import { useState } from "react";
import content from "../data/content.json";

export default function ExperienceEducation() {
    const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

    // Type guard or casting
    const data = activeTab === "experience" ? content.experience : content.education;

    return (
        <section className="w-full bg-surface py-24">
            <div className="container-max mx-auto px-6 lg:px-0">
                <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                            Professional Journey
                        </h2>
                        <div className="mt-4 h-1 w-24 bg-accent" />
                    </div>

                    <div className="flex gap-4 border-b border-border pb-1">
                        <button
                            onClick={() => setActiveTab("experience")}
                            className={`pb-2 text-sm font-medium transition-colors ${activeTab === "experience"
                                    ? "border-b-2 border-accent text-ink"
                                    : "text-ink-muted hover:text-ink"
                                }`}
                        >
                            Experience
                        </button>
                        <button
                            onClick={() => setActiveTab("education")}
                            className={`pb-2 text-sm font-medium transition-colors ${activeTab === "education"
                                    ? "border-b-2 border-accent text-ink"
                                    : "text-ink-muted hover:text-ink"
                                }`}
                        >
                            Education
                        </button>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {data.map((item: any) => (
                        <div
                            key={item.id}
                            className="flex flex-col gap-4 border-l border-border pl-6 py-2 transition-opacity hover:border-accent"
                        >
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                                    {item.duration}
                                </span>
                                <h3 className="font-display text-xl font-bold text-ink">{item.title}</h3>
                                <p className="text-base font-medium text-ink-muted">{item.organization}</p>
                            </div>

                            <p className="max-w-md text-sm leading-relaxed text-ink-muted/80">
                                {item.description}
                            </p>

                            {item.technologies && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {item.technologies.map((tech: string) => (
                                        <span key={tech} className="text-xs font-medium text-accent">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
