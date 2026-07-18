import { SectionHeading } from "@/components/ui/SectionHeading";

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
    <section className="section-padding bg-surface">
      <div className="container-main max-w-4xl text-center">
        <SectionHeading title={title} variant="light" />
        <p className="mt-4 text-lg font-semibold text-text-dark">{tagline}</p>
        <blockquote className="mx-auto mt-8 max-w-3xl rounded-lg border-l-4 border-accent bg-surface-muted p-6 text-left text-base italic leading-7 text-text-muted md:text-lg">
          {quote}
        </blockquote>
        <p className="prose-body mx-auto mt-8 max-w-3xl text-left">{intro}</p>
      </div>
    </section>
  );
}
