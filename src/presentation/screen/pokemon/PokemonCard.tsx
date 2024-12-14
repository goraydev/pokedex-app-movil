import {Animated, Image, Pressable, StyleSheet, View} from 'react-native';
import {Pokemon} from '../../../domain/entities/pokemon';
import {Card, Text} from 'react-native-paper';
import {useAnimation} from '../../hooks/useAnimation';
import {useEffect} from 'react';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParams} from '../../navigator/StackNavigator';

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const {fadeIn, animatedTop} = useAnimation();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    fadeIn({duration: 2000});
  }, []);

  return (
    <Pressable
      style={{flex: 1}}
      onPress={() => navigation.navigate('pokemon', {pokemonId: pokemon.id})}>
      <Card
        style={[
          styles.cardContainer,
          {elevation: 20, backgroundColor: pokemon.color},
        ]}>
        <Text
          style={[styles.name, {textTransform: 'capitalize'}]}
          variant="bodyLarge"
          lineBreakMode="middle">
          {pokemon.name} {'\n#'} {pokemon.id}
        </Text>
        <View style={[styles.pokemonImage]}>
          {/*  <Animated.Image
          source={require('../../../assets/pokeball-light.png')}
          style={[styles.pokeball, {transform: [{translateY: animatedTop}]}]}
        /> */}
        </View>
        <FadeInImage
          uri={pokemon.avatar}
          style={[
            styles.pokemonImage,
            {transform: [{translateY: animatedTop}]},
          ]}
        />
        <Text style={[styles.name, {marginTop: 35}]}>{pokemon.types[0]}</Text>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  name: {
    color: 'white',
    top: 10,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -30,
    top: -10,
    opacity: 0.2,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -15,
    top: -30,
  },

  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    overflow: 'hidden',
    opacity: 0.5,
  },
});
