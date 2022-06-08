import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { GlobalStyles } from "../../../constants/GlobalStyles";
import { Button, FocusBottomSheet, StatusBar } from "../../../components";
import { COLOR, FONTS, hp, SIZES } from "../../../constants/GlobalTheme";
import { FocusLogo, TaskIcon } from "../../../../assets";
import CategoryToogler from "../../../components/Shared/CategoryToogler";
import { Foundation } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { getFocusTasks } from "../../../redux/FocusSlice";
import { db } from "../../../firebase/config";
import { formatDate } from "../../../utils";

const FocusHome = ({ navigation }) => {
  const focusTasks = useSelector((state) => state.focus.focusTasks);
  const focusBottomSheetRef = React.useRef(null);
  const userId = useSelector((state) => state.user.user.id);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const options = [
    { name: "All", length: focusTasks.length },
    {
      name: "Pending",
      length: focusTasks.filter((task) => task.currentSet !== task.timing.sets)
        .length,
    },
    {
      name: "Completed",
      length: focusTasks.filter((task) => task.currentSet === task.timing.sets)
        .length,
    },
  ];

  const filterByCategory = () => {
    if (selected === "All") {
      return focusTasks;
    }
    if (selected === "Pending") {
      return focusTasks.filter((task) => task.currentSet !== task.timing.sets);
    }
    if (selected === "Completed") {
      return focusTasks.filter((task) => task.currentSet === task.timing.sets);
    }
  };

  const getAllFocusTasks = async () => {
    const colRef = collection(db, "user", userId, "focus");
    getDocs(colRef)
      .then((snapshot) => {
        let tasks = [];
        snapshot.docs.forEach((doc) => {
          tasks.push({ ...doc.data(), id: doc.id });
        });
        console.log("fetched");
        dispatch(getFocusTasks(tasks));
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getAllFocusTasks();
  };

  React.useEffect(() => {
    getAllFocusTasks();
  }, []);

  const [selected, setSelected] = React.useState(options[1].name);
  return (
    <View style={GlobalStyles.container}>
      <StatusBar />
      <TouchableOpacity
        style={{ marginHorizontal: hp(4) }}
        onPress={() => navigation.toggleDrawer()}
      >
        <FocusLogo />
      </TouchableOpacity>

      {/* progress banner */}
      <View
        style={{
          backgroundColor: COLOR.primary,
          padding: 18,
          borderRadius: SIZES.sm,
          marginVertical: hp(3),
          marginHorizontal: hp(4),
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: FONTS.bold,
              lineHeight: 28,
              color: COLOR.white,
            }}
          >
            Here is the progress{"\n"}of your focus tasks
          </Text>
          <Image
            style={{ width: 85, height: 85 }}
            source={require("../../../../assets/Images/TaskBanner.png")}
          />
        </View>
        <View>
          <Text
            style={{ fontSize: 16, color: COLOR.white, marginBottom: hp(1) }}
          >
            <Text style={{ fontFamily: FONTS.semiBold }}>
              {Math.floor((options[2].length / options[0].length) * 100) !==
                NaN && 0}
              %
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
                  width: `${
                    Math.floor(
                      (options[2].length / options[0].length) * 100
                    ) !== NaN && 0
                  }%`,
                },
              ]}
            ></View>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: COLOR.lighGray }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 30,
            marginTop: 25,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: 20,
            }}
          >
            Focus Tasks
          </Text>
          <Button
            title="Add +"
            containerStyles={{
              width: "auto",
              height: "auto",
              paddingHorizontal: 15,
              paddingVertical: 5,
            }}
            onPress={() => focusBottomSheetRef.current.open()}
            textStyles={{ fontSize: 12 }}
          />
        </View>

        <View
          style={{
            marginHorizontal: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CategoryToogler
            options={options}
            selected={selected}
            setSelected={setSelected}
          />
        </View>

        {/* focus task list */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {loading && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator color={"#000"} />
            </View>
          )}
          {filterByCategory().length === 0 && !loading ? (
            <Text
              style={{
                fontFamily: FONTS.medium,
                marginVertical: 15,
                marginHorizontal: 30,
              }}
            >
              No {selected} Tasks
            </Text>
          ) : (
            filterByCategory().map((item, index) => (
              <View
                key={index}
                style={[
                  GlobalStyles.shadow,
                  {
                    marginHorizontal: 25,
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    marginTop: 15,
                    backgroundColor: COLOR.white,
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: FONTS.semiBold,
                    marginHorizontal: 5,
                    fontSize: 14,
                    marginBottom: 5,
                  }}
                >
                  {item?.title}
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.regular,
                    marginHorizontal: 5,
                    fontSize: 12,
                  }}
                >
                  Progress{" "}
                  {Math.floor((item?.currentSet / item?.timing?.sets) * 100)} %
                </Text>
                <View
                  style={{
                    width: "97%",
                    height: 6,
                    backgroundColor: COLOR.gray,
                    position: "relative",
                    marginHorizontal: 5,
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={[
                      {
                        position: "absolute",
                        height: 6,
                        backgroundColor: COLOR.primary,
                        width: `${Math.floor(
                          (item?.currentSet / item?.timing?.sets) * 100
                        )}%`,
                      },
                    ]}
                  ></View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: FONTS.regular,
                        marginLeft: 5,
                        fontSize: 13,
                      }}
                    >
                      Steps Done : {item?.currentSet} / {item?.timing?.sets}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS.regular,
                        marginLeft: 5,
                        fontSize: 12,
                        opacity: 0.7,
                        marginTop: 3,
                      }}
                    >
                      {formatDate(item?.date)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("focusTimer", { index: index })
                    }
                    style={{
                      backgroundColor: COLOR.primary,
                      height: 35,
                      width: 35,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 50,
                    }}
                  >
                    <Foundation name="play" size={15} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
      <FocusBottomSheet reference={focusBottomSheetRef} />
    </View>
  );
};

export default FocusHome;
