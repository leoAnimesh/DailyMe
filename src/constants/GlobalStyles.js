import { StyleSheet } from 'react-native';
import { COLOR, hp } from './GlobalTheme';

export const GlobalStyles = StyleSheet.create({
  container: {
    paddingTop: hp(6),
    flex: 1,
  },
  shadow: {
    shadowColor: COLOR.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
});
