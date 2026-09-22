import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Baseline security headers (a trust signal for crawlers and audits). A CSP is left out on
  // purpose: the inline pre-paint script and JSON-LD would need nonces or hashes first.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Cloudinary-hosted media, scoped to our own cloud so no other account can be proxied
    // through this site's optimiser. Note that Cloudinary already serves optimised, CDN-cached
    // bytes: prefer the helpers in `lib/cloudinary.ts` over `next/image` for anything it hosts.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/ownlpgic/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
