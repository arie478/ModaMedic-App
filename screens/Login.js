import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import { View, ActivityIndicator } from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
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
} from '../components/styles';
import {useTranslation} from "react-i18next";
import i18n from "i18next";

const { brand, darkLight, primary } = Colors;

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = ENV.API_URL.login;
    const headers = { 'Content-Type': 'application/json' };
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;
        console.log('response', result);
        if (typeof data.token === 'string') {
          persistLogin({ ...data }, message, status);
        } else {
          handleMessage(message, status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log('error', error);
        setSubmitting(false);
        handleMessage(t('Something went wrong. Please try again later.'));
      });
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  const persistLogin = (credentials, message, status) => {
    console.log('credentials', credentials);

    AsyncStorage.setItem('loginCredentials', JSON.stringify(credentials))
      .then(() => {
        console.log('Persist login success');
        handleMessage('Persist login success');
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(error);
        handleMessage('Persist login failed');
      });
  };

    /*
      The useTranslation hook is a custom hook provided by the react-i18next library.
      It allows you to access the t function in your functional React components.

      The t function is a function that takes a string key and returns the corresponding translation in the current language.
      It is used to translate strings in your component JSX.
      */
    const {t} = useTranslation();

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('../assets/app_logo_small.png')} />
          {/*<PageTitle>ModaMedic</PageTitle>*/}
          {/*<SubTitle>Login</SubTitle>*/}
          <Formik
            initialValues={{ UserID: '', Password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.UserID === '' || values.Password === '') {
                handleMessage(t('Please fill out all of the fields.'));
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea style={{ marginTop: 50 }}>
                <MyTextInput
                  label= {t('Email Address')}
                  icon="mail"
                  placeholder= {t('example@domain.com')}
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('UserID')}
                  onBlur={handleBlur('UserID')}
                  value={values.UserID}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label= {t('Password')}
                  icon="lock"
                  placeholder="********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('Password')}
                  onBlur={handleBlur('Password')}
                  value={values.Password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsBox type={messageType}>{message}</MsBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText> {t('Log in')}</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="small" color={primary} />
                  </StyledButton>
                )}

                <Line />
 
                <ExtraView  style={{flexDirection: i18n.language === 'en' || i18n.language === 'ru' ? 'row' : 'row-reverse'}}>
                  <ExtraText >{t("Don't have an account yet?")}</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent> {t("Register here")} </TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
