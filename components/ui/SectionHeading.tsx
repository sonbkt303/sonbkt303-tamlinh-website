import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  variant?: "light" | "dark" | "primary";
  className?: string;
  as?: "h2" | "h3";
};

const titleVariants = {
  light: "text-primary-dark",
  dark: "text-white",
  primary: "text-accent-soft",
};

const underlineVariants = {
  light: "bg-accent",
  dark: "bg-accent",
  primary: "bg-accent-soft",
};

export function SectionHeading({
  title,
  variant = "light",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("text-center", className)}>
      <Tag
        className={cn(
          "text-2xl font-bold uppercase tracking-wide md:text-3xl",
          titleVariants[variant],
        )}
      >
        {title}
      </Tag>
      <div className={cn("mx-auto mt-3 h-0.5 w-16", underlineVariants[variant])} />
    </div>
  );
}
