import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { GlobalStyles } from "../../../constants/GlobalStyles";
import { Button, StatusBar } from "../../../components";
import LottieView from "lottie-react-native";
import { COLOR, FONTS, hp, wp } from "../../../constants/GlobalTheme";
import { LogoIcon } from "../../../../assets";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { IncreaseStep } from "../../../redux/FocusSlice";

const mintuesToMilisec = (min) => min * 1000 * 60;
const formatTime = (time) => (time <= 9 ? `0${time}` : time);

const FocusTimer = ({ navigation, route }) => {
  // const { id, focus, time, sets } = route.params;
  const data = useSelector((state) => state.focus.focusTasks[0]);
  const [millis, setMillis] = useState(mintuesToMilisec(1));
  const [paused, setPaused] = useState(false);
  const [showAnime, setShowAnime] = useState(true);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;
  const interval = React.useRef("null");
  const dispatch = useDispatch();

  const Countdown = () => {
    setMillis((time) => {
      if (time === 0) {
        dispatch(IncreaseStep({ id: 1 }));
        navigation.navigate("focusSuccess");
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    if (paused) {
      return;
    }
    interval.current = setInterval(Countdown, 1000);
    return () => clearInterval(interval.current);
  }, [paused]);
  return (
    <View style={GlobalStyles.container}>
      <StatusBar />
      <View style={{ alignItems: "center", paddingVertical: 15 }}>
        <LogoIcon />
      </View>
      <View
        style={{
          flex: 0.6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: FONTS.semiBold, fontSize: 24 }}>
          Focus Task title
        </Text>
        <Text
          style={{ fontFamily: FONTS.medium, fontSize: hp(8) }}
        >{`${formatTime(minute)} : ${formatTime(second)}`}</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: COLOR.gray,
            backgroundColor: COLOR.lighGray,
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text>25 min</Text>
        </View>
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        {paused ? (
          <LottieView
            source={require("../../../../assets/Lottie/confused.json")}
            autoPlay
            loop
          />
        ) : (
          <LottieView
            source={require("../../../../assets/Lottie/meditation2.json")}
            autoPlay
            loop
          />
        )}
      </View>

      <View
        style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
      >
        {paused === true ? (
          <TouchableOpacity
            onPress={() => setPaused(false)}
            style={{
              backgroundColor: COLOR.primary,
              width: 60,
              height: 60,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="play" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setPaused(true)}
            style={{
              backgroundColor: COLOR.primary,
              width: 60,
              height: 60,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="pause" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FocusTimer;
