/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com', 'pokeapi.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.pokeapi.co',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
