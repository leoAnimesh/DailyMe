import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import {
  CategoryList,
  StatusBar,
  TaskBottomSheet,
  TaskCard,
} from "../../components";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { LogoIcon } from "../../../assets";
import { COLOR, FONTS, hp, wp } from "../../constants/GlobalTheme";
import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils";
const DashBoard = () => {
  const TaskBottomSheetRef = React.useRef(null);
  const navigation = useNavigation();
  const allTasks = useSelector((state) => state.tasks.tasks);
  const [currentTaskIndex, setCurrentTaskIndex] = React.useState(0);
  const [mode, setMode] = React.useState("add");

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
  const focusTasks = useSelector((state) => state.focus.focusTasks);

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
  return (
    <View style={[GlobalStyles.container]}>
      <StatusBar />
      <View style={{ marginHorizontal: 25, marginBottom: 20, flex: 0.6 }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <LogoIcon />
        </TouchableOpacity>
        {/* intro header  */}
        <View style={{ marginTop: 15 }}>
          <Text
            style={{ fontFamily: FONTS.medium, fontSize: 16, lineHeight: 24 }}
          >
            Hey Animesh 👋
          </Text>
        </View>

        {/* stats          */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
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
              Tasks{" "}
            </Text>
            <Image
              source={require("../../../assets/Images/TaskBanner.png")}
              style={{
                position: "absolute",
                width: 35,
                height: 35,
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
                  {Math.floor((options[2].length / options[0].length) * 100)}%
                </Text>{" "}
                Progress
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 6,
                  backgroundColor: "#D2C4C4",
                  position: "relative",
                }}
              >
                <View
                  style={[
                    {
                      position: "absolute",
                      width: "35%",
                      height: 6,
                      backgroundColor: COLOR.white,
                      width: `${Math.floor(
                        (options[2].length / options[0].length) * 100
                      )}%`,
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
              Focus{" "}
            </Text>
            <Image
              source={require("../../../assets/Images/TaskBanner.png")}
              style={{
                position: "absolute",
                width: 35,
                height: 35,
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
                <Text style={{ fontFamily: FONTS.semiBold }}>20 %</Text>{" "}
                Progress
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 6,
                  backgroundColor: "#D2C4C4",
                  position: "relative",
                }}
              >
                <View
                  style={[
                    {
                      position: "absolute",
                      width: "35%",
                      height: 6,
                      backgroundColor: COLOR.white,
                      width: `20%`,
                    },
                  ]}
                ></View>
              </View>
            </View>
          </View>
        </View>

        <Text
          style={{ fontFamily: FONTS.semiBold, fontSize: 16, marginTop: 10 }}
        >
          Focus Tasks{" "}
        </Text>
        <Text style={{ fontFamily: FONTS.regular, fontSize: 12, marginTop: 5 }}>
          Today you have to focus on the following
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {focusTasks.map((focus, index) => (
            <View
              style={[
                {
                  width: 250,
                  height: 140,
                  padding: 15,
                  marginVertical: 15,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLOR.gray,
                  position: "relative",
                  marginRight: 20,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("focusTimer", { index: 1 })}
                style={{
                  backgroundColor: COLOR.primary,
                  height: 35,
                  width: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  position: "absolute",
                  right: 15,
                  top: 15,
                  zIndex: 10,
                }}
              >
                <Foundation name="play" size={15} color="white" />
              </TouchableOpacity>
              <Text style={{ fontFamily: FONTS.semiBold }}>{focus.title}</Text>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 12,
                  marginTop: 3,
                }}
              >
                Sets Done : {focus.currentSet} / {focus.timing.sets}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 11,
                  marginTop: 3,
                  opacity: 0.5,
                }}
              >
                {formatDate(focus.date)}
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 6,
                  backgroundColor: COLOR.gray,
                  position: "relative",
                  marginVertical: 12,
                }}
              >
                <View
                  style={[
                    {
                      position: "absolute",
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
                  textAlign: "right",
                }}
              >
                Progress{" "}
                {Math.floor((focus?.currentSet / focus?.timing?.sets) * 100)} %
              </Text>
            </View>
          ))}
        </ScrollView>
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
            style={{ fontFamily: FONTS.semiBold, fontSize: 16, marginTop: 10 }}
          >
            All Tasks{" "}
          </Text>
          <Text
            style={{ fontFamily: FONTS.regular, fontSize: 12, marginTop: 5 }}
          >
            Today you have to do this tasks
          </Text>
          <CategoryList
            options={options}
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
  );
};

export default DashBoard;
