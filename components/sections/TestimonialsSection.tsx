type TestimonialsSectionProps = {
  title: string;
  subtitle: string;
};

export function TestimonialsSection({ title, subtitle }: TestimonialsSectionProps) {
  return (
    <section className="bg-primary px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-bold uppercase text-white md:text-3xl">
          {title}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-white/90 md:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
