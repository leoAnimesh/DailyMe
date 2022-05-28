import { StyleSheet } from 'react-native';
import { FONTS, hp, SIZES, wp } from '../../constants/GlobalTheme';

const styles = StyleSheet.create({
  container: {
    width: wp(85),
    alignSelf: 'center',
    height: hp(100),
  },
  TopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ImgContainer: {
    flex: 0.5,
    marginVertical: hp(2),
  },
  Image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  form: {
    flex: 1,
  },
  SignUpText: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    marginBottom: SIZES.sm,
  },
  icon: {
    marginRight: SIZES.sm,
  },
  footer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  DeclarationText: {
    fontFamily: FONTS.regular,
    lineHeight: 25,
  },
  bottomText: {
    textAlign: 'center',
    fontFamily: FONTS.regular,
  },
  error: {
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
});

export default styles;
