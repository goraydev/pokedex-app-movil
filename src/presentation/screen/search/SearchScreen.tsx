import {FlatList} from 'react-native-gesture-handler';
import {Pokemon} from '../../../domain/entities/pokemon';
import {PokemonCard} from '../pokemon/PokemonCard';
import {ActivityIndicator, Text} from 'react-native-paper';

interface Props {
  headerText: string;
  onEndReached?: ((info: {distanceFromEnd: number}) => void) | null | undefined;
  pokemonSearch: Pokemon[];
}

export const ShowFlatList = ({
  headerText = '',
  onEndReached,
  pokemonSearch,
}: Props) => {
  const renderFlatList = () => (
    <FlatList
      data={pokemonSearch}
      keyExtractor={(pokemon, index) => `${pokemon.id}`}
      numColumns={2}
      renderItem={item => <PokemonCard pokemon={item.item} />}
      ListHeaderComponent={() => (
        <Text variant="displayMedium" style={{marginBottom: 50}}>
          {headerText}
        </Text>
      )}
      style={{elevation: 20}}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        onEndReached ? <ActivityIndicator size="large" color="white" /> : null
      }
    />
  );

  return renderFlatList();
};
