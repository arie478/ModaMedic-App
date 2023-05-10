import React, {useEffect, useState} from 'react';
import RootStack from './navigators/RootStack';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './components/CredentialsContext';
import 'expo-dev-client'
import { I18nextProvider } from 'react-i18next';
import i18n from "i18next";
import SelectedPartsContext from './components/SelectedPartsContext';


//	Import modules needed for translation and multi language support

// Import modules needed for in app notifications
import * as Notifications from 'expo-notifications';


export default function App() {



  //console.log('checkLoginCredentials');
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials, storedLanguage, setStoredLanguage] = useState('');
  const [selectedParts, setSelectedParts] = useState([]);



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
        /*
    The useEffect hook is used to perform side effects in function components in React.
    In this case, it's being used to register for push notifications when the component is mounted.

    The first argument to useEffect is a function that will be executed when the component is mounted or updated.
    In this case, the function calls registerForPushNotificationsAsync().

    The second argument to useEffect is an array of values that the effect depends on.
    If any of these values change, the effect will be re-executed.
    In this case, the empty array [] means that the effect will only be executed once, when the component is mounted.

    So, the code is registering for push notifications when the component is mounted,
    And it will only be executed once.
    This is a common pattern for registering for push notifications or other permissions,
    As you typically only need to do it once per app install.
    */
    useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);



  if (!appReady) {
    return <AppLoading startAsync={checkLoginCredentials} onFinish={() => setAppReady(true)} onError={console.warn} />;
  }




    /*
    This is an asynchronous function that registers the app for push notifications.

    First, it calls Notifications.getPermissionsAsync() to check if the app has already been
    Granted permission to send push notifications.
    The result of this call is an object that contains a status property,
    Which is a string indicating the current permission status.
    The possible values for status are 'granted', 'undetermined', or 'denied'.

    If the app has not been granted permission (i.e., status is not 'granted'),
    The function calls Notifications.requestPermissionsAsync() to request permission from the user.
    This will display a system dialog that asks the user to grant permission to send push notifications.
    The result of this call is an object that contains a status property,
    Which is a string indicating the new permission status.

    If the user declines to grant permission (i.e., newStatus is not 'granted'),
    The function returns without doing anything else.

    If the user grants permission, the function continues executing and returns without any errors.
    The app is now registered to send push notifications.

     */
    async function registerForPushNotificationsAsync() {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            if (newStatus !== 'granted') {
                return;
            }
        }
    }











  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials, storedLanguage , setStoredLanguage }}>
        <I18nextProvider i18n={i18n}>
            <SelectedPartsContext.Provider value={[selectedParts, setSelectedParts]}>
                <RootStack />
            </SelectedPartsContext.Provider>
        </I18nextProvider>
    </CredentialsContext.Provider>
  );
}
