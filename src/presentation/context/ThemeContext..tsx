import {createContext, PropsWithChildren, useEffect, useState} from 'react';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  adaptNavigationTheme,
  PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import {NavigationTheme} from 'react-native-paper/lib/typescript/types';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

type ThemeContextType = {
  isDark: boolean;
  theme: NavigationTheme;
  setValueTheme: (isDarkTheme: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  theme: LightTheme,
  setValueTheme: () => {},
});

export const ThemeContextProvider = ({children}: PropsWithChildren) => {
  const [isDarkTheme, setValueTheme] = useState(false);
  const colorScheme = useColorScheme();
  useEffect(() => {
    if (colorScheme === 'light') {
      setValueTheme(false);
    } else {
      setValueTheme(true);
    }
  }, [colorScheme]);

  //setValueTheme(colorScheme === 'dark');
  const theme = {
    ...(isDarkTheme ? MD3DarkTheme : MD3LightTheme),

    ...((isDarkTheme ? DarkTheme : LightTheme) as any),

    fonts: {
      displaySmall: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400',
        fontSize: 20,
      },

      displayMedium: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400',
        fontSize: 24,
      },

      bodyLarge: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400',
        fontSize: 16,
      },

      bodyMedium: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400',
        fontSize: 14,
      },

      bodySmall: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400',
        fontSize: 12,
      },

      labelLarge: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '500',
        fontSize: 14,
      },

      labelMedium: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400',
        fontSize: 12,
      },

      labelSmall: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400',
        fontSize: 10,
      },

      regular: {fontFamily: 'Nunito-Regular', fontWeight: '400'},

      medium: {fontFamily: 'Nunito-Medium', fontWeight: '500'},

      bold: {fontFamily: 'Nunito-Bold', fontWeight: '700'},

      heavy: {fontFamily: 'Nunito-Heavy', fontWeight: '900'},
    },
  };

  useEffect(() => {}, [colorScheme]);

  return (
    <PaperProvider theme={isDarkTheme ? MD3DarkTheme : MD3LightTheme}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider
          value={{
            isDark: isDarkTheme,
            theme: theme,
            setValueTheme: setValueTheme,
          }}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
