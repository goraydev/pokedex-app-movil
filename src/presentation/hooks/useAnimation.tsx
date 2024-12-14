import {useRef, useState} from 'react';
import {Animated, Easing, PanResponder} from 'react-native';

export const useAnimation = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedTop = useRef(new Animated.Value(-100)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const [valueShowHide, setValueShowHide] = useState(false);

  const fadeIn = ({duration = 500, toValue = 1}) => {
    Animated.timing(animatedTop, {
      toValue: toValue,
      duration: duration,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedOpacity, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = ({duration = 500, toValue = 0}) => {
    Animated.timing(animatedTop, {
      toValue: -100,
      duration: 700,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedOpacity, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const showHide = () => {
    Animated.timing(animatedTop, {
      toValue: valueShowHide ? -100 : 0,
      duration: 700,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedOpacity, {
      toValue: valueShowHide ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setValueShowHide(!valueShowHide);
    });
  };

  const startMovingPosition = ({
    initialPosition = 0,
    duration = 700,
    toValue = 0,
  }) => {
    animatedTop.setValue(initialPosition);
    Animated.timing(animatedTop, {
      toValue,
      duration,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ],
      {
        useNativeDriver: false,
      },
    ),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: {x: 0, y: 0},
        useNativeDriver: true,
      }).start(() => console.log('moviendo objeto'));
    },
  });

  return {
    //propierties
    pan,
    animatedOpacity,
    animatedTop,

    //methosds
    panResponder,
    fadeIn,
    fadeOut,
    showHide,
    startMovingPosition,
  };
};
