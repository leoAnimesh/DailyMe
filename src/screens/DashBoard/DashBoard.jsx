import { View, Text } from 'react-native';
import React from 'react';
import { StatusBar } from '../../components';
import { GlobalStyles } from '../../constants/GlobalStyles';

const DashBoard = () => {
  return (
    <View style={GlobalStyles.container}>
      <StatusBar />
      <Text>DashBoard</Text>
    </View>
  );
};

export default DashBoard;
