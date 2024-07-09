import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Contacts from '../components/main/Contacts'

const ContactsListRouter = () => {

    const ContactListStack = createNativeStackNavigator()


  return (
    <ContactListStack.Navigator>
      <ContactListStack.Screen name='contactList' component={Contacts} options={{title:'Contact List'}}/>
    </ContactListStack.Navigator>
  )
}

export default ContactsListRouter