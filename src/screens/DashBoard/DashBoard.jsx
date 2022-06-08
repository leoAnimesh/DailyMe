import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import {
  CategoryList,
  StatusBar,
  TaskBottomSheet,
  TaskCard,
} from '../../components';
import { GlobalStyles } from '../../constants/GlobalStyles';
import { LogoIcon } from '../../../assets';
import { COLOR, FONTS, hp, wp } from '../../constants/GlobalTheme';
import { Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../utils';
import { getTasks } from '../../redux/tasksSlice';
import { getFocusTasks } from '../../redux/FocusSlice';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import LottieView from 'lottie-react-native';
import { date } from 'yup';

const DashBoard = () => {
  const TaskBottomSheetRef = React.useRef(null);
  const navigation = useNavigation();
  const allTasks = useSelector((state) => state.tasks.tasks);
  const [currentTaskIndex, setCurrentTaskIndex] = React.useState(0);
  const [mode, setMode] = React.useState('add');
  const [loading, setLoading] = React.useState(false);
  const user = useSelector((state) => state.user.user);
  const focusTasks = useSelector((state) => state.focus.focusTasks);

  const tasksOptions = [
    { name: 'All', length: allTasks.length },
    {
      name: 'Pending',
      length: allTasks.filter((item) => item?.completed === false).length,
    },
    {
      name: 'Completed',
      length: allTasks.filter((item) => item?.completed === true).length,
    },
  ];

  const focusOptions = [
    { name: 'All', length: focusTasks.length },
    {
      name: 'Pending',
      length: focusTasks.filter(
        (task) => task?.currentSet !== task?.timing?.sets
      ).length,
    },
    {
      name: 'Completed',
      length: focusTasks.filter(
        (task) => task?.currentSet === task?.timing?.sets
      ).length,
    },
  ];

  const [selected, setSelected] = React.useState(tasksOptions[0].name);

  const openEditSheet = (index) => {
    setMode('edit');
    setCurrentTaskIndex(index);
    TaskBottomSheetRef.current.open();
  };

  const openViewSheet = (index) => {
    setMode('view');
    setCurrentTaskIndex(index);
    TaskBottomSheetRef.current.open();
  };

  const filterByCategory = () => {
    if (selected === 'All') {
      return allTasks;
    }
    if (selected === 'Pending') {
      return allTasks.filter((task) => task.completed === false);
    }
    if (selected === 'Completed') {
      return allTasks.filter((task) => task.completed === true);
    }
  };

  const dispatch = useDispatch();

  const getData = async () => {
    let tasks = [];
    let focus = [];
    setLoading(true);
    try {
      const focusData = await getDocs(collection(db, 'user', user.id, 'focus'));
      focusData.docs.forEach((doc) => {
        focus.push({ ...doc.data(), id: doc.id });
      });
      dispatch(getFocusTasks(focus));
      const tasksData = await getDocs(collection(db, 'user', user.id, 'tasks'));
      tasksData.docs.forEach((doc) => {
        tasks.push({ ...doc.data(), id: doc.id });
      });
      dispatch(getTasks(tasks));
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  React.useEffect(() => {
    if (allTasks.length === 0 && focusTasks.length === 0) {
      getData();
    }
  }, []);

  return (
    <View style={[GlobalStyles.container]}>
      <StatusBar />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <LottieView
            source={require('../../../assets/Lottie/loading.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 25, marginBottom: 20, flex: 0.6 }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <LogoIcon />
            </TouchableOpacity>
            {/* intro header  */}
            <View style={{ marginTop: 15 }}>
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  fontSize: 16,
                  lineHeight: 24,
                }}
              >
                Hey {user.name.split(' ')[0]} 👋
              </Text>
            </View>

            {/* stats */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: COLOR.primary,
                  padding: 20,
                  borderRadius: 10,
                  width: wp(42),
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.semiBold,
                    color: COLOR.white,
                    marginBottom: 10,
                    fontSize: 16,
                  }}
                >
                  Tasks{' '}
                </Text>
                <Image
                  source={require('../../../assets/Images/TaskBanner.png')}
                  style={{
                    position: 'absolute',
                    width: 40,
                    height: 40,
                    right: 15,
                    top: 15,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOR.white,
                      marginBottom: hp(1),
                    }}
                  >
                    <Text style={{ fontFamily: FONTS.semiBold }}>
                      {' '}
                      {allTasks.length === 0
                        ? 0
                        : Math.floor(
                            (tasksOptions[2].length / tasksOptions[0].length) *
                              100
                          ) === NaN
                        ? 0
                        : Math.floor(
                            (tasksOptions[2].length / tasksOptions[0].length) *
                              100
                          )}{' '}
                      %
                    </Text>{' '}
                    Progress
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
                          width: `${
                            allTasks.length === 0
                              ? 0
                              : Math.floor(
                                  (tasksOptions[2].length /
                                    tasksOptions[0].length) *
                                    100
                                ) === NaN
                              ? 0
                              : Math.floor(
                                  (tasksOptions[2].length /
                                    tasksOptions[0].length) *
                                    100
                                )
                          }%`,
                        },
                      ]}
                    ></View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: COLOR.primary,
                  padding: 20,
                  borderRadius: 10,
                  width: wp(42),
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: FONTS.semiBold,
                    color: COLOR.white,
                    marginBottom: 10,
                  }}
                >
                  Focus{' '}
                </Text>
                <Image
                  source={require('../../../assets/Images/FocusBanner.png')}
                  style={{
                    position: 'absolute',
                    width: 40,
                    height: 40,
                    right: 15,
                    top: 15,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOR.white,
                      marginBottom: hp(1),
                    }}
                  >
                    <Text style={{ fontFamily: FONTS.semiBold }}>
                      {' '}
                      {focusTasks.length === 0
                        ? 0
                        : Math.floor(
                            (focusOptions[2].length / focusOptions[0].length) *
                              100
                          ) === NaN
                        ? 0
                        : Math.floor(
                            (focusOptions[2].length / focusOptions[0].length) *
                              100
                          )}{' '}
                      %
                    </Text>{' '}
                    Progress
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
                          width: `${
                            focusTasks.length === 0
                              ? 0
                              : Math.floor(
                                  (focusOptions[2].length /
                                    focusOptions[0].length) *
                                    100
                                ) === NaN
                              ? 0
                              : Math.floor(
                                  (focusOptions[2].length /
                                    focusOptions[0].length) *
                                    100
                                )
                          }%`,
                        },
                      ]}
                    ></View>
                  </View>
                </View>
              </View>
            </View>

            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 16,
                marginTop: 10,
              }}
            >
              Focus Tasks{' '}
            </Text>
            {focusTasks.length !== 0 && (
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                Today you have to focus on the following
              </Text>
            )}
            {focusTasks.length === 0 ? (
              <Text style={{ marginVertical: 10, fontSize: 13 }}>
                No Focus task found ⛔{' '}
              </Text>
            ) : (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {focusTasks
                  .filter((item) => item?.currentSet !== item?.timing?.sets)
                  .map((focus, index) => (
                    <View
                      key={index}
                      style={[
                        {
                          width: 250,
                          height: 140,
                          padding: 15,
                          marginVertical: 15,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: COLOR.gray,
                          position: 'relative',
                          marginRight: 20,
                        },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('focusTimer', { index: 1 })
                        }
                        style={{
                          backgroundColor: COLOR.primary,
                          height: 35,
                          width: 35,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 50,
                          position: 'absolute',
                          right: 15,
                          top: 15,
                          zIndex: 10,
                        }}
                      >
                        <Foundation name="play" size={15} color="white" />
                      </TouchableOpacity>
                      <Text style={{ fontFamily: FONTS.semiBold }}>
                        {focus?.title}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FONTS.regular,
                          fontSize: 12,
                          marginTop: 3,
                        }}
                      >
                        Sets Done : {focus?.currentSet} / {focus?.timing?.sets}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FONTS.regular,
                          fontSize: 11,
                          marginTop: 3,
                          opacity: 0.5,
                        }}
                      >
                        {formatDate(focus?.date)}
                      </Text>
                      <View
                        style={{
                          width: '100%',
                          height: 6,
                          backgroundColor: COLOR.gray,
                          position: 'relative',
                          marginVertical: 12,
                        }}
                      >
                        <View
                          style={[
                            {
                              position: 'absolute',
                              height: 6,
                              backgroundColor: COLOR.primary,
                              width: `${Math.floor(
                                (focus?.currentSet / focus?.timing?.sets) * 100
                              )}%`,
                            },
                          ]}
                        ></View>
                      </View>
                      <Text
                        style={{
                          fontFamily: FONTS.regular,
                          fontSize: 12,
                          textAlign: 'right',
                        }}
                      >
                        Progress{' '}
                        {Math.floor(
                          (focus?.currentSet / focus?.timing?.sets) * 100
                        )}{' '}
                        %
                      </Text>
                    </View>
                  ))}
              </ScrollView>
            )}
          </View>
          <View
            style={{
              flex: 0.5,
              backgroundColor: COLOR.lighGray,
              paddingHorizontal: 25,
            }}
          >
            <View style={{ paddingHorizontal: 5 }}>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                All Tasks{' '}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                Today you have to do this tasks
              </Text>
              <CategoryList
                options={tasksOptions}
                selected={selected}
                setSelected={setSelected}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {filterByCategory().length === 0 ? (
                <Text style={{ fontFamily: FONTS.medium, marginVertical: 15 }}>
                  No {selected} Tasks
                </Text>
              ) : (
                filterByCategory().map((item, index) => (
                  <TaskCard
                    key={index}
                    data={item}
                    openEditSheet={() => openEditSheet(index)}
                    openViewSheet={() => openViewSheet(index)}
                  />
                ))
              )}
            </ScrollView>
          </View>
          <TaskBottomSheet
            reference={TaskBottomSheetRef}
            mode={mode}
            currentTaskIndex={currentTaskIndex}
          />
        </View>
      )}
    </View>
  );
};

export default DashBoard;
