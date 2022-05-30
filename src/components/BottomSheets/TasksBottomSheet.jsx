import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import * as Notifications from "expo-notifications";
import React from "react";
import { COLOR, FONTS, hp } from "../../constants/GlobalTheme";
import RBSheet from "react-native-raw-bottom-sheet";
import Button from "../Shared/Button";
import ModesSelector from "../Shared/ModesSelector";
import { Formik } from "formik";
import Input from "../Shared/Input";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { addTask, updateTask } from "../../redux/tasksSlice";
import * as Linking from "expo-linking";

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

const Meeting = ({ bottomsheet, data }) => {
  const dispatch = useDispatch();
  const MeetingApps = ["Zoom", "Google Meet", "Other"];
  const [activeMeetingApp, setActiveMeetingApp] = React.useState(
    data?.meetingApp || ""
  );
  const user = useSelector((state) => state.user.user);

  const [date, setDate] = React.useState(
    data === null
      ? new Date(Date.now())
      : new Date(data?.date["seconds"] * 1000)
  );
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [notify, setNotify] = React.useState(data?.notify || false);

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
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const addingTask = async (values) => {
    if (activeMeetingApp) {
      setLoading(true);
      const { title, description, link } = values;
      const task = {
        type: "meeting",
        title,
        description,
        link,
        notify,
        date: date > Date.now() ? date : "",
        meetingApp: activeMeetingApp,
        completed: false,
      };
      const TasksDocRef = collection(db, "user", user.id, "tasks");
      addDoc(TasksDocRef, {
        ...task,
        createdAt: serverTimestamp(),
      })
        .then(async (document) => {
          const docRef = doc(db, "user", user.id, "tasks", document.id);
          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              dispatch(addTask({ id: document.id, ...docSnap.data() }));
              setNotfication(date, title, description);
              setLoading(false);
              bottomsheet.current.close();
            }
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const updatingTask = (values, id) => {
    setLoading(true);
    const { title, description, link } = values;
    const task = {
      type: "meeting",
      title,
      description,
      link,
      notify,
      date: date > Date.now() ? date : "",
      meetingApp: activeMeetingApp,
      completed: false,
    };
    const TasksDocRef = doc(db, "user", user.id, "tasks", id);
    setDoc(TasksDocRef, {
      ...task,
      updatedAt: serverTimestamp(),
    })
      .then(async () => {
        const docRef = doc(db, "user", user.id, "tasks", id);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            dispatch(updateTask({ id, data: docSnap.data() }));
            setNotfication(date, title, description);
            setLoading(false);
            bottomsheet.current.close();
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
    <View>
      <Text
        style={{ fontFamily: FONTS.medium, fontSize: 16, marginVertical: 5 }}
      >
        Apps
      </Text>
      <ModesSelector
        modes={MeetingApps}
        activeMode={activeMeetingApp}
        setActiveMode={setActiveMeetingApp}
      />
      <View>
        <Formik
          initialValues={{
            title: data?.title || "",
            description: data?.description || "",
            link: data?.link || "",
          }}
          onSubmit={(values) => {
            if (data === null) {
              addingTask(values);
            } else {
              updatingTask(values, data?.id);
            }
          }}
        >
          {(props) => (
            <View>
              <Text
                style={{
                  marginVertical: 8,
                  fontFamily: FONTS.regular,
                }}
              >{`Add ${activeMeetingApp} Link`}</Text>
              <Input
                placeholder="eg: www.link/id.com"
                onChangeText={props.handleChange("link")}
                value={props.values.link}
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
                value={moment(date).format("MMMM Do YYYY, h:mm a")}
                editable={false}
                RightButton={
                  <View
                    style={{
                      flexDirection: "row",
                      position: "absolute",
                      right: 0,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="clock"
                      size={23}
                      color={"#aaa"}
                      style={{ marginRight: 8 }}
                      onPress={showTimepicker}
                    />
                    <MaterialIcons
                      name="date-range"
                      size={23}
                      color={"#aaa"}
                      style={{ marginRight: 8 }}
                      onPress={showDatepicker}
                    />
                  </View>
                }
              />
              <Text
                style={{
                  marginVertical: 8,
                  fontFamily: FONTS.regular,
                }}
              >
                Add Title
              </Text>
              <Input
                placeholder="eg: Meeting with John"
                onChangeText={props.handleChange("title")}
                value={props.values.title}
              />
              <Text
                style={{
                  marginVertical: 8,
                  fontFamily: FONTS.regular,
                }}
              >
                Add Description
              </Text>
              <Input
                multiline={true}
                placeholder="eg: Meeting with John"
                onChangeText={props.handleChange("description")}
                value={props.values.description}
                InputStyles={{ textAlignVertical: "top" }}
                numberOfLines={5}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>Notify </Text>
                <Switch
                  trackColor={{ false: "#767577", true: COLOR.primary }}
                  thumbColor={notify ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setNotify(!notify)}
                  value={notify}
                />
              </View>
              <Button
                containerStyles={{ marginVertical: hp(2) }}
                title={
                  loading ? (
                    <ActivityIndicator color={"#fff"} />
                  ) : data !== null ? (
                    "Edit Meeting"
                  ) : (
                    "Add Meeting"
                  )
                }
                onPress={props.handleSubmit}
              />
            </View>
          )}
        </Formik>
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
    </View>
  );
};

const Task = ({ bottomsheet, data }) => {
  const category = [
    "Studying",
    "Cooking",
    "Shopping",
    "Coding",
    "Reading",
    "Exercise",
    "Other",
  ];
  const [activeCategory, setActiveCategory] = React.useState(
    data?.category || ""
  );
  const [date, setDate] = React.useState(
    data === null
      ? new Date(Date.now())
      : new Date(data?.date["seconds"] * 1000)
  );
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);
  const [notify, setNotify] = React.useState(data?.notify || false);
  const [loading, setLoading] = React.useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

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
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const addingTask = async (values) => {
    if (activeCategory) {
      setLoading(true);
      const { title, description } = values;
      const task = {
        type: "normal",
        title,
        description,
        category: activeCategory,
        date: date > Date.now() ? date : "",
        notify,
        completed: false,
      };
      const TasksDocRef = collection(db, "user", user.id, "tasks");
      try {
        addDoc(TasksDocRef, {
          ...task,
          createdAt: serverTimestamp(),
        }).then(async (document) => {
          const docRef = doc(db, "user", user.id, "tasks", document.id);
          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              dispatch(addTask({ id: document.id, ...docSnap.data() }));
              setNotfication(date, title, description);
              setLoading(false);
              bottomsheet.current.close();
            }
          } catch (err) {
            console.log(err.message);
          }
        });
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          marginVertical: 8,
          fontFamily: FONTS.regular,
        }}
      >
        Categories
      </Text>
      <ModesSelector
        modes={category}
        activeMode={activeCategory}
        setActiveMode={setActiveCategory}
      />
      <Formik
        initialValues={{
          title: data?.title || "",
          description: data?.description || "",
        }}
        onSubmit={(values) => {
          addingTask(values);
        }}
      >
        {(props) => (
          <View>
            <Text
              style={{
                marginVertical: 8,
                fontFamily: FONTS.regular,
              }}
            >
              Set DeadLine
            </Text>
            <Input
              placeholder="eg: Meeting with John"
              value={moment(date).format("MMMM Do YYYY, h:mm a")}
              editable={false}
              RightButton={
                <View
                  style={{
                    flexDirection: "row",
                    position: "absolute",
                    right: 0,
                  }}
                >
                  <MaterialCommunityIcons
                    name="clock"
                    size={23}
                    color={"#aaa"}
                    style={{ marginRight: 8 }}
                    onPress={showTimepicker}
                  />
                  <MaterialIcons
                    name="date-range"
                    size={23}
                    color={"#aaa"}
                    style={{ marginRight: 8 }}
                    onPress={showDatepicker}
                  />
                </View>
              }
            />
            <Text
              style={{
                marginVertical: 8,
                fontFamily: FONTS.regular,
              }}
            >
              Add Title
            </Text>
            <Input
              placeholder="eg: Meeting with John"
              onChangeText={props.handleChange("title")}
              value={props.values.title}
            />
            <Text
              style={{
                marginVertical: 8,
                fontFamily: FONTS.regular,
              }}
            >
              Add Description
            </Text>
            <Input
              multiline={true}
              placeholder="eg: Meeting with John"
              onChangeText={props.handleChange("description")}
              value={props.values.description}
              InputStyles={{ textAlignVertical: "top" }}
              numberOfLines={5}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Notify </Text>
              <Switch
                trackColor={{ false: "#767577", true: COLOR.primary }}
                thumbColor={notify ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setNotify(!notify)}
                value={notify}
              />
            </View>
            <Button
              containerStyles={{ marginVertical: hp(2) }}
              title={
                loading ? (
                  <ActivityIndicator color={"#fff"} />
                ) : data !== null ? (
                  "Edit Task"
                ) : (
                  "Add Task"
                )
              }
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const AddTasks = ({ reference, mode, currentTaskIndex }) => {
  const modes = ["Meeting", "Task"];
  const [activeMode, setActiveMode] = React.useState(modes[0]);
  const task = useSelector((state) => state.tasks.tasks[currentTaskIndex]);

  const Modes = {
    Meeting: (
      <Meeting bottomsheet={reference} data={mode === "edit" ? task : null} />
    ),
    Task: <Task bottomsheet={reference} data={mode === "edit" ? task : null} />,
  };

  return (
    <RBSheet
      ref={reference}
      height={hp(98)}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: hp(100), flex: 1 }}>
          {mode !== "view" && (
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: 20 }}>
              {mode !== "edit"
                ? "Add Task"
                : task.type === "normal"
                ? "Edit Task"
                : "Edit Meeting"}
            </Text>
          )}
          {mode !== "edit" && mode !== "view" ? (
            <React.Fragment>
              <Text style={{ fontFamily: FONTS.medium, marginTop: 10 }}>
                Mode
              </Text>
              <ModesSelector
                modes={modes}
                activeMode={activeMode}
                setActiveMode={setActiveMode}
              />
            </React.Fragment>
          ) : null}
          {mode !== "edit" && mode !== "view" ? Modes[activeMode] : null}
          {mode === "edit"
            ? task.type === "normal"
              ? Modes["Task"]
              : Modes["Meeting"]
            : null}

          {mode === "view" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: FONTS.semiBold, fontSize: 20 }}>
                  {task?.type === "normal" ? "Task Details" : "Meeting Details"}
                </Text>
                <View
                  style={{
                    backgroundColor: COLOR.primary,
                    paddingVertical: 3,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{ color: COLOR.white, fontFamily: FONTS.regular }}
                  >
                    {task?.type === "normal"
                      ? task?.category
                      : task?.meetingApp}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {mode === "view" && (
            <View
              style={{
                marginTop: hp(2),
                backgroundColor: "#F9F9F9",
                paddingHorizontal: 15,
                height: hp(100),
                borderRadius: 10,
              }}
            >
              <Text style={{ fontFamily: FONTS.regular, marginTop: 10 }}>
                <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
                  Date & Time
                </Text>{" "}
                :{" "}
                {task?.date
                  ? moment(task?.date["seconds"] * 1000).format(
                      "MMMM Do YYYY, h:mm a"
                    )
                  : "No Date"}
              </Text>
              <Text style={{ fontFamily: FONTS.regular, marginTop: 10 }}>
                <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15 }}>
                  Title
                </Text>{" "}
                : {task?.title}
              </Text>
              {task?.link && (
                <React.Fragment>
                  <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      fontSize: 15,
                      marginTop: 10,
                    }}
                  >
                    {task?.meetingApp} Link :
                  </Text>
                  <TouchableOpacity onPress={() => Linking.openURL(task?.link)}>
                    <Text
                      style={{
                        fontFamily: FONTS.regular,
                        marginTop: 10,
                        color: COLOR.primary,
                      }}
                    >
                      {task?.link}
                    </Text>
                  </TouchableOpacity>
                </React.Fragment>
              )}
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: 15,
                  marginTop: 10,
                }}
              >
                Description :
              </Text>
              <Text style={{ fontFamily: FONTS.regular, marginTop: 10 }}>
                {task?.description}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </RBSheet>
  );
};

export default AddTasks;
