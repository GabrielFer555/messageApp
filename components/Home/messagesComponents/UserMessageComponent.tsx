import React from 'react'
import { Dimensions, Text, View, StyleSheet } from 'react-native'

const UserMessageComponent = ({ message, timestamp, viewed }: { message: string, timestamp: string | Date, viewed: boolean }) => {
  return (
    <View style={messageStyle.messageSentContainer}>
      <View style={messageStyle.messageSent}>
        <Text style={messageStyle.messageSentText}>{message}</Text>
      </View>
    </View>
  )
}


const messageStyle = StyleSheet.create({
  messageSentContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 5,
    marginTop:1
  },
  messageSent: {
    backgroundColor: 'blue',
    width: Dimensions.get('screen').width * 0.6,
    borderWidth: 0.1,
    borderRadius: 10,
    padding:5,
    height: 'auto',
    minHeight: Dimensions.get('screen').height * 0.05,
    overflow: 'visible'
  },
  messageSentText: {
    color: 'white',
    padding: 5
  }
}
)


export default UserMessageComponent