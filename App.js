import React, { useState } from 'react';
import RootStack from './navigators/RootStack';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './components/CredentialsContext';
import 'expo-dev-client'
import { I18nextProvider } from 'react-i18next';
import i18n from "i18next";

//	Import modules needed for translation and multi language support


export default function App() {
  console.log('checkLoginCredentials');
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials, storedLanguage, setStoredLanguage] = useState('');


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


    /**
     * Retrieves the stored language from AsyncStorage and changes the app language if it exists.
     */
    /*
    This code uses the getItem function of AsyncStorage to retrieve the stored language from AsyncStorage.
    If the stored language exists (i.e., the result is not null),
    it changes the app language using the changeLanguage function of the i18n instance.
    If an error occurs, it logs the error to the console.
    If the stored language does not exist, it does nothing.
     */
    AsyncStorage.getItem('storedLanguage')
        .then((result) =>{
            if (result !== null) {
                console.log("result");
                console.log(result);
                i18n.changeLanguage(result);
            } else {

            }
        })
        .catch((error) => console.log(error));

};



  if (!appReady) {
    return <AppLoading startAsync={checkLoginCredentials} onFinish={() => setAppReady(true)} onError={console.warn} />;
  }







  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials, storedLanguage , setStoredLanguage }}>
        <I18nextProvider i18n={i18n}>
      <RootStack />
        </I18nextProvider>
    </CredentialsContext.Provider>
  );
}
