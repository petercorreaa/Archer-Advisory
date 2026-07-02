import { cn } from "@/lib/cn";

type ContainerProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * Centered, max-width content wrapper with responsive gutters.
 * Mirrors the Tailwind `container` settings defined in tailwind.config.ts.
 */
export function Container<T extends React.ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component className={cn("container", className)} {...props}>
      {children}
    </Component>
  );
}
