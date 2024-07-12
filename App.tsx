import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginComponent from './components/login/LoginComponent';
import { NavigationContainer } from '@react-navigation/native';
import LoginRouter from './routes/LoginRouter';
import Toast from 'react-native-toast-message';
import LoadingContext from './contexts/LoadingContext';
import MainRouter from './routes/MainRouter';
import UserContext from './contexts/UserContext';
import MainApp from './MainApp';

export default function App() {
  return (
    <>
      <UserContext>
        <LoadingContext>
          <MainApp />
        </LoadingContext>

      </UserContext>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
