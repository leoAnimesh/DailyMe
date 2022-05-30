import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLOR, FONTS, wp } from '../../constants/GlobalTheme';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckIcon } from '../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../utils';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { taskCompleted, deleteTask } from '../../redux/tasksSlice';
const TasksCard = ({ data, openEditSheet, openViewSheet }) => {
  const userId = useSelector((state) => state.user.user.id);
  const dispatch = useDispatch();

  const markAsComplete = (id) => {
    if (
      data?.date['seconds'] * 1000 < Date.now() &&
      data?.completed === false
    ) {
      dispatch(taskCompleted({ id: id, completed: true }));
      const docRef = doc(db, 'user', userId, 'tasks', id);
      updateDoc(docRef, { completed: true }).then(() => {
        console.log('Task completed');
      });
    }
    return;
  };

  const deletingTask = (id) => {
    dispatch(deleteTask({ id: id }));
    deleteDoc(doc(db, 'user', userId, 'tasks', id))
      .then(() => {
        console.log('task deleted');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <View
      style={{
        padding: 12,
        backgroundColor: COLOR.white,
        borderRadius: 10,
        shadowColor: COLOR.gray,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        elevation: 5,
        marginTop: 15,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        {data.meetingApp === 'Zoom' ? (
          <Image
            source={require('../../../assets/Images/zoom.png')}
            style={{ width: 35, height: 35, marginRight: 20 }}
          />
        ) : null}
        {data.meetingApp === 'Google Meet' ? (
          <Image
            source={require('../../../assets/Images/meet.png')}
            style={{ width: 40, height: 40, marginRight: 15 }}
          />
        ) : null}
        {data.meetingApp === 'other' ? (
          <Image
            source={require('../../../assets/Images/web-link.png')}
            style={{ width: 40, height: 40, marginRight: 15 }}
          />
        ) : null}
        <View>
          <Text
            style={{
              fontSize: 13,
              fontFamily: FONTS.semiBold,
              marginBottom: 3,
              textDecorationLine: data?.completed ? 'line-through' : 'none',
            }}
          >
            {data?.title}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontFamily: FONTS.regular,
              marginBottom: 10,
              textDecorationLine: data?.completed ? 'line-through' : 'none',
              width: wp(65),

              lineHeight: 18,
            }}
          >
            {data?.description}
          </Text>
        </View>
        {data.completed === true && (
          <MaterialIcons
            style={{ position: 'absolute', right: 35, top: 5 }}
            name="delete"
            size={23}
            color="black"
            onPress={() => deletingTask(data.id)}
          />
        )}
        <TouchableOpacity
          onPress={() => markAsComplete(data.id)}
          style={{
            width: 20,
            height: 20,
            backgroundColor: COLOR.primary,
            borderRadius: 20,
            position: 'absolute',
            right: 8,
            top: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {data?.completed ? (
            <CheckIcon />
          ) : (
            <View
              style={{
                width: 15,
                height: 15,
                position: 'absolute',
                backgroundColor: COLOR.white,
                borderRadius: 20,
              }}
            ></View>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderWidth: 0.5,
          width: '98%',
          alignSelf: 'center',
          borderColor: COLOR.gray,
        }}
      ></View>

      <View
        style={{ marginTop: 13, flexDirection: 'row', alignItems: 'center' }}
      >
        <MaterialIcons name="date-range" size={15} color="black" />
        <Text
          style={{
            marginLeft: 8,
            opacity: 0.4,
            fontSize: 12,
            fontFamily: FONTS.regular,
          }}
        >
          {formatDate(data?.date)}
        </Text>
        <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLOR.primary,
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 5,
            }}
            onPress={openViewSheet}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 12,
                color: COLOR.white,
              }}
            >
              View
            </Text>
          </TouchableOpacity>
          {data.completed !== true && (
            <TouchableOpacity
              onPress={openEditSheet}
              style={{
                backgroundColor: COLOR.primary,
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 5,
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 12,
                  color: COLOR.white,
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default TasksCard;
