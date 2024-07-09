import { getAuth } from 'firebase/auth'
import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import app from '../../configs/Firebase'
import { Button } from 'react-native-paper'


const OptionsScreen = () => {
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center', flexDirection:'column', gap:25}}>
        <Button mode='contained' buttonColor='red' style={styles.buttonBasic} onPress={()=> {getAuth(app).signOut()}}>Logout</Button>
    </View>
  )
}
const styles = StyleSheet.create({
  buttonBasic:{width: Dimensions.get('screen').width * 0.7}
})


export default OptionsScreen