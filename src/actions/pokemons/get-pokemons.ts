import {pokemonAPI} from '../../config/api/pokemonApi';
import {Pokemon} from '../../domain/entities/pokemon';
import {sleep} from '../../helpers/sleep';
import {
  PokeAPIPaginatedResponse,
  PokeAPIPokemon,
} from '../../infrastructure/interfaces/pokeApi.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemons = async (
  page: number,
  limit: number = 20,
): Promise<Pokemon[]> => {
  // await sleep();
  try {
    const url = `/pokemon?offset=${page * 20}&limit=${limit}`;

    const {data} = await pokemonAPI.get<PokeAPIPaginatedResponse>(url);

    const pokemonPromises = data.results.map(info => {
      return pokemonAPI.get<PokeAPIPokemon>(info.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromises);
    const pokemonsPromises = pokeApiPokemons.map(item =>
      PokemonMapper.pokeApiPokemonToEntity(item.data),
    );

    return await Promise.all(pokemonsPromises);
  } catch (error) {
    throw new Error('error de petición de datos');
  }
};
