import { PokemonClient } from '@/components/Pokemon/PokemonClient';

interface PokemonDataProps {
  initialPage?: number;
  initialTypes?: string[];
}

export default async function PokemonData({
  initialPage = 1,
  initialTypes = [],
}: PokemonDataProps) {
  // 在服务端获取初始数据
  const queryParams = new URLSearchParams();

  if (initialTypes.length > 0) {
    queryParams.set('types', initialTypes.join(','));
  }

  queryParams.set('page', initialPage.toString());
  queryParams.set('limit', '18');

  try {
    // 直接使用相对路径，Next.js会自动处理
    const apiUrl = `/api/pokemon?${queryParams.toString()}`;
    const res = await fetch(new URL(apiUrl, 'http://localhost:3000'), {
      cache: 'no-store', // 使用no-store确保数据新鲜
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const initialData = await res.json();

    // 将数据传递给客户端组件
    return (
      <PokemonClient
        initialData={initialData}
        initialTypes={initialTypes}
        initialPage={initialPage}
      />
    );
  } catch (error) {
    console.error('Error fetching initial pokemon data:', error);

    // 提供空数据作为回退
    return (
      <PokemonClient
        initialData={{ pokemon: [], totalCount: 0, totalPages: 0 }}
        initialTypes={initialTypes}
        initialPage={initialPage}
      />
    );
  }
}
