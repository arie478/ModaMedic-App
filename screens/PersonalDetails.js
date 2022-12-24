import React, {useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import {CredentialsContext} from "../components/CredentialsContext";
import { Formik } from 'formik';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';


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

const { brand, darkLight, primary } = Colors;


const PersonalDetails = ({ navigation }) => {
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeContainer>
          <PageLogo resizeMode="cover" source={require('../assets/app_logo.png')} />
          <PageTitle welcome={true}>Your Personal Details</PageTitle>
          <StyledFormArea>
            <SubTitle welcomeHeader={true}>Date Of Surgery: 29/11/2022</SubTitle>
            <StyledButton welcome={true} onPress={() => navigation.navigate('UpdatePersonalDetails')}>
              <ButtonText welcome={true}>Edit Personal Information</ButtonText>
              <Fontisto name="eraser" color={primary} size={15} />
            </StyledButton>
            <StyledButton welcome={true}>
              <ButtonText welcome={true}>Update Surgery Date</ButtonText>
              <Fontisto name="date" color={primary} size={15} />
            </StyledButton>
            <StyledButton welcome={true}>
              <ButtonText welcome={true}>Updating Medical Questionnaire</ButtonText>
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
