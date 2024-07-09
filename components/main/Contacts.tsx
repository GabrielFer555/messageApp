import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import MiCard from './MiCard';

const Contacts = () => {
  const [listContacts, setListContacts] = useState([]);

  

  useEffect(() => {
    setListContacts ([
      {
        id:'123',
        username:'Pedro'
      }
    ])
  }, [])

  return (
    <View>
      
    </View>
  )
}

export default Contacts