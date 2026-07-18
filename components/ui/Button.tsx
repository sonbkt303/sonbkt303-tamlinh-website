import { cn } from "@/lib/utils";
import { Link } from "@/lib/i18n/routing";

type ButtonVariant = "primary" | "accent" | "phone" | "outline" | "ghost";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark",
  accent:
    "border border-accent/40 bg-accent text-accent-foreground hover:brightness-95",
  phone:
    "bg-cta-phone text-white hover:brightness-110",
  outline:
    "border border-white text-white hover:bg-white/10",
  ghost:
    "text-primary hover:text-primary-dark",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm md:text-base",
};

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = ButtonBaseProps & {
  href: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">;

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClasses =
  "focus-ring inline-flex items-center justify-center rounded-md font-semibold transition";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href as "/"} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

export function ExternalButton({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}
