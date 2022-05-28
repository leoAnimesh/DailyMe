import { StatusBar } from 'react-native';
import React from 'react';

const RNstatusBar = ({ ...props }) => {
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content', true);
  return <StatusBar backgroundColor={'transparent'} {...props} />;
};

export default RNstatusBar;
