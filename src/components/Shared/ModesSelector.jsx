import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLOR, FONTS } from '../../constants/GlobalTheme';

const ModesSelector = ({
  modes,
  activeMode,
  setActiveMode,
  rounded = false,
}) => {
  return (
    <View style={{ flexDirection: 'row', marginVertical: 8, flexWrap: 'wrap' }}>
      {modes.map((mode, index) => (
        <TouchableOpacity
          onPress={() => setActiveMode(mode)}
          activeOpacity={0.6}
          key={index}
          style={{
            marginRight: 10,
            backgroundColor: activeMode === mode ? COLOR.white : COLOR.primary,
            borderWidth: activeMode === mode ? 2 : 2,
            borderColor: activeMode === mode ? COLOR.primary : COLOR.white,
            paddingHorizontal: 15,
            paddingVertical: 5,
            marginBottom: 8,
            borderRadius: rounded ? 15 : 5,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: activeMode === mode ? COLOR.black : COLOR.white,
              fontFamily: FONTS.medium,
            }}
          >
            {mode}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ModesSelector;
