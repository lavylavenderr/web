/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // nixpacks img will fail without this
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
