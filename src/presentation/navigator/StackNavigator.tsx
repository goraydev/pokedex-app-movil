import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screen/home/HomeScreen';
import {SearchScreen} from '../screen/search/SearchScreen';
import {PokemonScreen} from '../screen/pokemon/PokemonScreen';

export type RootStackParams = {
  home: undefined;
  search: undefined;
  pokemon: {pokemonId: number};
};

export const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  );
};
