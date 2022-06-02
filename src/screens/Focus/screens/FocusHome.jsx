import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { GlobalStyles } from "../../../constants/GlobalStyles";
import { Button, StatusBar } from "../../../components";
import { COLOR, FONTS, hp, SIZES } from "../../../constants/GlobalTheme";
import { FocusLogo, TaskIcon } from "../../../../assets";
import CategoryToogler from "../../../components/Shared/CategoryToogler";
import { Foundation } from "@expo/vector-icons";
import moment from "moment";
import { useSelector } from "react-redux";

const FocusHome = ({ navigation }) => {
  const focusTasks = useSelector((state) => state.focus.focusTasks);
  const options = [
    { name: "All", length: 0 },
    {
      name: "Pending",
      length: 0,
    },
    {
      name: "Completed",
      length: 0,
    },
  ];
  const [selected, setSelected] = React.useState(options[1].name);
  return (
    <View style={GlobalStyles.container}>
      <StatusBar />
      <View style={{ marginHorizontal: hp(4) }}>
        <FocusLogo />
      </View>

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
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
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
        <ScrollView>
          {focusTasks.map((item) => (
            <View
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
                {item?.task}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  marginHorizontal: 5,
                  fontSize: 12,
                }}
              >
                Progress {Math.floor((item.currentSet / item.sets) * 100)} %
              </Text>
              <View
                style={{
                  width: "97%",
                  height: 6,
                  backgroundColor: COLOR.primary,
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
                      backgroundColor: COLOR.gray,
                      width: `${Math.floor(
                        (item.currentSet / item.sets) * 100
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
                    Steps Done : {item.currentSet} / {item.sets}
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
                    {moment(new Date()).format("MMMM Do YYYY, h:mm a")}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("focusTimer")}
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
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default FocusHome;
