import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* AVIF first, WebP second, original last. The hero aerial is the only
       large photograph on the site and it is above the fold, so the ~25%
       AVIF saves over WebP is worth the slower encode at build time.
       Next serves whichever the requesting browser accepts. */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
