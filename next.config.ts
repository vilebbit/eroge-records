import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      new URL("https://pics.dmm.co.jp/**"),
      new URL("https://www.suruga-ya.jp/database/pics/game/**"),
      new URL("https://img.dlsite.jp/**"),
    ],
  },
}

export default nextConfig
