/** Shared stat figures used on About. Update here to propagate everywhere. */
export const STATS = [
  { end: 100, suffix: "+", label: "Law Firms Served" },
  { end: 95,  suffix: "%", label: "Client Retention" },
  { end: 25,  suffix: "+", label: "Years Combined Experience" },
  { end: 24,  suffix: "/7", label: "Support Coverage" },
] as const;

/** Stat figures for the Home page stats bar. Placeholder values pending real numbers. */
export const HOME_STATS = [
  { value: "[N]+", label: "Law Firms Served" },
  { value: "[N]", label: "Spot Audits Completed" },
  { value: "[N]%", label: "Average Reduction in Accounting Time" },
] as const;
