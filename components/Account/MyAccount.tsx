import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { userContext } from '../../contexts/UserContext'
import { firestore } from '../../configs/Firebase'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { patternStyles } from '../../patterns/patternStyles'





const MyAccount = ({ navigation }) => {
  const { user } = useContext(userContext)
  const [userName, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const userCollection = collection(firestore, 'users')

  const searchUserData = async () => {
    const queryUser = query(userCollection, where("userID", "==", user.uid))

    try {
      const userData = await getDocs(queryUser)
      if (userData.empty) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'User not found'
        })
      }
      userData.forEach(user => {
        setUsername(user.data().userName)
      })

    } catch (err) {

    }
  }

  useEffect(() => {
    searchUserData()
  }, [])

  return (
    <View style={styles.container}>
      <View style={[styles.halfScreenContainer, { flex: 2 }]}>
        <Avatar.Icon size={200} icon="account" />
        <Text style={{ fontSize: 25, textAlign: 'center' }}>{userName}</Text>
      </View>
      <View style={styles.halfScreenContainer}>
        <Button buttonColor='blue' mode='contained' textColor='white' icon="qrcode" style={patternStyles.buttonStyle}> Share </Button>
      </View>
      <View style={[styles.halfScreenContainer, { padding: 10 }]}>
        <Text>Biography:</Text>
        <TextInput style={{ width: Dimensions.get('screen').width * 0.9 }} value={bio} label="write something..." onChangeText={txt => setBio(txt)} right={<TextInput.Icon icon="pen" />} />
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