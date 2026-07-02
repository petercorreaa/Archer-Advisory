import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "gradient" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold tracking-tight " +
  "transition-colors duration-300 ease-brand focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  // Orange — the default call to action. Works on any surface.
  primary:
    "bg-brand-orange text-white hover:bg-brand-orange/90 focus-visible:ring-brand-orange",
  // Neutral outline for secondary actions.
  outline:
    "border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/[0.03] focus-visible:ring-ink/30",
  // Blue gradient. IMPORTANT: only place this on a sand surface (Section surface="sand").
  // Never render it on an orange surface — the contrast is off-brand.
  gradient:
    "gradient-blue text-white hover:opacity-90 focus-visible:ring-[#100c9e]",
  // Ghost — white border + white text for dark/image backgrounds (hero, dark sections).
  ghost:
    "border border-white/35 text-white/85 hover:border-white/65 hover:text-white focus-visible:ring-white/50",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-lg",
};

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof BaseProps | "href"> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<React.ComponentPropsWithoutRef<"a">, keyof BaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Brand button.
 *
 * Variants:
 * - `primary`  — orange, the standard CTA (any surface).
 * - `outline`  — neutral secondary action.
 * - `gradient` — blue gradient; MUST sit on a sand surface only, never on orange.
 *
 * Renders an <a> when `href` is provided, otherwise a <button>.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    return (
      <a className={classes} {...(props as ButtonAsLink)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
