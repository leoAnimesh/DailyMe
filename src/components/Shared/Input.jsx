import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { COLOR, FONTS, hp, SIZES } from '../../constants/GlobalTheme';

const Input = ({
  placeholder = 'Enter the input',
  icon,
  InputStyles,
  RightButton,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {icon}
      <TextInput
        style={[styles.Input, { ...InputStyles }]}
        placeholder={placeholder}
        {...props}
      />
      {RightButton}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLOR.gray,
    padding: 8,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  Input: {
    width: '100%',
    fontFamily: FONTS.regular,
  },
});

export default Input;
