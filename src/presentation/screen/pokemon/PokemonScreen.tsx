import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {RootStackParams} from '../../navigator/StackNavigator';
import {Button, Chip, Text} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import {getPokemon} from '../../../actions/pokemons/get-pokemon';
import {useContext, useEffect} from 'react';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {useAnimation} from '../../hooks/useAnimation';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {ScrollView} from 'react-native-gesture-handler';
import {Formatter} from '../../../config/helpers/formatter';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../../context/ThemeContext.';

export const PokemonScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isDark} = useContext(ThemeContext);
  const navigation = useNavigation();
  const {fadeIn, animatedTop} = useAnimation();
  const {pokemonId} = useRoute<RouteProp<RootStackParams, 'pokemon'>>().params;
  const {isLoading, data: pokemon} = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemon(pokemonId),
  });

  const pokeballImg = isDark
    ? require('../../../assets/pokeball-dark.png')
    : require('../../../assets/pokeball-light.png');

  if (!pokemon) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: pokemon.color}}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        {/* Nombre del Pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 5,
          }}>
          {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
        </Text>

        {/* Pokeball */}
        <Image source={pokeballImg} style={styles.pokeball} />

        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
      </View>

      {/* Types */}
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
        {pokemon.types.map(type => (
          <Chip
            key={type}
            mode="outlined"
            selectedColor="white"
            style={{marginLeft: 10}}>
            {type}
          </Chip>
        ))}
      </View>

      {/* Sprites */}
      <FlatList
        data={pokemon.sprites}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        style={{
          marginTop: 20,
          height: 100,
        }}
        renderItem={({item}) => (
          <FadeInImage
            uri={item}
            style={{width: 100, height: 100, marginHorizontal: 5}}
          />
        )}
      />

      <View style={{height: 100}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
});
