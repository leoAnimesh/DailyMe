import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from './SignUpStyles';
import { GlobalStyles } from '../../constants/GlobalStyles';
import { StatusBar, Input, Button } from '../../components';
import { LogoIcon } from '../../../assets';
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLOR } from '../../constants/GlobalTheme';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { auth,db } from '../../firebase/config';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc,doc, Timestamp} from 'firebase/firestore'
import {useDispatch} from 'react-redux';
import {setAuth} from '../../redux/userSlice';

const signUpSchema = yup.object({
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const SignUp = () => {
  const [loading,setLoading] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const signUpUser = (user) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth,user.email,user.password)
    .then((credentials)=>{
      if(credentials){
        const userDocRef = doc(db,'user',credentials.user.uid) 
        setDoc(userDocRef,{
          name : user.name,
          email : user.email,
          createdAt : Timestamp.now(),
        }).then(()=>{
          dispatch(setAuth({id: credentials.user.uid,name:user.name,email:user.email}))
          setLoading(false)
        }).catch((err)=>{
          console.log(err.message);
        })
      }
    }).catch((err)=>{
      if(err.code === 'auth/email-already-in-use'){
        navigation.navigate('Login');
        setLoading(false);
      }
      console.log(err.message);
    })
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
            source={require('../../../assets/Images/signUp.png')}
          />
        </View>

        {/* signup form  */}
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={signUpSchema}
          onSubmit={(values, actions) => {
            signUpUser(values);
            actions.resetForm();
          }}
        >
          {(props) => (
            <View style={styles.form}>
              <Text style={styles.SignUpText}>Sign Up</Text>
              <Input
                placeholder="Enter Full Name"
                keyboardType="default"
                onChangeText={props.handleChange('name')}
                value={props.values.name}
                icon={
                  <FontAwesome
                    name="user-o"
                    size={20}
                    color="black"
                    style={styles.icon}
                  />
                }
              />
              <Text style={styles.error}>{props.errors.name}</Text>
              <Input
                placeholder="Enter Email Address"
                keyboardType="email-address"
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
                secureTextEntry={true}
                onChangeText={props.handleChange('password')}
                value={props.values.password}
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
                <Text style={styles.DeclarationText}>
                  By Signing up you are agreeing our{' '}
                  <Text style={{ color: COLOR.primary }}>
                    terms and conditions
                  </Text>{' '}
                  and{' '}
                  <Text style={{ color: COLOR.primary }}>privacy policy</Text>
                </Text>
                <Button title={loading ? <ActivityIndicator color="#fff" /> : 'Continue'} onPress={props.handleSubmit} />
                <Text style={styles.bottomText}>
                  Already have an account ?{' '}
                  <Text
                    style={{ color: COLOR.primary }}
                    onPress={() => navigation.navigate('Login')}
                  >
                    Login
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

export default SignUp;
