import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/q-commerce",
        destination: "/collateral",
        permanent: true,
      },
      {
        source: "/search-ranking",
        destination: "/collateral",
        permanent: true,
      },
      {
        source: "/pricing-offers",
        destination: "/collateral",
        permanent: true,
      },
      {
        source: "/30-60-90-plan",
        destination: "/collateral",
        permanent: true,
      },
      {
        source: "/deck",
        destination: "/collateral",
        permanent: true,
      },
      {
        source: "/brand/:path*",
        destination: "/results",
        permanent: true,
      },
      {
        source: "/participant/:path*",
        destination: "/study",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
