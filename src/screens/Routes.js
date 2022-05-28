import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Onboarding, Login } from './';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={Login} />
    </Stack.Navigator>
  );
};

export default Routes;
