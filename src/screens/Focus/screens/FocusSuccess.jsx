import { View, Text } from "react-native";
import React from "react";
import { GlobalStyles } from "../../../constants/GlobalStyles";
import LottieView from "lottie-react-native";
import { COLOR, FONTS, hp } from "../../../constants/GlobalTheme";
import { Button, StatusBar } from "../../../components";
import { LogoIcon } from "../../../../assets";
import { useSelector } from "react-redux";

const FocusSuccess = ({ navigation }) => {
  const data = useSelector((state) => state.focus.focusTasks[0]);
  return (
    <View style={GlobalStyles.container}>
      <StatusBar />
      <View style={{ alignItems: "center", paddingVertical: 20 }}>
        <LogoIcon />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <LottieView
          source={require("../../../../assets/Lottie/success.json")}
          autoPlay
          loop
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: hp(5),
        }}
      >
        <Text
          style={{ fontSize: 24, fontFamily: FONTS.semiBold, marginBottom: 15 }}
        >
          Success
        </Text>
        <View
          style={{
            backgroundColor: COLOR.lighGray,
            borderColor: COLOR.gray,
            borderWidth: 1,
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontFamily: FONTS.medium }}>
            {data.currentSet} / {data.sets}
          </Text>
        </View>
        <Text
          style={{
            textAlign: "center",
            lineHeight: 25,
            width: "70%",
            fontFamily: FONTS.regular,
            marginTop: 15,
          }}
        >
          Congrats you have focused for 25 min straight See you after a 5 min
          break
        </Text>
        <Button
          onPress={() => navigation.navigate("focusHome")}
          title="Take a Break"
          containerStyles={{
            width: "40%",
            marginVertical: 25,
            borderRadius: 30,
          }}
        />
      </View>
    </View>
  );
};

export default FocusSuccess;
