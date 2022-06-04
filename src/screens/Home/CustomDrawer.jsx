import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { COLOR, FONTS, hp } from '../../constants/GlobalTheme';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { clearUser } from '../../redux/userSlice';
import { AntDesign } from '@expo/vector-icons';

const CustomDrawer = ({ ...props }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearUser());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: COLOR.primary }}
      >
        <View
          style={[
            styles.header,
            {
              justifyContent: 'space-evenly',
              paddingBottom: 15,
              paddingLeft: 20,
            },
          ]}
        >
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: COLOR.white,
              borderRadius: 50,
              overflow: 'hidden',
              borderWidth: 5,
              borderColor: COLOR.lighGray,
            }}
          >
            <Image
              style={{ width: '100%', height: '100%' }}
              source={{ uri: `https://robohash.org/${user.email}?set=set2` }}
            />
          </View>
          <View>
            <Text style={{ fontFamily: FONTS.medium, color: COLOR.white }}>
              {user.name}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                color: COLOR.white,
                fontSize: 12,
              }}
            >
              {user.email}
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: '#fff' }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 25, left: 30 }}
        onPress={() => handleSignOut()}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: FONTS.medium }}>SignOut </Text>
          <AntDesign
            name="logout"
            size={15}
            style={{ marginLeft: 5, color: 'red' }}
            color="black"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: COLOR.primary,
    height: hp(20),
    paddingHorizontal: 10,
  },
});
export default CustomDrawer;
