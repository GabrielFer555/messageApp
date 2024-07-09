import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../components/main/Home'
import ChatMessage from '../components/Home/ChatMessageMessage'

const HomeRouter = () => {

  const HomeRouterStack = createNativeStackNavigator()

  return (
    <>
      <HomeRouterStack.Navigator>
        <HomeRouterStack.Screen name='homeScreen' options={{ title: 'Welcome' }} component={Home} />
        <HomeRouterStack.Screen name='chatMessage' component={ChatMessage} initialParams={
          {
            userTo: 1,
            userName:'pedro'
          }
        } options={{ title: 'ChatMessage', headerShown:false,headerTransparent: true, animation: 'slide_from_right'  }} />
      </HomeRouterStack.Navigator>
    </>
  )
}

export default HomeRouter