'use client';

import { useEffect, useState } from 'react';

interface TypeFilterProps {
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
}

export function TypeFilter({ selectedTypes, onTypeChange }: TypeFilterProps) {
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type');
        const data = await response.json();
        // Filter out unknown and shadow types
        const filteredTypes = data.results
          .filter(
            (type: { name: string }) =>
              !['unknown', 'shadow'].includes(type.name)
          )
          .map((type: { name: string }) => type.name);
        setTypes(filteredTypes);
      } catch (error) {
        console.error('Error fetching types:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTypes();
  }, []);

  const handleTypeClick = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  if (loading) {
    return <div>Loading types...</div>;
  }

  return (
    <div>
      <p className="font-medium mb-2">Types:</p>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type}
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              selectedTypes.includes(type)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
