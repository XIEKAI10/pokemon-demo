'use client';

import { useState, useEffect } from 'react';
import { TypeFilter } from './TypeFilter';
import { PokemonList } from './PokemonList';
import { Pagination } from './Pagination';
import { Pokemon } from '@/types/pokemon';

interface PokemonData {
  pokemon: Pokemon[];
  totalCount: number;
  totalPages: number;
}

interface PokemonClientProps {
  initialData: PokemonData;
  initialTypes: string[];
  initialPage: number;
}

export function PokemonClient({
  initialData,
  initialTypes,
  initialPage,
}: PokemonClientProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pokemonData, setPokemonData] = useState<PokemonData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  // Handle type change
  const handleTypeChange = (types: string[]) => {
    setSelectedTypes(types);
    setCurrentPage(1); // Reset page number
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Load data when selected types or page changes
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const queryParams = new URLSearchParams();

        if (selectedTypes.length > 0) {
          queryParams.set('types', selectedTypes.join(','));
        }

        queryParams.set('page', currentPage.toString());
        queryParams.set('limit', '18');

        const response = await fetch(`/api/pokemon?${queryParams.toString()}`);
        const data = await response.json();

        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching pokemon:', error);
      } finally {
        setIsLoading(false);
      }
    }

    // Only fetch data when selected types or page differs from initial values
    if (
      currentPage !== initialPage ||
      JSON.stringify(selectedTypes) !== JSON.stringify(initialTypes)
    ) {
      fetchData();
    }
  }, [selectedTypes, currentPage, initialPage, initialTypes]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to the Pokémon World
      </h1>

      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">
          Total: {pokemonData.totalCount} Pokémon
        </p>

        <TypeFilter
          selectedTypes={selectedTypes}
          onTypeChange={handleTypeChange}
        />
      </div>

      <PokemonList
        pokemon={pokemonData.pokemon}
        isLoading={isLoading}
        selectedTypes={selectedTypes}
      />

      {pokemonData.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pokemonData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
