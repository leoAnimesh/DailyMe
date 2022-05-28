import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { COLOR, FONTS, SIZES, wp } from '../../constants/GlobalTheme';

const Button = ({
  title = 'Button',
  containerStyles,
  textStyles,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { ...containerStyles }]}
      {...props}
    >
      <Text style={[styles.btnText, { ...textStyles }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    borderRadius: SIZES.xs,
  },
  btnText: {
    color: COLOR.white,
    fontFamily: FONTS.semiBold,
  },
});

export default Button;
