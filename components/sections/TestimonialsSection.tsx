import { SectionHeading } from "@/components/ui/SectionHeading";

type TestimonialsSectionProps = {
  title: string;
  subtitle: string;
};

export function TestimonialsSection({ title, subtitle }: TestimonialsSectionProps) {
  return (
    <section className="section-padding bg-primary-dark">
      <div className="container-main max-w-4xl text-center">
        <SectionHeading title={title} variant="dark" />
        <p className="prose-body mt-6 text-white/90 md:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}
