import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import LoginComponent from '../components/login/LoginComponent'
import Register from '../components/login/Register'

const LoginRouter = () => {
    const LoginStack = createNativeStackNavigator()

  return (
    <LoginStack.Navigator>
        <LoginStack.Screen name='login' component={LoginComponent} options={{title:"Login"}}/>
        <LoginStack.Screen name='register' component={Register} options={{title:"New to the app?"}}/>
        </LoginStack.Navigator>
  )
}

export default LoginRouter