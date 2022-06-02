import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../../constants/GlobalStyles';
import { Button, StatusBar } from '../../../components';
import LottieView from 'lottie-react-native';
import { COLOR, FONTS, hp, wp } from '../../../constants/GlobalTheme';
import { LogoIcon } from '../../../../assets';
import { FontAwesome } from '@expo/vector-icons';

const FocusTimer = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      <StatusBar />
      <View style={{ alignItems: 'center', paddingVertical: 15 }}>
        <LogoIcon />
      </View>
      <View
        style={{
          flex: 0.6,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontFamily: FONTS.semiBold, fontSize: 24 }}>
          Focus Task title
        </Text>
        <Text style={{ fontFamily: FONTS.medium, fontSize: hp(8) }}>10:00</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: COLOR.gray,
            backgroundColor: COLOR.lighGray,
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text>25 min</Text>
        </View>
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <LottieView
          source={require('../../../../assets/Lottie/meditation2.json')}
          autoPlay
          loop
        />
      </View>

      <View
        style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('focusSuccess')}
          style={{
            backgroundColor: COLOR.primary,
            width: 60,
            height: 60,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesome name="pause" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FocusTimer;
