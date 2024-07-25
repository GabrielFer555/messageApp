import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Keyboard, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { userContext } from '../../contexts/UserContext'
import { firestore } from '../../configs/Firebase'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { patternStyles } from '../../patterns/patternStyles'
import { useKeyboard } from '@react-native-community/hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadingContext } from '../../contexts/LoadingContext'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'





const MyAccount = ({ navigation }) => {

  const { user } = useContext(userContext)
  const [docId, setDocId] = useState('')
  const [userName, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [bioFromResponse, setOriginalBioFromResponse] = useState('');
  const userCollection = collection(firestore, 'users')
  const keyboard = useKeyboard()
  const { setLoading } = useContext(loadingContext)


  const saveAlterations = async () => {
    try {
      setLoading(true)
      await setDoc(doc(firestore, "users", docId), {
        email: user.email,
        userName: userName,
        userId: user.uid,
        bio: bio
      })
      Toast.show({
        type: 'success',
        text1: 'Saved!',
        text2: 'Alterations saved to the profile'
      })
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Impossible to save alterations',
        text2: 'Try again later'
      })
    } finally {
      searchUserData()
      setLoading(false)
    }
  }


  const searchUserData = async () => {
    const queryUser = query(userCollection, where("userId", "==", user.uid))
    try {
      const userData = await getDocs(queryUser)
      if (userData.empty) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'User not found'
        })
      }
      setOriginalBioFromResponse(bio)
      userData.forEach(user => {
        setDocId(user.id)
        setUsername(user.data().userName)
        setBio(user.data().bio)
        setOriginalBioFromResponse(user.data().bio)
      })
    } catch (err) {
    }
  }

  useEffect(() => {
    setLoading(true)
    try{
      searchUserData()
    }catch(err){
      Toast.show({
        type:'error',
        text1:'Error',
        text2:err
      })
    } finally{
        setLoading(false)
    }
  }, [])

  return (
    <View style={styles.container}>
        <View style={[styles.halfScreenContainer, {flex:2}]}>
          <Avatar.Icon size={200} icon="account" />
          <Text style={{ fontSize: 25, textAlign: 'center' }}>{userName}</Text>
        </View>
        <View style={styles.halfScreenContainer}>
          <Button buttonColor='blue' mode='contained' textColor='white' icon="qrcode" style={patternStyles.buttonStyle}> Share </Button>
        </View>
      <KeyboardAvoidingView style={[styles.halfScreenContainer, { padding: 10 }]} behavior='padding' keyboardVerticalOffset={Dimensions.get('screen').width * 0.15}>
        <Text>Biography:</Text>
        <TextInput style={{ width: Dimensions.get('screen').width * 0.9 }} value={bio} label="write something..." onChangeText={txt => setBio(txt)} right={<TextInput.Icon icon="pen" />} />
      </KeyboardAvoidingView>
      <View style={styles.halfScreenContainer}>
        <Button mode='outlined' buttonColor='green' textColor='white' style={patternStyles.buttonStyle} disabled={(bioFromResponse == bio || bio === '')} onPress={() => saveAlterations()}>Salvar</Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
  },
  halfScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 10
  }
})

export default MyAccount