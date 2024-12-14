import {pokemonAPI} from '../../config/api/pokemonApi';
import {Pokemon} from '../../domain/entities/pokemon';
import {PokemonAPIIndividual} from '../../infrastructure/interfaces/pokeApi.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemon = async (pokemonId: number): Promise<Pokemon> => {
  try {
    const url = `/pokemon/${pokemonId}`;
    const {data} = await pokemonAPI.get<PokemonAPIIndividual>(url);
    const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);

    return pokemon;
  } catch (error) {
    throw new Error(`Error al solicitar datos del pokemon ${pokemonAPI}`);
  }
};
