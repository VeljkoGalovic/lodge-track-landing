import type { NextConfig } from "next";

/**
 * The pre-launch site is a fully static marketing surface: no server actions,
 * no API routes, no database. Any runtime configuration the removed application
 * needed can come back with it when development resumes.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
