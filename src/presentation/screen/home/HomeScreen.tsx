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
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {PokeballBg} from '../../components/ui/PokeballBg';
import {useAnimation} from '../../hooks/useAnimation';
import {useEffect} from 'react';
import {Text} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../pokemon/PokemonCard';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {showHide, fadeOut, fadeIn, animatedTop} = useAnimation();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

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
    queryFn: params => getPokemons(params.pageParam),
    getNextPageParam: (lastPage, pages) => pages.length,

    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    fadeIn({duration: 2000});
  }, []);

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

      {!isLoading ? (
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
