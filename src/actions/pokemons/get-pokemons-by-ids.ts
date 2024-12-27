import {Pokemon} from '../../domain/entities/pokemon';
import {getPokemon} from './get-pokemon';

export const getPokemonsByIds = async (ids: number[]) => {
  try {
    const pokemonsPromises: Promise<Pokemon>[] = ids.map(id => {
      return getPokemon(id);
    });

    return Promise.all(pokemonsPromises);
  } catch (error) {
    throw new Error('No se pudo encontrar esos pokemons por esos IDs');
  }
};
