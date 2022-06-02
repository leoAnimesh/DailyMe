import { View, Text } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../../constants/GlobalStyles';
import LottieView from 'lottie-react-native';

const FocusSuccess = () => {
  return (
    <View style={GlobalStyles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>FocusSuccess</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LottieView
          source={require('../../../../assets/Lottie/success.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

export default FocusSuccess;
