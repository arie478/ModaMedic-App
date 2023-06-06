import React, {useContext, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import {CredentialsContext} from "../components/CredentialsContext";
import { Formik } from 'formik';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import axios from 'axios';
import ENV from "../environment";

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
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const { storedCredentials } = useContext(CredentialsContext);
  const [SurgeryDate, setSurgeryDate] = useState();
  var usrInfo = undefined;
  // useEffect(() => {
  //   const fetchSurgeryDate = async () => {
  //     handleMessage(null);
  //     try {
  //       const response = await axios.get(ENV.API_URL.userDetalis + "/userInfo", {
  //         headers: { 'x-auth-token': storedCredentials.token }
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //         setSubmitting(false);
  //         navigation.goBack();
  //       })
  //       .catch((error) => {
  //           console.log('error', error);
  //           setSubmitting(false);
  //           handleMessage(t("Something went wrong. Please try again later."));
  //       });
  //       const { usrInfo } = response.data.data;
  //       console.log(usrInfo);
  //       console.log(usrInfo.DateOfSurgery);
  //       DateOfSurgery = usrInfo.DateOfSurgery;
  //       // if (DateOfSurgery) {
  //       //   setSurgeryDate(new Date(DateOfSurgery));
  //       // }
  //     } catch (error) {
  //       console.log('error', error);
  //       handleMessage(t("Something went wrong. Please try again later."));
  //     }
  //   };
  
  //   fetchSurgeryDate();
  // }, []);

  useEffect(() => {
    const fetchSurgeryDate = async () => {
      handleMessage(null);
      try {
        const response = await axios.get(ENV.API_URL.userDetalis + "/userInfo", {
          headers: { 'x-auth-token': storedCredentials.token }
        })
        .then((response) => {
          console.log(response.data);
          usrInfo = response.data;
        })
        .catch((error) => {
            console.log('error', error);
            handleMessage(t("Something went wrong. Please try again later."));
        });


        if (usrInfo.data["DateOfSurgery"] !== null) {
          const surDate = (new Date(usrInfo.data["DateOfSurgery"])).toLocaleDateString('en-GB').toString();
          setSurgeryDate(surDate);
        }
      } catch (error) {
        console.log('error', error);
        handleMessage(t("Something went wrong. Please try again later."));
      }
    };
  
    fetchSurgeryDate();
  }, []);

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };
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
          <PageLogo resizeMode="cover" source={require('../assets/app_logo.png')} />
          <PageTitle welcome={true}>{t('Your Personal Information')}</PageTitle>
          <StyledFormArea>
            <SubTitle welcomeHeader={true}>{t('Surgery Date')}: {SurgeryDate}</SubTitle>
            <StyledButton welcome={true} onPress={() => navigation.navigate('UpdatePersonalDetails')}>
              <ButtonText welcome={true}>{t('Update Personal Information')}</ButtonText>
              <Fontisto name="eraser" color={primary} size={15} />
            </StyledButton>
            <StyledButton welcome={true} onPress={() => navigation.navigate('UpdateSurgeryDate')}>
            {/* <StyledButton welcome={true} onPress={() => Alert.alert("This feature will be available in the next update!")}> */}
              <ButtonText welcome={true}>{t('Update Surgery Date')}</ButtonText>
              <Fontisto name="date" color={primary} size={15} />
            </StyledButton>
            {/* <StyledButton welcome={true} onPress={() => Alert.alert("This feature will be available in the next update!")}>
              <ButtonText welcome={true}>{t('Updating Medical Questionnaire')}</ButtonText>
              <Fontisto name="table-1" color={primary} size={15} />
            </StyledButton> */}
            <Line />
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default PersonalDetails;
