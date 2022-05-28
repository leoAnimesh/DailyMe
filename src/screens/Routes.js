import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { Onboarding, Login, SignUp, Home } from './';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      {authenticated ? (
        <React.Fragment>
          <Stack.Screen name="Home" component={Home} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </React.Fragment>
      )}
    </Stack.Navigator>
  );
};

export default Routes;
