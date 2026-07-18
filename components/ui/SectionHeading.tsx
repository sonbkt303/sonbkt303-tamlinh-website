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

const dividerVariants = {
  light: "",
  dark: "",
  primary: "ornament-divider-accent-soft",
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
          "heading-classic text-2xl md:text-3xl",
          titleVariants[variant],
        )}
      >
        {title}
      </Tag>
      <div className={cn("ornament-divider", dividerVariants[variant])} />
    </div>
  );
}
