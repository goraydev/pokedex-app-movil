import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Pressable,
  StyleSheet,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {RootStackParams} from '../../navigator/StackNavigator';
import {getPokemons} from '../../../actions/pokemons';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {PokeballBg} from '../../components/ui/PokeballBg';
import {useAnimation} from '../../hooks/useAnimation';
import {useEffect, useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../pokemon/PokemonCard';
import {Pokemon} from '../../../domain/entities/pokemon';
import {ShowFlatList} from '../search/SearchScreen';

export const HomeScreen = () => {
  const queryClient = useQueryClient();
  const {top} = useSafeAreaInsets();

  const {showHide, fadeOut, fadeIn, animatedTop} = useAnimation();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [text, setText] = useState('');
  const [pokemonSearch, setPokemonSearch] = useState<Pokemon[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Queries
  //Forma tradicional de realizar la petición HTTP
  /* const {isLoading, data: pokemons = []} = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 60,
  }); */

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: async params => {
      const pokemons = await getPokemons(params.pageParam);

      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });

      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,

    staleTime: 1000 * 60 * 60,
  });

  const handleSearch = () => {
    const searched =
      data?.pages
        .flat()
        .filter(pokemon =>
          pokemon.name.toLowerCase().includes(text.toLowerCase()),
        ) ?? [];
    setLoadingSearch(true);

    if (searched.length > 0) {
      setLoadingSearch(false);
      setPokemonSearch(searched);
    }
  };

  useEffect(() => {
    fadeIn({duration: 2000});
  }, []);

  useEffect(() => {
    if (text.length === 0) {
      setPokemonSearch([]);
    }
  }, [text]);

  return (
    <View style={[globalTheme.globalMargin, {top: top + 20, bottom: 200}]}>
      <PokeballBg
        style={[
          styles.imgPositionTop,
          {
            transform: [{translateY: animatedTop}],
          },
        ]}
      />

      <PokeballBg
        style={[
          styles.imgPositionBottom,
          {transform: [{translateY: animatedTop}]},
        ]}
      />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}>
        <TextInput
          mode="outlined"
          label="Buscar Pokedex"
          placeholder="Buscar Pokedex"
          right={<TextInput.Affix text="/50" />}
          style={{marginBottom: 10, flex: 1}}
          onChangeText={text => setText(text)}
        />
        <Button
          mode="contained"
          onPress={() => handleSearch()}
          style={{borderRadius: 0}}>
          Search
        </Button>
      </View>
      {/* 
      {pokemonSearch.length > 0 ? (
        <FlatList
          data={pokemonSearch}
          keyExtractor={pokemon => `${pokemon.id}`}
          numColumns={2}
          renderItem={item => <PokemonCard pokemon={item.item} />}
          ListHeaderComponent={() => (
            <Text variant="displayMedium" style={{marginBottom: 50}}>
              Pokédex Encontrado
            </Text>
          )}
          style={{elevation: 20}}
          onEndReachedThreshold={0.6}
          showsVerticalScrollIndicator={false}
        />
      ) : !isLoading ? (
        <FlatList
          data={data?.pages.flat() ?? []}
          keyExtractor={pokemon => `${pokemon.id}`}
          numColumns={2}
          renderItem={item => <PokemonCard pokemon={item.item} />}
          ListHeaderComponent={() => (
            <Text variant="displayMedium" style={{marginBottom: 50}}>
              Pokédex
            </Text>
          )}
          style={{elevation: 20}}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.6}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <ActivityIndicator size="large" color={'white'} />
          )}
        />
      ) : (
        <ActivityIndicator />
      )} */}

      {pokemonSearch.length > 0 && text.length > 0 ? (
        <ShowFlatList
          pokemonSearch={pokemonSearch}
          headerText="Pokedex Encontrado"
          onEndReached={() => fetchNextPage()}
        />
      ) : !isLoading ? (
        <ShowFlatList
          pokemonSearch={data?.pages.flat() ?? []}
          headerText="Pokedex"
          onEndReached={() => fetchNextPage()}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgPositionTop: {
    position: 'absolute',
    top: -120,
    right: -100,
  },
  imgPositionBottom: {
    position: 'absolute',
    top: 600,
    left: -100,
  },
});
