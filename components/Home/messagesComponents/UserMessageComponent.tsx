import React from 'react'
import { Dimensions, Text, View, StyleSheet } from 'react-native'

const UserMessageComponent = ({ message, timestamp, viewed, isReceived = false }: { message: string, timestamp: string | Date, viewed: boolean, isReceived?:boolean }) => {

  const messageStyle = StyleSheet.create({
    messageSentContainer: {
      justifyContent: isReceived? 'flex-start': 'flex-end',
      alignItems: isReceived?'flex-start':'flex-end',
      marginRight: 5,
      marginTop:10
    },
    messageSent: {
      backgroundColor: isReceived? 'white' :'#0fbcf9',
      width: Dimensions.get('screen').width * 0.6,
      borderWidth:  0.1,
      borderRadius: 10,
      padding:5,
      height: 'auto',
      minHeight: Dimensions.get('screen').height * 0.05,
      overflow: 'visible',
      borderColor:isReceived?'black':null
    },
    messageSentText: {
      color: isReceived?'#000000':'#ffffff',
      padding: 5
    }
  }
  )
  
  return (
    <View style={messageStyle.messageSentContainer}>
      <View style={messageStyle.messageSent}>
        <Text style={messageStyle.messageSentText}>{message}</Text>
      </View>
    </View>
  )
}




export default UserMessageComponent