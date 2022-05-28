import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer'
import { COLOR, hp } from '../../constants/GlobalTheme'
import { useDispatch } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { clearUser } from '../../redux/userSlice'
const CustomDrawer = ({...props}) => {
    const dispatch = useDispatch();
    const handleSignOut = () => {
      signOut(auth).then(() => {
        dispatch(clearUser());
      }).catch((error) => {
        console.log(error.message);
      });
    }
  return (
      <View style={styles.container}>
        <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:COLOR.primary}} >
            <View style={styles.header}>
                <Text>Animesh Mondal</Text>
                <Text>mondalarup808@gmail.com</Text>
            </View>
            <View style={{backgroundColor:'#fff'}}>
        <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
        <Text>SignOut</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        backgroundColor:COLOR.primary,
        height:hp(20),
        paddingHorizontal:10,
    }
})
export default CustomDrawer