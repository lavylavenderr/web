import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

// Env validation
jiti("./src/lib/env.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
