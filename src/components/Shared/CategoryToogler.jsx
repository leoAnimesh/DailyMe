import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLOR, FONTS, hp } from '../../constants/GlobalTheme';

const CategoryToogler = ({ options, selected, setSelected }) => {
  return (
    <View
      style={{
        marginVertical: 10,
        marginTop: hp(3),
        flexDirection: 'row',
      }}
    >
      {options.map((option, index) => (
        <TouchableOpacity
          style={{ flexDirection: 'row', marginRight: 20 }}
          key={index}
          onPress={() => setSelected(option.name)}
        >
          <Text style={{ fontFamily: FONTS.medium, marginRight: 5 }}>
            {option.name}
          </Text>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor:
                selected === option.name ? COLOR.primary : COLOR.gray,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: selected === option.name ? COLOR.white : COLOR.black,
              }}
            >
              {option.length}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryToogler;
