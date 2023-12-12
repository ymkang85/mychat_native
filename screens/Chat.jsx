import React, {
  useState,
  useLayoutEffect,
  useCallback
} from 'react'
import { TouchableOpacity, View, Image } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, database } from '../config';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import colors from '../colors'
import { AntDesign } from '@expo/vector-icons'
const useImage = require("../assets/user.jpg");

const Chat = () => {

  const [message, setMessage] = useState([]);
  const navigation = useNavigation();
  const logout = () => {
    signOut(auth).then(() => console.log('로그아웃됨'))
      .catch((err) => {
        console.error(err);
      })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{
          flexDirection: 'row',
          width: '50%',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={logout}>
            <AntDesign name="logout" size={25} color={colors.gray}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <Image
            source={useImage}
            style={{
              width: 50,
              height: 50,
              marginRight: 20
            }}
          />
        </View>
      )
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const qry = query(collectionRef, orderBy('createAt', 'desc'));

  }, []);

  const onSend = useCallback((message = []) => {
    setMessage(prevMessage => GiftedChat.append(prevMessage, message));
    //setMessage([...message, ...message]); 와 같음
    const { _id, createAt, text, user } = message[0];
    //db에 저장
    addDoc(collection(database, 'chats'), {
      _id,
      createAt,
      text,
      user
    });
  }, []);

  return (
    <GiftedChat
      message={message}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={message => onSend(message)}
      messagesContainerStyle={{
        backgroundColor: '#fff'
      }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20
      }}
      user={{
        _id: auth?.currentUser?.email,  
        avatar: { useImage }
      }}
    />
  )
}

export default Chat