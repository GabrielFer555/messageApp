import React, { useContext, useState } from 'react'
import { Dimensions, StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { Appbar, TextInput, Button } from 'react-native-paper'
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'
import app, { firestore } from '../../configs/Firebase'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userContext } from '../../contexts/UserContext'
import { doc, onSnapshot } from 'firebase/firestore'



const LoginComponent = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const {user, setUser} = useContext(userContext)



  const handleEmailLogin = async () =>{
  

    setLoading(true)
    const auth = getAuth(app)
    try{
      const result = await signInWithEmailAndPassword(auth, email, password)
      const credential = result
      setUser(result.user)
      AsyncStorage.setItem('access-token', await result.user.getIdToken(true))
      AsyncStorage.setItem('uuid', result.user.uid)
      AsyncStorage.setItem('uuid', result.user.email)
      Toast.show({type:'success', text1:'Logged in with success'})
    }catch(err){
      Toast.show({
        type:'error',
        text1:'Error',
        text2:'Verify your credentials'
      })
    }finally{
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{flex:2, justifyContent:'center', alignItems:'center'}} >
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/JSminor.png')} style={styles.logo}/>
      </View>
      <View style={styles.inputContainerStyle}>
        <TextInput style={styles.inputStyle} label="Email" textColor='black' value={email} onChangeText={e => setEmail(e)} keyboardType='email-address'/>
        <TextInput style={styles.inputStyle} label="Password" secureTextEntry value={password} onChangeText={(e) => setPassword(e)}/>
      </View>
      </View>
      </TouchableWithoutFeedback>
      <View style={styles.buttonContainer}>
          <Button mode='elevated' textColor='blue' style={styles.buttonStyle} loading={loading} onPress={handleEmailLogin}>
            Login
          </Button>
          <Button mode='elevated' textColor='black' style={styles.buttonStyle} onPress={()=> navigation.navigate('register')}>
            Doesn't have an account?
          </Button>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:Dimensions.get('screen').width,
  },
  inputContainerStyle:{
    gap:20,
    flex:1,
    alignItems:'center',
    width:Dimensions.get('screen').width,
    justifyContent: 'center',
    padding:20
  },
  inputStyle:{
    width:Dimensions.get('window').width * 0.8
  },
  buttonContainer:{
    flex:1,
    gap:30
  },
  buttonStyle:{
    width:Dimensions.get('window').width,
  },
  logo: {
    //...
  },
  logoContainer:{
    flex:1
  }
})


export default LoginComponent