import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { COLOR, FONTS, hp, SIZES } from '../../constants/GlobalTheme';

const Input = ({ placeholder = 'Enter the input', icon, ...props }) => {
  return (
    <View style={styles.container}>
      {icon}
      <TextInput style={styles.Input} placeholder={placeholder} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLOR.gray,
    padding: SIZES.sm,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(0.8),
  },
  Input: {
    width: '100%',
    fontFamily: FONTS.regular,
  },
});

export default Input;
