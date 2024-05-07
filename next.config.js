/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.ma-dy.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = { net: false, ...config.resolve.fallback };
    return config;
  },
  experimental: {
    optimizeFonts: true,
  }
}

module.exports = nextConfig
