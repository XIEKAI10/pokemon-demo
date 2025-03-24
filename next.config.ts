import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'raw.githubusercontent.com',
      'assets.pokemon.com',
      'pokeapi.co',
      'pokeres.bastionbot.org',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
