import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../../constants/GlobalStyles';
import { Button, StatusBar } from '../../../components';
import { COLOR, FONTS, hp, SIZES } from '../../../constants/GlobalTheme';
import { FocusLogo, TaskIcon } from '../../../../assets';
import CategoryToogler from '../../../components/Shared/CategoryToogler';
import { Foundation } from '@expo/vector-icons';
import moment from 'moment';

const FocusHome = ({ navigation }) => {
  const options = [
    { name: 'All', length: 0 },
    {
      name: 'Pending',
      length: 0,
    },
    {
      name: 'Completed',
      length: 0,
    },
  ];
  const [selected, setSelected] = React.useState(options[1].name);
  return (
    <View style={GlobalStyles.container}>
      <StatusBar />
      <View style={{ marginHorizontal: hp(4) }}>
        <FocusLogo />
      </View>

      {/* progress banner */}
      <View
        style={{
          backgroundColor: COLOR.primary,
          padding: 18,
          borderRadius: SIZES.sm,
          marginVertical: hp(3),
          marginHorizontal: hp(4),
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: FONTS.bold,
              lineHeight: 28,
              color: COLOR.white,
            }}
          >
            Here is the progress{'\n'}of your focus tasks
          </Text>
          <Image
            style={{ width: 85, height: 85 }}
            source={require('../../../../assets/Images/TaskBanner.png')}
          />
        </View>
        <View>
          <Text
            style={{ fontSize: 16, color: COLOR.white, marginBottom: hp(1) }}
          >
            <Text style={{ fontFamily: FONTS.semiBold }}>10 %</Text>
            progress
          </Text>
          <View
            style={{
              width: '100%',
              height: 6,
              backgroundColor: '#D2C4C4',
              position: 'relative',
            }}
          >
            <View
              style={[
                {
                  position: 'absolute',
                  width: '35%',
                  height: 6,
                  backgroundColor: COLOR.white,
                  width: '10%',
                },
              ]}
            ></View>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: COLOR.lighGray }}>
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: 20,
            paddingHorizontal: 30,
            marginTop: 20,
          }}
        >
          Focus Tasks
        </Text>

        <View
          style={{
            marginHorizontal: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <CategoryToogler
            options={options}
            selected={selected}
            setSelected={setSelected}
          />
          <Button
            title="Add +"
            containerStyles={{
              width: 'auto',
              height: 'auto',
              paddingHorizontal: 10,
              paddingVertical: 3,
              marginTop: 15,
            }}
            textStyles={{ fontSize: 12 }}
          />
        </View>

        {/* focus task list */}
        <ScrollView>
          <View
            style={[
              GlobalStyles.shadow,
              {
                marginHorizontal: 25,
                paddingVertical: 15,
                paddingHorizontal: 15,
                borderRadius: 10,
                marginTop: 15,
                backgroundColor: COLOR.white,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                marginHorizontal: 5,
                fontSize: 14,
                marginBottom: 5,
              }}
            >
              Focus task title
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                marginHorizontal: 5,
                fontSize: 12,
              }}
            >
              Progress 30%
            </Text>
            <View
              style={{
                width: '97%',
                height: 6,
                backgroundColor: COLOR.primary,
                position: 'relative',
                marginHorizontal: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={[
                  {
                    position: 'absolute',
                    height: 6,
                    backgroundColor: COLOR.gray,
                    width: `${30}%`,
                  },
                ]}
              ></View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: FONTS.regular,
                    marginLeft: 5,
                    fontSize: 13,
                  }}
                >
                  Steps Done : 1 / 3
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.regular,
                    marginLeft: 5,
                    fontSize: 12,
                    opacity: 0.7,
                    marginTop: 3,
                  }}
                >
                  {moment(new Date()).format('MMMM Do YYYY, h:mm a')}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('focusTimer')}
                style={{
                  backgroundColor: COLOR.primary,
                  height: 35,
                  width: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                }}
              >
                <Foundation name="play" size={15} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default FocusHome;
