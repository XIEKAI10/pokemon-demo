'use client';

import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  // Get Pokémon sprite image
  const imageUrl = pokemon.sprites.front_default;

  return (
    <div className="bg-white border border-gray-200 p-4 rounded-sm flex flex-col items-center">
      {/* Pokémon name */}
      <h3 className="text-center font-medium text-sm mb-2 capitalize">
        {pokemon.name.replace(/-/g, ' ')}
      </h3>

      {/* Pokémon image */}
      <div className="flex justify-center mb-2">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={pokemon.name}
            width={80}
            height={80}
            className="object-contain"
            unoptimized // Avoid Next.js image optimization issues
          />
        )}
      </div>

      {/* Pokémon number */}
      <p className="text-center text-sm">Number: {pokemon.id}</p>
    </div>
  );
}
