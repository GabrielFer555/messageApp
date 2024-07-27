import React, { useContext, useEffect, useRef, useState } from 'react'
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View, PlatformConstants, StatusBar, FlatList } from 'react-native'
import { Appbar, Button, IconButton, Text, TextInput } from 'react-native-paper'
import MiAppbar from '../Vanilla/miAppbar'
import { useHeaderHeight } from "@react-navigation/elements";
import { Constants, NativeConstants, PlatformManifest } from 'expo-constants';
import { useRoute } from '@react-navigation/native';
import { addDoc, collection, doc, DocumentData, Firestore, getDocs, getFirestore, onSnapshot, orderBy, Query, query, setDoc, Timestamp, where } from 'firebase/firestore';
import app, { firestore } from '../../configs/Firebase';
import { userContext } from '../../contexts/UserContext';
import UserMessageComponent from './messagesComponents/UserMessageComponent';

interface IMessage {

}


const ChatMessage = ({ route, navigation }) => {
  const [message, setMessage] = useState<string>('')
  const { userName, userTo } = route.params
  const { user } = useContext(userContext)
  const messageRef = collection(firestore, '/messages');
  const [messages, setMessages] = useState<any>([])

  const screenBottomRef = useRef<null | View>(null)
  


  useEffect(() => {
    // Construct the Firestore query
    const unsubscribe = () => {
      onSnapshot(queryMsg, (messages) => {
        const messageBox = []

        messages.forEach(message => {
          messageBox.push({
            ...message.data(),
            key: message.id
          })
        })

        messageBox.map((a) => { console.log(a) })
        setMessages(messageBox)
      })
    }
    return () => unsubscribe()

    // Clean up the subscription when the component unmounts

  }, []);

  const MessageButton = (props) => {
    const isMessageEmpty = message.trim() !== ''
    const styleButton = StyleSheet.create({
      backgroundColor: {
        backgroundColor: isMessageEmpty ? '#2980b9' : '#bdc3c7'
      }
    })

    return (
      <View style={[styleButton.backgroundColor, { alignItems: 'center', justifyContent: 'center' }]}>
        {isMessageEmpty ? <IconButton
          icon="chat-outline"
          size={40}
          iconColor='white'
          onPress={props.onPress}
        /> : <IconButton
          icon="format-annotation-plus"
          disabled={true}
          size={40}
          onPress={props.onPress} />}
      </View>
    )
  }

  /* const loadMessages = async () => {
     const messages:Query = query(messageRef, where("userId", "in", [userId, userTo]), where("userTo", "in", [userId, userTo]))
     const resultQueries = await getDocs(query)
     console.log(resultQueries)
   }*/

  const queryMsg: Query = query(messageRef, where("userId", "in", [user.uid, userTo]), where("userTo", "in", [user.uid, userTo]), orderBy("messageDate", "asc"))




  const handleSendMessageEvent = async () => {
    const dateSent = new Date()

      const messageCreation = setDoc(doc(firestore, 'messages', new Date().toString()),{
        message:message,
        viewed:false,
        favorite:false,
        messageDate: new Timestamp(dateSent.getSeconds(), dateSent.getMilliseconds() * 100000),
        photoUrl: '',
        userId: user.uid,
        userTo: userTo,
        wasItRead: false
      })
    } catch (err) {
      console.error(err)
    }

  }


  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#2c2c54' }} behavior='padding'>
      <View>
        <Appbar.Header>
          <MiAppbar text={userName} />
        </Appbar.Header>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 6}}>
          <FlatList data={messages}
          keyExtractor={message => message.key}
          renderItem={({item}) => <UserMessageComponent message={item.message} viewed={item.viewed} timestamp={new Date()} isReceived={item.userTo == user.uid}/>}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.inputContainer}>
        <TextInput value={message} onChangeText={valueTyped => setMessage(valueTyped)} style={styles.input} textBreakStrategy='balanced' />
        <MessageButton style={{ flex: 1 }} onPress={() => handleSendMessageEvent()} />
      </View>
    </KeyboardAvoidingView>

  )

}
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
    overflow: "hidden",
    borderTopWidth: 1
  },

  input: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center'
  },
});


export default ChatMessage


