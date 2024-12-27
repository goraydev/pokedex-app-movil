import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screen/home/HomeScreen';
import {PokemonScreen} from '../screen/pokemon/PokemonScreen';
import {SearchSecondScreen} from '../screen/search/SearchSecondScreen';

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
      <Stack.Screen name="pokemon" component={PokemonScreen} />
      <Stack.Screen name="search" component={SearchSecondScreen} />
    </Stack.Navigator>
  );
};
