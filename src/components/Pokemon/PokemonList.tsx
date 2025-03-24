'use client';

import { PokemonCard } from './PokemonCard';
import { Pokemon } from '@/types/pokemon';

interface PokemonListProps {
  pokemon: Pokemon[];
  isLoading: boolean;
  selectedTypes: string[];
}

export function PokemonList({
  pokemon,
  isLoading,
  selectedTypes,
}: PokemonListProps) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-lg font-medium">Loading...</p>
          </div>
        </div>
      );
    }

    if (pokemon.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-xl font-medium text-gray-600">
            {selectedTypes.length > 0
              ? `No Pokémon found with ${selectedTypes.join(' and ')} types`
              : 'No Pokémon found'}
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {pokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    );
  };

  return <div className="relative min-h-[400px]">{renderContent()}</div>;
}
