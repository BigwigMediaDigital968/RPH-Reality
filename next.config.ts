import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Add this if you're using external images
    images: {
        domains: ['images.unsplash.com', 's7ap1.scene7.com'],
        unoptimized: true,
    },
};

export default nextConfig;
