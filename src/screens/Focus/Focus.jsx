import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FocusHome from './screens/FocusHome';
import FocusTimer from './screens/FocusTimer';
import FocusSuccess from './screens/FocusSuccess';

const Stack = createNativeStackNavigator();

const Focus = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="focusHome" component={FocusHome} />
      <Stack.Screen name="focusTimer" component={FocusTimer} />
      <Stack.Screen name="focusSuccess" component={FocusSuccess} />
    </Stack.Navigator>
  );
};

export default Focus;
