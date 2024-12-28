import {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Text, TextInput} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalTheme} from '../../../config/theme/global-theme';
import {useQuery} from '@tanstack/react-query';
import {
  getPokemonNamesWithId,
  getPokemonsByIds,
} from '../../../actions/pokemons';
import {ShowFlatList} from './ShowFlatList';
import {FlatList} from 'react-native-gesture-handler';
import {PokemonCard} from '../pokemon/PokemonCard';
import {Pokemon} from '../../../domain/entities/pokemon';
import {View} from 'react-native';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {useDebounceValue} from '../../hooks/useDebouncedValue';

export const SearchSecondScreen = () => {
  const [text, setText] = useState('');
  const {top} = useSafeAreaInsets();
  const debounceValue = useDebounceValue(text);

  const {isLoading, data: pokemonNameList = []} = useQuery({
    queryKey: ['pokemon', 'all'],
    queryFn: () => getPokemonNamesWithId(),
  });

  const pokemonNameIdList = useMemo(() => {
    if (!isNaN(Number(debounceValue))) {
      const pokemon = pokemonNameList.find(
        (pokemon: {id: number}) => pokemon.id === Number(debounceValue),
      );
      return pokemon ? [pokemon] : [];
    }

    if (debounceValue.length === 0) return [];

    if (debounceValue.length < 3) return [];

    return pokemonNameList.filter(pokemon =>
      pokemon.name.includes(debounceValue.toLocaleLowerCase()),
    );
  }, [debounceValue]);

  const {isLoading: loadingData, data: pokemones} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () =>
      getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder="Buscar Pokedex"
        mode="flat"
        autoFocus
        autoCorrect={false}
        value={text}
        onChangeText={text => setText(text)}
      />

      {loadingData && <ActivityIndicator />}
      {
        <FlatList
          data={pokemones ?? []}
          keyExtractor={pokemon => `${pokemon.id}`}
          numColumns={2}
          renderItem={item => <PokemonCard pokemon={item.item} />}
          style={{elevation: 20, marginVertical: 30}}
          onEndReachedThreshold={0.6}
          showsVerticalScrollIndicator={false}
        />
      }
    </View>
  );
};
