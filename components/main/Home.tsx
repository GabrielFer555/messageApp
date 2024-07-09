import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import MiCard from './MiCard'

const Home = ({navigation}) => {

  const [listContacts, setListContacts] = useState([]);

  interface IContact{
    id:string,
    username:string
  }

  useEffect(() => {
    setListContacts ([
      {
        id:'123',
        username:'Rafael'
      }
    ])
  }, [])


  return (
    <View>
      <FlatList 
      data={listContacts}
      renderItem={({item}) => <MiCard usernameTitle={item.username} name={item.username} onPress={()=> {navigation.navigate('chatMessage', {
        userId:item.id,
        userName:item.username
      })}} />}
      keyExtractor={contact => contact.id}/>
    </View>
)
}

export default Home