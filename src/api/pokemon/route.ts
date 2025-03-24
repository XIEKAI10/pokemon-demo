import { NextResponse } from 'next/server';
import { PokemonListResponse, PokemonTypeResponse } from '@/types/pokemon';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const typesParam = searchParams.get('types');
  const types = typesParam ? typesParam.split(',').filter(Boolean) : [];
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '18');

  try {
    let allPokemon: { name: string; url: string }[] = [];

    if (types.length > 0) {
      // 获取选中类型的宠物小精灵
      const typePromises = types.map((type) =>
        fetch(`https://pokeapi.co/api/v2/type/${type}`).then((res) =>
          res.json()
        )
      );

      const typeDataArray: PokemonTypeResponse[] = await Promise.all(
        typePromises
      );

      if (typeDataArray.length === 0) {
        allPokemon = [];
      } else {
        // 从第一个类型获取初始宠物列表
        const firstTypePokemons = new Map(
          typeDataArray[0].pokemon.map((p) => [p.pokemon.name, p.pokemon])
        );

        // 使用其他类型过滤，实现"与"逻辑
        for (let i = 1; i < typeDataArray.length; i++) {
          const currentTypePokemons = new Set(
            typeDataArray[i].pokemon.map((p) => p.pokemon.name)
          );

          // 移除不在当前类型中的宠物
          for (const pokemonName of firstTypePokemons.keys()) {
            if (!currentTypePokemons.has(pokemonName)) {
              firstTypePokemons.delete(pokemonName);
            }
          }
        }

        // 转换回数组
        allPokemon = Array.from(firstTypePokemons.values());
      }
    } else {
      // 获取所有宠物小精灵
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=1000`
      );
      const data: PokemonListResponse = await response.json();
      allPokemon = data.results;
    }

    // 计算总页数和总数量
    const totalCount = allPokemon.length;
    const totalPages = Math.ceil(totalCount / limit);

    // 分页处理
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPokemon = allPokemon.slice(startIndex, endIndex);

    // 如果没有结果，直接返回
    if (paginatedPokemon.length === 0) {
      return NextResponse.json({
        pokemon: [],
        totalCount,
        totalPages,
      });
    }

    // 获取每个宠物小精灵的详细信息
    const detailsPromises = paginatedPokemon.map((p) =>
      fetch(p.url).then((res) => res.json())
    );

    const pokemonDetails = await Promise.all(detailsPromises);

    return NextResponse.json({
      pokemon: pokemonDetails,
      totalCount,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching pokemon:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Pokemon data' },
      { status: 500 }
    );
  }
}
