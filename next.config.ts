import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      new URL("https://img.vibbit.me/**"),
      new URL("https://pics.dmm.co.jp/**"),
      new URL("https://www.suruga-ya.jp/database/pics/game/**"),
      new URL("https://img.dlsite.jp/**"),
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              connect-src 'self' *.vibbit.me;
              img-src 'self' blob: data: img.vibbit.me pics.dmm.co.jp www.suruga-ya.jp img.dlsite.jp;
            `.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ]
  },
}

export default nextConfig
