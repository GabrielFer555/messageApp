import React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar, Text } from 'react-native-paper'

const MiAppbar = ({text, style}:{text:any, style?:any}) => {
  return (
        <Appbar.Content  title={text}
        style={[{alignItems:'center'}, style]}/>
  )
}
export default MiAppbar