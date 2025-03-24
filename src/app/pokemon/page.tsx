import PokemonData from './PokemonData';

interface PageProps {
  searchParams: {
    page?: string;
    types?: string;
  };
}

export default async function PokemonPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  const page = resolvedParams.page ? parseInt(String(resolvedParams.page)) : 1;
  const types = resolvedParams.types
    ? String(resolvedParams.types).split(',')
    : [];

  return (
    <main>
      <PokemonData initialPage={page} initialTypes={types} />
    </main>
  );
}
