import {
  View,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import styles from "./TasksStyles";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { TaskIcon } from "../../../assets";
import { COLOR, FONTS, hp } from "../../constants/GlobalTheme";
import {
  CategoryList,
  StatusBar,
  TaskBottomSheet,
  TaskCard,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getTasks } from "../../redux/tasksSlice";

const Tasks = ({ navigation }) => {
  const TaskBottomSheetRef = React.useRef(null);
  const userId = useSelector((state) => state.user.user.id);
  const allTasks = useSelector((state) => state.tasks.tasks);
  const [mode, setMode] = React.useState("add");
  const [currentTaskIndex, setCurrentTaskIndex] = React.useState(0);

  const openEditSheet = (index) => {
    setMode("edit");
    setCurrentTaskIndex(index);
    TaskBottomSheetRef.current.open();
  };

  const openViewSheet = (index) => {
    setMode("view");
    setCurrentTaskIndex(index);
    TaskBottomSheetRef.current.open();
  };

  const options = [
    { name: "All", length: allTasks.length },
    {
      name: "Pending",
      length: allTasks.filter((item) => item.completed === false).length,
    },
    {
      name: "Completed",
      length: allTasks.filter((item) => item.completed === true).length,
    },
  ];

  const [selected, setSelected] = React.useState(options[1].name);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const getAllTasks = () => {
    if (!refreshing) {
      setLoading(true);
    }
    const colRef = collection(db, "user", userId, "tasks");
    getDocs(colRef)
      .then((snapshot) => {
        let tasks = [];
        snapshot.docs.forEach((doc) => {
          tasks.push({ ...doc.data(), id: doc.id });
        });
        console.log("fetched");
        dispatch(getTasks(tasks));
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getAllTasks();
  };

  const filterByCategory = () => {
    if (selected === "All") {
      return allTasks;
    }
    if (selected === "Pending") {
      return allTasks.filter((task) => task.completed === false);
    }
    if (selected === "Completed") {
      return allTasks.filter((task) => task.completed === true);
    }
  };

  React.useEffect(() => {
    if (allTasks.length === 0 || allTasks === null) {
      getAllTasks();
    }
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <StatusBar />
      <TouchableOpacity
        style={{ marginHorizontal: hp(4) }}
        onPress={() => navigation.openDrawer()}
      >
        <TaskIcon />
      </TouchableOpacity>

      {/* progress banner */}
      <View style={[styles.progressBar]}>
        <View style={styles.progressBarTop}>
          <Text style={styles.progressBarText}>
            Your Tasks are {"\n"} Going Great
          </Text>
          <Image
            style={styles.BannerImg}
            source={require("../../../assets/Images/TaskBanner.png")}
          />
        </View>
        <View>
          <Text style={styles.progressText}>
            <Text style={{ fontFamily: FONTS.semiBold }}>
              {Math.floor((options[2].length / options[0].length) * 100)} %
            </Text>{" "}
            progress
          </Text>
          <View style={styles.Bar}>
            <View
              style={[
                styles.InnerBar,
                {
                  width: `${Math.floor(
                    (options[2].length / options[0].length) * 100
                  )}%`,
                },
              ]}
            ></View>
          </View>
        </View>
      </View>

      {/* tasks section  */}
      <View style={styles.TasksContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: FONTS.medium, fontSize: 20 }}>
            All Tasks
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: COLOR.primary,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 5,
              paddingHorizontal: 15,
              borderRadius: 5,
            }}
            onPress={() => {
              setMode("add");
              TaskBottomSheetRef.current.open();
            }}
          >
            <Text style={{ color: COLOR.white, fontSize: 12 }}>Add +</Text>
          </TouchableOpacity>
        </View>
        <CategoryList
          options={options}
          selected={selected}
          setSelected={setSelected}
        />
        {loading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator color={"#000"} />
          </View>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filterByCategory().length === 0 && !loading ? (
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
  );
};

export default Tasks;
