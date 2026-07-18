import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  variant?: "gold" | "white";
  className?: string;
  as?: "h2" | "h3";
};

export function SectionHeading({
  title,
  variant = "gold",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("text-center", className)}>
      <Tag
        className={cn(
          "text-2xl font-bold uppercase tracking-wide md:text-3xl",
          variant === "gold" ? "text-accent" : "text-white",
        )}
      >
        {title}
      </Tag>
      <div className="mx-auto mt-3 h-px w-16 bg-white/80" />
    </div>
  );
}
