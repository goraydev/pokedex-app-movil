import {useContext, useState} from 'react';
import {View} from 'react-native';
import {Switch, Text} from 'react-native-paper';
import {ThemeContext} from '../context/ThemeContext.';

export const SwitchLightDark = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const {setValueTheme} = useContext(ThemeContext);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    isSwitchOn ? setValueTheme(false) : setValueTheme(true);
  };
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}>
      <View>
        <Text>Light/Dark</Text>
      </View>
      <View>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
    </View>
  );
};
