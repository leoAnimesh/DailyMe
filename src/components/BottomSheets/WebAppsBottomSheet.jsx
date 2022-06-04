import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { FONTS, hp } from '../../constants/GlobalTheme';
import Input from '../Shared/Input';
import Button from '../Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AddLinks, AddWebApps } from '../../redux/appLinksSlice';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase/config';

const WebAppsBottomSheet = ({ reference, mode }) => {
  const [loading, setLoading] = React.useState(false);
  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const addingApporLink = async () => {
    setLoading(true);
    const TasksDocRef = collection(db, 'user', user.id, mode);
    addDoc(TasksDocRef, {
      link,
      name,
      createdAt: serverTimestamp(),
    })
      .then(async (document) => {
        const docRef = doc(db, 'user', user.id, mode, document.id);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            if (mode === 'apps') {
              dispatch(AddWebApps({ id: document.id, ...docSnap.data() }));
            } else if (mode === 'links') {
              dispatch(AddLinks({ id: document.id, ...docSnap.data() }));
            }
            setLoading(false);
            setLink('');
            setName('');
            reference.current.close();
          }
        } catch (err) {
          console.log(err.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <RBSheet
      ref={reference}
      height={hp(38)}
      openDuration={300}
      closeDuration={300}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        },
      }}
    >
      <View>
        <Text style={{ fontFamily: FONTS.semiBold, fontSize: 16 }}>
          {mode === 'apps' ? 'Add Webapp' : 'Add Links'}
        </Text>
        <Text style={{ marginVertical: 10 }}>Enter the title</Text>
        <Input
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
          placeholder={`eg : ${
            mode === 'apps' ? 'Facebook' : 'Todays meeting'
          }`}
        />
        <Text style={{ marginVertical: 10 }}>Enter the link </Text>
        <Input
          value={link}
          onChangeText={(text) => {
            setLink(text);
          }}
          placeholder="eg : https://example.com "
        />
        <Button
          containerStyles={{ marginVertical: 15 }}
          onPress={addingApporLink}
          title={
            loading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              `Add ${mode === 'apps' ? 'WebApp' : 'Link'}`
            )
          }
        />
      </View>
    </RBSheet>
  );
};

export default WebAppsBottomSheet;
