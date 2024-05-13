/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  optimizeFonts: false,
  env: {
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
  },
}

export default nextConfig
