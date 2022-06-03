import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FONTS, hp, COLOR } from '../../constants/GlobalTheme';
import { Formik } from 'formik';
import Input from '../Shared/Input';
import moment from 'moment';
import {
  MaterialCommunityIcons,
  MaterialIcons,
} from 'react-native-vector-icons';
import Button from '../Shared/Button';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase/config';
import * as Notifications from 'expo-notifications';
import { AddFocusTask } from '../../redux/FocusSlice';

const setNotfication = (date, title, body) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: {
      date: date,
    },
  });
};

const FocusBottomSheet = ({ reference }) => {
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState(new Date(Date.now()));
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [notify, setNotify] = React.useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const timing = [
    {
      hour: 1,
      sets: 2,
    },
    {
      hour: 2,
      sets: 4,
    },
    {
      hour: 3,
      sets: 6,
    },
    {
      hour: 4,
      sets: 8,
    },
  ];
  const [activeTiming, setActiveTiming] = React.useState(timing[1]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const addingFocusTask = async () => {
    setLoading(true);
    const task = {
      title,
      date,
      timing: activeTiming,
      notify,
      currentSet: 0,
    };
    const focusTasksDocRef = collection(db, 'user', user.id, 'focus');
    addDoc(focusTasksDocRef, {
      ...task,
      createdAt: serverTimestamp(),
    })
      .then(async (document) => {
        const docRef = doc(db, 'user', user.id, 'focus', document.id);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            dispatch(AddFocusTask({ id: document.id, ...docSnap.data() }));
            if (notify) {
              setNotfication(
                date,
                'Lets Focus on',
                `${title} for ${activeTiming.hour} hour`
              );
            }
            setLoading(false);
            reference.current.close();
          }
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <RBSheet
      ref={reference}
      height={hp(60)}
      openDuration={250}
      closeDuration={250}
      customStyles={{
        container: {
          padding: hp(3),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Text
        style={{ marginVertical: 15, fontFamily: FONTS.semiBold, fontSize: 20 }}
      >
        Add Focus Task
      </Text>
      <View>
        <View>
          <Text
            style={{
              marginVertical: 8,
              fontFamily: FONTS.regular,
            }}
          >
            Add Focus Task
          </Text>
          <Input
            placeholder="eg : Coding,Studying"
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <Text
            style={{
              marginVertical: 8,
              fontFamily: FONTS.regular,
            }}
          >
            Set Date & Time
          </Text>
          <Input
            placeholder="eg: Meeting with John"
            value={moment(date).format('MMMM Do YYYY, h:mm a')}
            editable={false}
            RightButton={
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  right: 0,
                }}
              >
                <MaterialCommunityIcons
                  name="clock"
                  size={23}
                  color={'#aaa'}
                  style={{ marginRight: 8 }}
                  onPress={showTimepicker}
                />
                <MaterialIcons
                  name="date-range"
                  size={23}
                  color={'#aaa'}
                  style={{ marginRight: 8 }}
                  onPress={showDatepicker}
                />
              </View>
            }
          />
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            {timing.map((item, index) => (
              <TouchableOpacity
                onPress={() => setActiveTiming(item)}
                key={index}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderWidth: activeTiming.hour === item.hour ? 2 : 1,
                  borderRadius: 5,
                  marginRight: 15,
                  borderColor:
                    activeTiming.hour === item.hour
                      ? COLOR.primary
                      : COLOR.gray,
                }}
              >
                <Text>{item.hour}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Text>Notify </Text>
            <Switch
              trackColor={{ false: '#767577', true: COLOR.primary }}
              thumbColor={notify ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setNotify(!notify)}
              value={notify}
            />
          </View>
          <Button
            containerStyles={{ marginVertical: hp(2) }}
            title={
              loading ? <ActivityIndicator color={'#FFF'} /> : "Let's Focus"
            }
            onPress={addingFocusTask}
          />
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          onChange={onChange}
        />
      )}
    </RBSheet>
  );
};

export default FocusBottomSheet;
