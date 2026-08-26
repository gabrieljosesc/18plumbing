import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
