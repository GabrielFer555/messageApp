import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

import LoginRouter from './routes/LoginRouter';
import LoadingContext from './contexts/LoadingContext';
import MainRouter from './routes/MainRouter';

import UserContext, { userContext } from './contexts/UserContext';
import app, { firestore } from './configs/Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



const MainApp = () => {
    const {user,setUser} = useContext(userContext);



    useEffect(()=>{
        onAuthStateChanged(getAuth(app), (user)=>{
            setUser(user)
        })
    }, [])

    return (
        <>
            <LoadingContext>
                <NavigationContainer>
                    {user? <MainRouter/>: <LoginRouter/>}
                </NavigationContainer>
                <StatusBar style="auto" />
                <Toast visibilityTime={2500} />
            </LoadingContext>
        </>

    )
}

export default MainApp