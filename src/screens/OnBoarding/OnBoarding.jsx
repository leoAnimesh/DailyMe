import { View, Text, Image } from 'react-native';
import React from 'react';
import { LogoIcon } from '../../../assets';
import { Button, StatusBar } from '../../components';
import { GlobalStyles } from '../../constants/GlobalStyles';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './OnBoardingStyles';
import { COLOR } from '../../constants/GlobalTheme';

const OnBoarding = () => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, GlobalStyles.container]}>
      <StatusBar />
      {/* topbar  */}
      <View style={styles.TopBar}>
        <LogoIcon />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.LoginBtnText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* header  */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Manage Your Daily Activities with {'\n'}{' '}
          <Text style={{ color: COLOR.primary }}>DailyMe.</Text>
        </Text>
      </View>

      {/* Image  */}
      <View style={styles.ImgContainer}>
        <Image
          resizeMode="contain"
          resizeMethod="auto"
          style={styles.Image}
          source={require('../../../assets/Images/onBoarding.png')}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.InfoText}>
          As the name says , Daily me provides every necessary tools to help you
          out in daily life.
        </Text>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  );
};

export default OnBoarding;
