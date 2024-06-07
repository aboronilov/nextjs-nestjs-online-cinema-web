/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  optimizeFonts: false,
  env: {
    API_URL: "https://nextjs-nestjs-online-cinema-web.onrender.com",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nextjs-nestjs-online-cinema-web.onrender.com",
        pathname: "**",
      },
    ],
  },
}

export default nextConfig
