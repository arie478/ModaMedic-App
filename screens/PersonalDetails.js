import React, {useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import {CredentialsContext} from "../components/CredentialsContext";
import { Formik } from 'formik';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import { Image } from 'react-native';

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
} from '../components/styles';
import {useTranslation} from "react-i18next";
import {Alert} from "react-native";

const { brand, darkLight, primary } = Colors;



const PersonalDetails = ({ navigation }) => {

    /*
    The useTranslation hook is a custom hook provided by the react-i18next library.
    It allows you to access the t function in your functional React components.

    The t function is a function that takes a string key and returns the corresponding translation in the current language.
    It is used to translate strings in your component JSX.
    */
    const {t} = useTranslation();

  return (
    <>
      <StatusBar style="dark" />
      <InnerContainer>
        <WelcomeContainer>
          <PageLogo resizeMode="cover" source={require('../assets/app_logo_small.png')} />
          {/* <Image source={require('../assets/app_logo_small.png')} resizeMode="cover" style={styles.logo} /> */}
          <PageTitle welcome={true}>{t('Your Personal Information')}</PageTitle>
          <StyledFormArea>
            <SubTitle welcomeHeader={true}>{t('Surgery Date')}: 29/11/2022</SubTitle>
            <StyledButton welcome={true} onPress={() => navigation.navigate('UpdatePersonalDetails')}>
              <ButtonText welcome={true}>{t('Update Personal Information')}</ButtonText>
              <Fontisto name="eraser" color={primary} size={15} />
            </StyledButton>
            <StyledButton welcome={true} onPress={() => Alert.alert("This feature will be available in the next update!")}>
              <ButtonText welcome={true}>{t('Update Surgery Date')}</ButtonText>
              <Fontisto name="date" color={primary} size={15} />
            </StyledButton>
            <StyledButton welcome={true} onPress={() => Alert.alert("This feature will be available in the next update!")}>
              <ButtonText welcome={true}>{t('Updating Medical Questionnaire')}</ButtonText>
              <Fontisto name="table-1" color={primary} size={15} />
            </StyledButton>
            <Line />
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default PersonalDetails;
