import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pokémon Directory - Next.js Demo',
  description: 'A Pokémon directory with filtering and pagination features',
};

export default function PokemonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
