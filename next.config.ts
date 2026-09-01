import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    /*
     * The source photos top out around 1900px on the long edge, so the default
     * 2048 and 3840 breakpoints only ever produce upscaled images: bigger file,
     * no extra detail. Capping the list keeps the browser picking a real size.
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [128, 256, 384],
    formats: ["image/webp"],
  },
  experimental: {
    serverActions: {
      // Lead-form photos arrive through the server action. The form downscales
      // them client-side to a few hundred KB, so this is headroom for three
      // photos plus fields, not the expected payload.
      bodySizeLimit: "12mb",
    },
  },
};

export default nextConfig;
