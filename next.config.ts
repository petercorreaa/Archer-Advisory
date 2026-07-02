import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in a parent directory makes Next infer the wrong
  // workspace root, which can misplace the traced output on deploy.
  // Pin both to this project directory.
  outputFileTracingRoot: import.meta.dirname,
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
