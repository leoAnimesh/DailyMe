import { StyleSheet } from 'react-native';
import { COLOR, FONTS, hp, SIZES, wp } from '../../constants/GlobalTheme';

const styles = StyleSheet.create({
  progressBar: {
    backgroundColor: COLOR.primary,
    padding: 18,
    borderRadius: SIZES.sm,
    marginVertical: hp(3),
    marginHorizontal: hp(4),
  },
  progressBarTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBarText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    lineHeight: 28,
    color: COLOR.white,
  },
  BannerImg: {
    width: 85,
    height: 85,
  },
  Bar: {
    width: '100%',
    height: 6,
    backgroundColor: '#D2C4C4',
    position: 'relative',
  },
  InnerBar: {
    position: 'absolute',
    width: '35%',
    height: 6,
    backgroundColor: COLOR.white,
  },
  progressText: {
    fontSize: 16,
    color: COLOR.white,
    marginBottom: hp(1),
  },
  TasksContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: hp(4),
    paddingTop: 20,
  },
});

export default styles;
