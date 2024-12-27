import {pokemonAPI} from '../../config/api/pokemonApi';
import {Pokemon} from '../../domain/entities/pokemon';
import {PokeAPIPaginatedResponse} from '../../infrastructure/interfaces/pokeApi.interfaces';

export const getPokemonNamesWithId = async () => {
  try {
    const url = `/pokemon?limit=${1000}`;
    const {data} = await pokemonAPI.get<PokeAPIPaginatedResponse>(url);

    return data.results.map(info => ({
      id: Number(info.url.split('/')[6]),
      name: info.name,
    }));
  } catch (error) {
    throw new Error(`No se encontró pokemon, ${error}`);
  }
};
