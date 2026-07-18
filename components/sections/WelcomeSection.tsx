type WelcomeSectionProps = {
  title: string;
  tagline: string;
  quote: string;
  intro: string;
};

export function WelcomeSection({
  title,
  tagline,
  quote,
  intro,
}: WelcomeSectionProps) {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-bold uppercase text-primary md:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-lg font-semibold text-text-dark">{tagline}</p>
        <blockquote className="mx-auto mt-8 max-w-3xl border-l-4 border-accent pl-6 text-left text-base italic leading-relaxed text-gray-700 md:text-lg">
          {quote}
        </blockquote>
        <p className="mx-auto mt-8 max-w-3xl text-left text-sm leading-relaxed text-gray-600 md:text-base">
          {intro}
        </p>
      </div>
    </section>
  );
}
