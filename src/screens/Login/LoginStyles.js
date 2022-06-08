import { StyleSheet } from 'react-native';
import { COLOR, FONTS, hp, SIZES, wp } from '../../constants/GlobalTheme';

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
    flex: 0.6,
  },
  Image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  form: {
    flex: 1,
    marginBottom: hp(2),
  },
  SignUpText: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    marginBottom: 20,
  },
  icon: {
    marginRight: SIZES.sm,
  },
  footer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  bottomText: {
    textAlign: 'center',
    fontFamily: FONTS.regular,
  },
  divider: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  firstDivider: {
    borderWidth: 1,
    width: wp(38),
    borderColor: COLOR.gray,
  },
  secondDivider: {
    borderWidth: 1,
    width: wp(38),
    borderColor: COLOR.gray,
  },
  error: {
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
});

export default styles;
