import { View, Text,TouchableOpacity } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constants/GlobalStyles';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { StatusBar } from '../../components';

const Home = () => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(clearUser());
    }).catch((error) => {
      console.log(error.message);
    });
  }
  return (
    <View style={GlobalStyles.container}>
      <StatusBar/>
      <Text>Home</Text>
      <TouchableOpacity onPress={handleSignOut} >
        <Text>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
