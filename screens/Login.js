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
        handleMessage('An error occurred. Check your network');
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

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('../assets/app_logo.png')} />
          {/*<PageTitle>ModaMedic</PageTitle>*/}
          {/*<SubTitle>Login</SubTitle>*/}
          <Formik
            initialValues={{ UserID: '', Password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.UserID === '' || values.Password === '') {
                handleMessage('Please fill all the fields');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea style={{ marginTop: 50 }}>
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="exmple@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('UserID')}
                  onBlur={handleBlur('UserID')}
                  value={values.UserID}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Password"
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
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <Line />
 
                <ExtraView>
                  <ExtraText>Don't have an account already?</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>Signup</TextLinkContent>
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
