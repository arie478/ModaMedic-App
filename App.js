import React, { useState } from 'react';
import RootStack from './navigators/RootStack';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './components/CredentialsContext';
import 'expo-dev-client'

export default function App() {
  console.log('checkLoginCredentials');
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');

  const checkLoginCredentials = () => {
    console.log('checkLoginCredentials 222');
    AsyncStorage.getItem('loginCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };
  if (!appReady) {
    return <AppLoading startAsync={checkLoginCredentials} onFinish={() => setAppReady(true)} onError={console.warn} />;
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <RootStack />
    </CredentialsContext.Provider>
  );
}
