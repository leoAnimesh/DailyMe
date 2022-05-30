import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { WebView } from "react-native-webview";
import { StatusBar } from "../../components";
import { COLOR, hp } from "../../constants/GlobalTheme";

const WebviewScreen = ({ data }) => {
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: data.link }} />
    </View>
  );
};

const NewsSection = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Hello</Text>
    </View>
  );
};

const NewsScreen = () => {
  const [active, setActive] = React.useState("Home");
  const [activeNews, setActiveNews] = React.useState();
  const newsApps = [
    {
      name: "ABP news",
      link: "https://bengali.abplive.com/",
    },
    {
      name: "Times of India",
      link: "https://timesofindia.indiatimes.com/",
    },
  ];
  const options = {
    home: <NewsSection />,
    webView: <WebviewScreen data={activeNews} />,
  };

  return (
    <View style={{ flex: 1, paddingTop: hp(5) }}>
      <StatusBar />
      <View>
        <Text>News</Text>
      </View>
      {options[active]}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          backgroundColor: COLOR.white,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setActive("home")}
          style={{
            backgroundColor: COLOR.primary,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 5,
            marginLeft: 12,
          }}
        >
          <Text style={{ color: COLOR.white }}>News</Text>
        </TouchableOpacity>

        {newsApps.map((newsApp) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setActive("webView");
              setActiveNews(newsApp);
            }}
            style={{
              backgroundColor: COLOR.primary,
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 5,
              marginLeft: 12,
            }}
          >
            <Text style={{ color: COLOR.white }}>{newsApp.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default NewsScreen;
