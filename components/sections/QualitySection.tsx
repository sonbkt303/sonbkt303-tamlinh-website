import Image from "next/image";
import { FeatureList } from "@/components/ui/FeatureList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { qualityImage } from "@/lib/data/hero";

type QualitySectionProps = {
  title: string;
  features: string[];
  commitmentTitle: string;
  commitment: string;
  contactLine: string;
  imageAlt: string;
};

export function QualitySection({
  title,
  features,
  commitmentTitle,
  commitment,
  contactLine,
  imageAlt,
}: QualitySectionProps) {
  return (
    <section className="section-padding bg-surface">
      <div className="container-main grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading title={title} variant="light" className="text-left" />
          <div className="mt-8">
            <FeatureList items={features} />
          </div>

          <h3 className="mt-10 text-lg font-semibold leading-snug text-primary-dark md:text-xl">
            {commitmentTitle}
          </h3>
          <p className="prose-body mt-4">{commitment}</p>
          <p className="prose-body mt-4 text-text-dark">{contactLine}</p>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg">
          <Image
            src={qualityImage}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
