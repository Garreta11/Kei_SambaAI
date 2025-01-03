/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: 'webpack-glsl-loader',
    });
    return config;
  },
  images: {
    domains: ['m.media-amazon.com', 'labs.fyitelevision.com'], // Add the external hostname here
  },
};

export default nextConfig;
