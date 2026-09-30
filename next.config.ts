import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    // One canonical host: yamoto.com → www.yamoto.com (Vercel also handles this at the domain level).
    return [{ source: "/:path*", has: [{ type: "host", value: "yamoto.com" }], destination: "https://www.yamoto.com/:path*", permanent: true }];
  },
};

export default nextConfig;
