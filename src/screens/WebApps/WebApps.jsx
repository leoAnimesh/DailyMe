import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constants/GlobalStyles';
import {
  StatusBar,
  WebAppsBottomSheet,
  WebViewBottomSheet,
} from '../../components';
import { COLOR, FONTS, hp, wp } from '../../constants/GlobalTheme';
import { AppsLogo } from '../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import * as expoBrowser from 'expo-web-browser';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import {
  deleteApp,
  deleteLink,
  getAppsandLinks,
} from '../../redux/appLinksSlice';
import { db } from '../../firebase/config';

const WebApps = () => {
  const webViewBottomSheetRef = React.useRef(null);
  const addAppsRef = React.useRef(null);
  const [mode, setMode] = React.useState('apps');
  const [activeLink, setActiveLink] = React.useState('');
  const webApps = useSelector((state) => state.apps.webApps);
  const links = useSelector((state) => state.apps.links);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.id);

  const onRefresh = async () => {
    let apps = [];
    let links = [];
    setRefreshing(true);
    try {
      const appData = await getDocs(collection(db, 'user', userId, 'apps'));
      appData.docs.forEach((doc) => {
        apps.push({ ...doc.data(), id: doc.id });
      });
      const linkData = await getDocs(collection(db, 'user', userId, 'links'));
      linkData.docs.forEach((doc) => {
        links.push({ ...doc.data(), id: doc.id });
      });
      dispatch(getAppsandLinks({ apps, links }));
      setRefreshing(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteLinks = (id) => {
    dispatch(deleteLink({ id: id }));
    deleteDoc(doc(db, 'user', userId, 'links', id))
      .then(() => {
        console.log('link deleted');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteApps = (id) => {
    dispatch(deleteApp({ id: id }));
    deleteDoc(doc(db, 'user', userId, 'apps', id))
      .then(() => {
        console.log('app deleted');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flex: 1, paddingTop: hp(6) }}>
        <StatusBar />
        <View style={{ marginHorizontal: 30, marginBottom: 15 }}>
          <AppsLogo />
        </View>

        <View
          style={{
            marginTop: hp(2),
            marginBottom: 10,
            marginHorizontal: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontFamily: FONTS.semiBold, fontSize: 18 }}>
            Web Apps
          </Text>
          <TouchableOpacity
            onPress={() => {
              setMode('apps');
              addAppsRef.current.open();
            }}
            style={{
              backgroundColor: COLOR.primary,
              justifyContent: 'center',
              alignItems: 'center',
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
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: 25,
          }}
        >
          {webApps.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setActiveLink(item.link);
                webViewBottomSheetRef.current.open();
              }}
              onLongPress={() => {
                deleteApps(item.id);
              }}
              style={[
                {
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  marginBottom: 10,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: COLOR.gray,
                  marginRight: 5,
                },
              ]}
            >
              <View
                style={{
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
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
                  textAlign: 'center',
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
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
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
                setMode('links');
                addAppsRef.current.open();
              }}
              style={{
                backgroundColor: COLOR.primary,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: COLOR.white, fontSize: 12 }}>Add +</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {links.map((link, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                onPress={() => expoBrowser.openBrowserAsync(link.link)}
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    backgroundColor: COLOR.white,
                    borderRadius: 10,
                    marginBottom: 15,
                  },
                  GlobalStyles.shadow,
                ]}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../../../assets/Images/link.png')}
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
                        ? link.link.substring(0, 25) + '...'
                        : link.link}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => deleteLinks(link.id)}
                  style={{
                    backgroundColor: COLOR.primary,
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      color: COLOR.white,
                      fontSize: 12,
                      fontFamily: FONTS.semiBold,
                    }}
                  >
                    Delete
                  </Text>
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
