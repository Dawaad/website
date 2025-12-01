import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone',
    turbopack: {
        root: __dirname,
    },
    images: {
        loader: "custom",
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.jtucker.io",
            },
        ],
    },
};

export default nextConfig;
