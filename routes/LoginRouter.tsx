import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import LoginComponent from '../components/login/LoginComponent'
import Register from '../components/login/Register'

const LoginRouter = () => {
    const LoginStack = createNativeStackNavigator()

  return (
    <LoginStack.Navigator>
        <LoginStack.Screen name='login' component={LoginComponent} options={{title:"Login", headerShown:false}}/>
        <LoginStack.Screen name='register' component={Register} options={{title:"New to the app?", headerShown:true}}/>
        </LoginStack.Navigator>
  )
}

export default LoginRouter