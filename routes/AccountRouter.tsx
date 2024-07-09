
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import MyAccount from '../components/Account/MyAccount'
import OptionsScreen from '../components/Account/MainAccount'

const AccountRouter = () => {

    const AccountDrawer = createDrawerNavigator()

  return (
    <AccountDrawer.Navigator>
        <AccountDrawer.Screen component={MyAccount} name='myAccount'/>
        <AccountDrawer.Screen component={OptionsScreen} name='options' options={{
            title:'Options'
        }}/>
    </AccountDrawer.Navigator>
  )
}

export default AccountRouter