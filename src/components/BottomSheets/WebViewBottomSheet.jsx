import { View } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import RBSheet from 'react-native-raw-bottom-sheet';
import { hp } from '../../constants/GlobalTheme';

const WebViewBottomSheet = ({ reference, link }) => {
  return (
    <RBSheet
      ref={reference}
      height={hp(100)}
      openDuration={300}
      closeDuration={300}
    >
      <View style={{ flex: 1 }}>
        <WebView source={{ uri: link }} />
      </View>
    </RBSheet>
  );
};

export default WebViewBottomSheet;
