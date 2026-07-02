import { cn } from "@/lib/cn";
import { Container } from "@/components/Container";

type SectionProps = {
  /** Background treatment. Defaults to white; "sand" uses the brand sand tone. */
  surface?: "default" | "sand";
  /** Set false to render children without the inner Container wrapper. */
  contained?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"section">, "className" | "children">;

/**
 * Vertical content band. The optional `surface="sand"` prop paints the section
 * with the #E4E0DA brand sand background — the only surface the blue gradient
 * Button variant is allowed to sit on.
 */
export function Section({
  surface = "default",
  contained = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-surface={surface}
      className={cn(
        "py-20 lg:py-28",
        surface === "sand" ? "bg-brand-sand text-ink" : "bg-white text-ink",
        className
      )}
      {...props}
    >
      {contained ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
