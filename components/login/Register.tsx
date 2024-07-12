import React, { useRef, useState } from 'react'
import { Dimensions, StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Appbar, TextInput, Button } from 'react-native-paper'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from '../../configs/Firebase';
import Toast from 'react-native-toast-message';
import { patternStyles } from '../../patterns/patternStyles';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickName, setNickname] = useState('')
    const [loading, setLoading] = useState(false)
    const emailRef = useRef<any>()
    const nicknameRef = useRef<any>()

    const ValidatePassword = () => {
        if (password.length <= 6 && password.length > 0) {
            return (
                <>
                    <Text style={{ color: 'red', margin: 5 }}>Password must be longer than 6 letters</Text>
                </>
            )
        } else {
            return;
        }
    }

    const handleNewUserPress = async () => {
        setLoading(true)
        try {
            if (nickName.trim() === '') {
                nicknameRef.current!.focus()
                throw new Error("Username must be informed")
            }
            if (email.trim() === '') {
                emailRef.current!.focus()
                throw new Error("Email must be informed")
            }
            const auth = getAuth()
            const db = getFirestore(app)
            try {
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
                const newUser = await addDoc(collection(db, "users"), {
                    userName: nickName,
                    userId: userCredentials.user.uid,
                    email: userCredentials.user.email,
                    bio:""
                })
                Toast.show({type:'success', text1:'User registered with success!'})
                navigation.navigate('login')

            } catch (err) {
                Toast.show({ type: 'error', text1: "Error", text2: "Verify your data" })
            }
        } catch (err: any) {
            Toast.show({ type: 'error', text1: "Erro", text2: err.message })
        }finally{
            setLoading(false)
        }

    }

    return (
        <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.keyBoardView} behavior='position'>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/JSminor.png')} />
            </View>
            <View style={styles.inputContainerStyle}>
                <TextInput style={styles.inputStyle} label="Username" textColor='black' value={nickName} onChangeText={e => setNickname(e)} ref={nicknameRef} />
                <TextInput style={styles.inputStyle} label="Email" textColor='black' value={email} onChangeText={e => setEmail(e)} ref={emailRef} />
                <TextInput style={styles.inputStyle} label="Password" secureTextEntry value={password} onChangeText={(e) => setPassword(e)} />
                <ValidatePassword />
            </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

            <View style={styles.buttonContainer}>
                <Button mode='elevated' textColor='blue' style={patternStyles.buttonStyle} loading={loading} onPress={handleNewUserPress}>
                    Save
                </Button>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width,
    },
    inputContainerStyle: {
        gap: 15,
        flex: 4,
        alignItems: 'center',
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        padding: 20
    },
    inputStyle: {
        width: Dimensions.get('window').width * 0.8
    },
    buttonContainer: {
        flex: 1,
        gap: 40
    },
    keyBoardView:{
        flex:3,
        justifyContent:'center',
    },
    logoContainer:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
      }
})


export default Register