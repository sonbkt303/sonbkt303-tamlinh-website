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
    <section className="bg-white px-4 py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:px-6">
        <div>
          <SectionHeading
            title={title}
            variant="gold"
            className="text-left [&_h2]:text-primary [&_div]:bg-primary"
          />
          <div className="mt-8">
            <FeatureList items={features} />
          </div>

          <h3 className="mt-10 text-lg font-bold uppercase leading-snug text-accent">
            {commitmentTitle}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">
            {commitment}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-700">{contactLine}</p>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-2xl">
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
