import content from "../data/content.json";

export default function Skills() {
    const { skills } = content;

    return (
        <section className="w-full bg-surface-raised border-y border-border py-16">
            <div className="container-max mx-auto px-6 lg:px-0">
                <h2 className="mb-12 font-display text-2xl font-bold tracking-tight text-ink">
                    {skills.title}
                </h2>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {skills.advanced.map((skill) => (
                        <div
                            key={skill}
                            className="flex items-center gap-3 border-l-2 border-border pl-4 transition-colors hover:border-accent"
                        >
                            <span className="font-medium text-ink-muted">{skill}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
