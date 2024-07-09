import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View, PlatformConstants, StatusBar } from 'react-native'
import { Appbar, Button, IconButton, Text, TextInput } from 'react-native-paper'
import MiAppbar from '../Vanilla/miAppbar'
import { useHeaderHeight } from "@react-navigation/elements";
import { Constants, NativeConstants, PlatformManifest } from 'expo-constants';
import { useRoute } from '@react-navigation/native';
import { collection, doc, Firestore, getDocs, getFirestore, onSnapshot, Query, query, setDoc, Timestamp, where } from 'firebase/firestore';
import app, { firestore } from '../../configs/Firebase';
import { userContext } from '../../contexts/UserContext';
import UserMessageComponent from './messagesComponents/UserMessageComponent';


const ChatMessage = ({ route, navigation }) => {
  const [message, setMessage] = useState<string>('')
  const { userName, userTo } = route.params
  const {user} = useContext(userContext)
  const headerHeight = useHeaderHeight();
  const messageRef = collection(firestore, '/messages');
  const [messagesSend, setMessagesSend] = useState([])


  useEffect(() => {

    
  }, [])

  /*onSnapshot(messageRef, (messages) => {
    messages.docs.map(msg => {
      console.log(msg.data())
    })
  })*/

 /* const loadMessages = async () => {
    const messages:Query = query(messageRef, where("userId", "in", [userId, userTo]), where("userTo", "in", [userId, userTo]))
    const resultQueries = await getDocs(query)
    console.log(resultQueries)
  }*/

  const MessageButton = (props) => {
    const isMessageEmpty = message.trim() !== ''
    const styleButton = StyleSheet.create({
      backgroundColor: {
        backgroundColor: isMessageEmpty ? 'blue' : 'white'
      }
    })

    return (
      <View style={[styleButton.backgroundColor, { alignItems:'center', justifyContent:'center'}]}>
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

  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      flex: 1,
      overflow:"hidden"
    },
    input: {
      flex: 1,
      marginRight: 10,
    },
  });

  const handleSendMessageEvent = () => {
    const dateSent = new Date()

      const messageCreation = setDoc(doc(firestore, 'messages', new Date().toString()),{
        message:message,
        viewed:false,
        favorite:false,
        messageDate: new Timestamp(dateSent.getSeconds(), dateSent.getMilliseconds() * 100000),
        photoUrl:'',
        userId:user.uid,
        userTo:userTo,
        wasItRead:false
      }).then(message => {
        
      }).catch(err => {
        console.log(err)
      }).finally(()=>{
        setMessage('')
      })
    }


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <View>
        <Appbar.Header>
          <MiAppbar text={userName} />
        </Appbar.Header>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 6 }}>
          <UserMessageComponent message='Hello World' timestamp={new Date()} viewed={false}/>
          <UserMessageComponent message='Hello' timestamp={new Date()} viewed={false}/>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.inputContainer}>
        <TextInput value={message} onChangeText={valueTyped => setMessage(valueTyped)} style={styles.input} textBreakStrategy='balanced'/>
        <MessageButton style={{ flex: 1 }} onPress={() => handleSendMessageEvent()} />
      </View>
    </KeyboardAvoidingView>
  )

}



export default ChatMessage


