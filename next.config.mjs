/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@chakra-ui/react', 'framer-motion'],
  },
  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      minimize: true,
    };
    return config;
  },
};

export default nextConfig; 