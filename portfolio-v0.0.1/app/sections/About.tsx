import content from "../data/content.json";

export default function About() {
    const { about } = content;

    return (
        <section id="about" className="w-full bg-surface py-24">
            <div className="container-max mx-auto px-6 lg:px-0">
                <h2 className="mb-8 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                    {about.title}
                </h2>

                <div className="max-w-3xl">
                    <p
                        className="prose prose-lg text-ink-muted leading-loose"
                        dangerouslySetInnerHTML={{ __html: about.description }}
                    />
                </div>
            </div>
        </section>
    );
}
