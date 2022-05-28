import { View, Text, ScrollView, Image,ActivityIndicator } from 'react-native';
import React from 'react';
import styles from '../Login/LoginStyles';
import { GlobalStyles } from '../../constants/GlobalStyles';
import { StatusBar, Input, Button } from '../../components';
import { LogoIcon } from '../../../assets';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { COLOR } from '../../constants/GlobalTheme';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/userSlice';
import { auth, db } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Feather } from '@expo/vector-icons';

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Login = () => {
  const [loading,setLoading] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const LoginUser = (user) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, user.email, user.password)
    .then(async(userCredential) => {
    if(userCredential.user.uid){
      const docRef = doc(db, "user", userCredential.user.uid);
      try{
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          dispatch(setAuth({id:docSnap.id,...docSnap.data()}))
          setLoading(false);
        }else{
          navigation.navigate('SignUp');
          setLoading(false);
        }
      }catch(err){
        console.log(err.message);
        setLoading(false);
      }
    }
  })
  .catch((error) => {
    console.log(error.message);
    setLoading(false);
  });
  }

  return (
    <ScrollView>
      <View style={[GlobalStyles.container, styles.container]}>
        <StatusBar />
        {/* topbar  */}
        <View style={styles.TopBar}>
          <LogoIcon />
        </View>

        {/* Image  */}
        <View style={styles.ImgContainer}>
          <Image
            style={styles.Image}
            resizeMode={'contain'}
            source={require('../../../assets/Images/Login.png')}
          />
        </View>

        {/* signup form  */}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            LoginUser(values)
          }}
        >
          {(props) => (
            <View style={styles.form}>
              <Text style={styles.SignUpText}>Login</Text>
              <Input
                placeholder="Enter Email Address"
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                icon={
                  <AntDesign
                    name="mail"
                    size={20}
                    color="black"
                    style={styles.icon}
                  />
                }
              />
              <Text style={styles.error}>{props.errors.email}</Text>
              <Input
                placeholder="Enter Password"
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                secureTextEntry={true}
                icon={
                  <Ionicons
                    name="ios-lock-closed-outline"
                    size={20}
                    color="black"
                    style={styles.icon}
                  />
                }
              />
              <Text style={styles.error}>{props.errors.password}</Text>
              <View style={styles.footer}>
                <Button title={loading ? <ActivityIndicator color="#fff" /> : 'Login'} onPress={props.handleSubmit} />
                <View style={styles.divider}>
                  <View style={styles.firstDivider}></View>
                  <Text>OR</Text>
                  <View style={styles.secondDivider}></View>
                </View>
                <Button
                  title="Continue with Google"
                  containerStyles={{ backgroundColor: COLOR.gray }}
                  textStyles={{ color: COLOR.black }}
                  onPress={() => navigation.navigate('Home')}
                />
                <Text style={styles.bottomText}>
                  New to DailyMe. ?{' '}
                  <Text
                    style={{ color: COLOR.primary }}
                    onPress={() => navigation.navigate('SignUp')}
                  >
                    SignUp
                  </Text>{' '}
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default Login;
