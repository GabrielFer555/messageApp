import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import ContactsListRouter from './ContactsListRouter'
import HomeRouter from './HomeRouter'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import AccountRouter from './AccountRouter'

const MainRouter = () => {

    const BottomTabs = createMaterialBottomTabNavigator()

  return (
    <BottomTabs.Navigator shifting>
        <BottomTabs.Screen component={HomeRouter} name='home' options={{title:'Home', tabBarIcon:'home', tabBarColor:'green'}}/>
        <BottomTabs.Screen component={ContactsListRouter} name='contacts' options={{title:'Contacts', tabBarIcon:'contacts'}}/>
        <BottomTabs.Screen component={AccountRouter} name='account' options={{title:'Account', tabBarIcon:'account'}}/>
    </BottomTabs.Navigator>
  )
}

export default MainRouter