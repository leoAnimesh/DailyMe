import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/GlobalStyles";
import {
  StatusBar,
  WebAppsBottomSheet,
  WebViewBottomSheet,
} from "../../components";
import { COLOR, FONTS, SIZES, hp, wp } from "../../constants/GlobalTheme";
import { AppsLogo } from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import * as expoBrowser from "expo-web-browser";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import {
  deleteApp,
  deleteLink,
  getAppsandLinks,
} from "../../redux/appLinksSlice";
import { db } from "../../firebase/config";
import { AntDesign } from "@expo/vector-icons";

const WebApps = ({ navigation }) => {
  const webViewBottomSheetRef = React.useRef(null);
  const addAppsRef = React.useRef(null);
  const [mode, setMode] = React.useState("apps");
  const [activeLink, setActiveLink] = React.useState("");
  const webApps = useSelector((state) => state.apps.webApps);
  const links = useSelector((state) => state.apps.links);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.id);
  const [loading, setLoading] = React.useState(true);
  const DefaultwebApps = [
    {
      name: "ABP news",
      link: "https://bengali.abplive.com/",
    },
    { name: "Times of India", link: "https://timesofindia.indiatimes.com/" },
    {
      name: "Github",
      link: "https://github.com/",
    },
    {
      name: "Medium",
      link: "https://medium.com/",
    },
    {
      name: "Pinterest",
      link: "https://in.pinterest.com/",
    },
    { name: "Goggle meet", link: "https://meet.google.com/" },
    { name: "Zoom Meet", link: "https://zoom.us/" },
    {
      name: "JISCE",
      link: "https://jiscollege.ac.in/",
    },
  ];

  const getAllAppsAndLinks = async () => {
    let apps = [];
    let links = [];
    try {
      const appData = await getDocs(collection(db, "user", userId, "apps"));
      appData.docs.forEach((doc) => {
        apps.push({ ...doc.data(), id: doc.id });
      });
      const linkData = await getDocs(collection(db, "user", userId, "links"));
      linkData.docs.forEach((doc) => {
        links.push({ ...doc.data(), id: doc.id });
      });
      dispatch(getAppsandLinks({ apps, links }));
      setRefreshing(false);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    getAllAppsAndLinks();
  };

  const deleteLinks = (id) => {
    dispatch(deleteLink({ id: id }));
    deleteDoc(doc(db, "user", userId, "links", id))
      .then(() => {
        console.log("link deleted");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteApps = (id) => {
    dispatch(deleteApp({ id: id }));
    deleteDoc(doc(db, "user", userId, "apps", id))
      .then(() => {
        console.log("app deleted");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  React.useEffect(() => {
    webApps.length === 0 && links.length === 0 && getAllAppsAndLinks();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flex: 1, paddingTop: hp(6) }}>
        <StatusBar />
        <TouchableOpacity
          style={{ marginHorizontal: 30, marginBottom: 15 }}
          onPress={() => navigation.openDrawer()}
        >
          <AppsLogo />
        </TouchableOpacity>

        {/* progress banner */}
        <View
          style={{
            backgroundColor: COLOR.primary,
            padding: 18,
            borderRadius: SIZES.sm,
            marginBottom: hp(3),
            marginTop: 10,
            marginHorizontal: 25,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "68%" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FONTS.semiBold,
                  lineHeight: 24,
                  color: COLOR.white,
                }}
              >
                Add your favorite web apps & important links
              </Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text
                  style={{
                    backgroundColor: COLOR.lighGray,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    fontSize: 11,
                    marginRight: 10,
                    borderRadius: 5,
                    fontFamily: FONTS.regular,
                  }}
                >
                  Apps{" "}
                  <Text
                    style={{ color: COLOR.primary, fontFamily: FONTS.bold }}
                  >
                    {webApps.length}
                  </Text>
                </Text>
                <Text
                  style={{
                    backgroundColor: COLOR.lighGray,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    fontSize: 11,
                    marginRight: 10,
                    borderRadius: 5,
                  }}
                >
                  Links{" "}
                  <Text
                    style={{ color: COLOR.primary, fontFamily: FONTS.bold }}
                  >
                    {links.length}
                  </Text>
                </Text>
              </View>
            </View>
            <Image
              style={{ width: 85, height: 85 }}
              source={require("../../../assets/Images/TaskBanner.png")}
            />
          </View>
        </View>

        <View
          style={{
            marginBottom: 10,
            marginHorizontal: 30,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: FONTS.semiBold, fontSize: 18 }}>
            Web Apps
          </Text>
          <TouchableOpacity
            onPress={() => {
              setMode("apps");
              addAppsRef.current.open();
            }}
            style={{
              backgroundColor: COLOR.primary,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 5,
              paddingHorizontal: 15,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: COLOR.white, fontSize: 12 }}>Add +</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: hp(2),
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: 25,
          }}
        >
          {webApps.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                expoBrowser.openBrowserAsync(item.link);
              }}
              onLongPress={() => {
                deleteApps(item.id);
              }}
              style={[
                {
                  marginBottom: 12,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: COLOR.gray,
                  width: wp(20),
                  height: hp(8),
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginRight: 10,
                },
              ]}
            >
              <View
                style={{
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: `http://www.google.com/s2/favicons?domain=${item.link}`,
                  }}
                  style={{
                    minWidth: 20,
                    minHeight: 20,
                    marginTop: 5,
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 10,
                  marginTop: 5,
                  textAlign: "center",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 30,
            marginTop: 20,
          }}
        >
          <View
            style={{
              marginTop: hp(2),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 25,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 18,
              }}
            >
              Other Links
            </Text>
            <TouchableOpacity
              onPress={() => {
                setMode("links");
                addAppsRef.current.open();
              }}
              style={{
                backgroundColor: COLOR.primary,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: COLOR.white, fontSize: 12 }}>Add +</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {links.length === 0 && (
              <Text style={{ marginLeft: 5 }}>No links found ⚠</Text>
            )}
            {links.map((link, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                onPress={() => expoBrowser.openBrowserAsync(link.link)}
                style={[
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    backgroundColor: COLOR.white,
                    borderRadius: 10,
                    marginBottom: 15,
                  },
                  GlobalStyles.shadow,
                ]}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../../../assets/Images/link.png")}
                    style={{ width: 40, height: 40, marginRight: 10 }}
                  />
                  <View>
                    <Text style={{ fontFamily: FONTS.medium, fontSize: 13 }}>
                      {link.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS.regular,
                        fontSize: 12,
                        marginTop: 2,
                      }}
                    >
                      {link?.link.length > 30
                        ? link.link.substring(0, 25) + "..."
                        : link.link}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => deleteLinks(link.id)}
                  style={{
                    backgroundColor: COLOR.primary,
                    borderRadius: 5,
                    padding: 8,
                  }}
                >
                  <AntDesign name="delete" size={15} color="white" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <WebViewBottomSheet
          reference={webViewBottomSheetRef}
          link={activeLink}
        />
        <WebAppsBottomSheet reference={addAppsRef} mode={mode} />
      </View>
    </ScrollView>
  );
};

export default WebApps;
