import { StyleSheet } from 'react-native';
import { COLOR, FONTS, hp, SIZES, wp } from '../../constants/GlobalTheme';

const styles = StyleSheet.create({
  container: {
    width: wp(85),
    alignSelf: 'center',
  },
  TopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  LoginBtnText: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLOR.primary,
  },
  header: {
    marginVertical: hp(6),
  },
  headerText: {
    fontSize: SIZES.heading,
    fontFamily: FONTS.bold,
    lineHeight: 35,
  },
  ImgContainer: {
    flex: 1,
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: hp(5),
  },
  InfoText: {
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: FONTS.regular,
    fontSize: 14,
    marginVertical: hp(5),
  },
});

export default styles;
