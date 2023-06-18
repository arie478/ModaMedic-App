import React, { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';
import { Formik } from 'formik';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import {Alert, View} from 'react-native';
import {videosCategory} from "./videos.data";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  ButtonText,
  StyledButton,
  StyledInputLabel,
  StyledTextInput,
  Colors,
  MsBox,
  Line,
  ExtraView,
  TextLink,
  ExtraText,
  TextLinkContent,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
  WelcomeContainerHeader,
} from '../../components/styles';
import {useTranslation} from "react-i18next";
import {scale, verticalScale} from "react-native-size-matters";

const { brand, darkLight, primary } = Colors;

const VideosCategories = ({ navigation }) => {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const clearLogin = () => {
    AsyncStorage.removeItem('loginCredentials')
      .then(() => {
        setStoredCredentials('');
      })
      .catch((error) => console.log(error));
  };

  /*
   The useTranslation hook is a custom hook provided by the react-i18next library.
   It allows you to access the t function in your functional React components.

   The t function is a function that takes a string key and returns the corresponding translation in the current language.
   It is used to translate strings in your component JSX.
   */
  const {t} = useTranslation();


  return (
      <InnerContainer>
        {/*<Avatar style={{ marginTop: 50 }} welcomeLeftIcon={true} source={require('../../assets/notif_icon.png')} />*/}
        <WelcomeContainerHeader
            style={{
              /*
               scale(size: number): A function that returns a linearly scaled result of the
               provided size based on your device's screen width.
               It helps in scaling components horizontally.

               verticalScale(size: number): A function that returns a linearly scaled result of the
               provided size based on your device's screen height.
               It helps in scaling components vertically.

               moderateScale(size: number, factor?: number): A function that scales the
               provided size based on your device's screen width,
               but with the ability to control the resize factor.
               By default, the resize factor is 0.5. It allows for non-linear scaling,
               useful for achieving a balanced scaling effect.

               moderateVerticalScale(size: number, factor?: number): Similar to moderateScale,
               but scales the size based on your device's screen height instead of width.

               These scaling functions are useful for creating responsive designs in React Native by
               scaling components and styles based on the device's screen dimensions.
              */
              alignItems: 'center',
              paddingTop: verticalScale(50),
              height: verticalScale(100),
              width: scale(320)
            }}>
        </WelcomeContainerHeader>
        <PageTitle style={{ marginTop: 50, fontSize: 28 }} welcome={true}>
          {t("Exercise with home videos")}
        </PageTitle>

        <View style={{ display: 'flex', marginTop: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
          {videosCategory.map((categoryName, index) => (
            <StyledButton
              key={index}
              onPress={() => navigation.navigate('Neck',  categoryName )}
              // onPress={() => Alert.alert("This feature will be available in the next update!")}
              home={true}
            >
              <ButtonText welcome={true}>{categoryName}</ButtonText>
            </StyledButton>
          ))}
          {/*<Line />*/}
          {/*<StyledButton style={{ width: 300, margin: 50 }} onPress={clearLogin}>*/}
          {/*  <ButtonText>Logout</ButtonText>*/}
          {/*</StyledButton>*/}
        </View>
      </InnerContainer>
  );
};

export default VideosCategories;
