import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {RootStackParams} from '../../navigator/StackNavigator';
import {Button, Chip, Surface, Text} from 'react-native-paper';
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
import {OrderMoveByLevel} from '../../../helpers/OrderMoveByLevel';

export const PokemonScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isDark} = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
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
    <View style={{flex: 1, position: 'relative'}}>
      <ScrollView
        style={{backgroundColor: pokemon.color}}
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
        <View
          style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
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

        {/* GAMES */}
        <Text
          style={{
            ...styles.pokemonName,
            fontSize: 30,
          }}>
          Games
        </Text>

        <FlatList
          data={pokemon.games}
          horizontal
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          centerContent
          style={{
            marginBottom: 10,
          }}
          renderItem={item => <Chip style={{marginLeft: 10}}>{item.item}</Chip>}
        />

        {/* Abilites */}
        <Text
          style={{
            ...styles.pokemonName,
            fontSize: 30,
          }}>
          Abilities
        </Text>

        <FlatList
          data={pokemon.abilities}
          horizontal
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          centerContent
          renderItem={item => <Chip style={{marginLeft: 10}}>{item.item}</Chip>}
        />

        {/* stats */}
        <Text
          style={{
            ...styles.pokemonName,
            fontSize: 30,
          }}>
          Stats
        </Text>

        <FlatList
          data={pokemon.stats}
          horizontal
          keyExtractor={item => item.name}
          showsHorizontalScrollIndicator={false}
          centerContent
          style={{
            marginBottom: 10,
          }}
          renderItem={item => (
            <Chip style={{marginLeft: 10}}>
              {item.item.name}: {item.item.value}
            </Chip>
          )}
        />

        <Text
          style={{
            ...styles.pokemonName,
            fontSize: 30,
          }}>
          Move
        </Text>

        <FlatList
          data={pokemon.move}
          horizontal
          keyExtractor={item => item.name}
          showsHorizontalScrollIndicator={false}
          centerContent
          style={{
            marginBottom: 10,
          }}
          renderItem={item => (
            <Chip style={{marginLeft: 10}}>
              {item.item.name}: {item.item.level}
            </Chip>
          )}
        />

        <View style={{height: 100}} />
      </ScrollView>
      <View style={{display: 'flex', flexDirection: 'row', gap: 2}}>
        <Button
          style={{flex: 1, borderRadius: 0}}
          onPress={() =>
            navigation.navigate('pokemon', {pokemonId: pokemon.id - 1})
          }
          mode="contained-tonal">
          Prev
        </Button>
        <Button
          style={{flex: 1, borderRadius: 0}}
          onPress={() =>
            navigation.navigate('pokemon', {pokemonId: pokemon.id + 1})
          }
          mode="contained-tonal">
          Next
        </Button>
      </View>
    </View>
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
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
