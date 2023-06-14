import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import { View, TouchableOpacity, Modal, Button, Alert, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import {CredentialsContext} from "../components/CredentialsContext";
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
import axios from 'axios';
import {useTranslation} from "react-i18next";
import i18n from "i18next";

const { brand, darkLight, primary } = Colors;

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [dob, setDob] = useState();
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);


    const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
    setDob(currentDate);
    Platform.OS === 'android' && setShow(false);
  };

  const showDatePicker = () => {
    console.log('showDatePicker');
    setShow(true);
  };

  const handleSignup = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = ENV.API_URL.signup;
    const headers = { 'Content-Type': 'application/json' };
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response;
        const { message, status, data } = result;

        if (status === 200) {
            Alert.alert(t('Account successfully created'), t('Please sign in'))
            navigation.goBack();

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
        AsyncStorage.setItem('loginCredentials', JSON.stringify(credentials))
            .then(() => {
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
          <PageTitle>{t('ModaMedic')}</PageTitle>
          <SubTitle>{t('Account Registration')}</SubTitle>

          <Modal animationType="fade" visible={show} transparent={true}>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(1,1,1,0.3)' }}
            >
              <View style={{ backgroundColor: 'gray', borderRadius: 8, padding: 6, width: 330, margin: 8 }}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="spinner"
                  onChange={onChange}
                />
                <View style={{ width: 330 }}>
                  <Button color={'black'} title={'Choose Date'} onPress={() => setShow(false)} />
                </View>
              </View>
            </View>
          </Modal>

          <Formik
            initialValues={{
              First_Name: '',
              Last_Name: '',
              UserID: '',
              BirthDate: 786146400000,
              Password: '',
              confirmPassword: '',
              Phone_Number: '',
              Gender: '',
              Smoke: '',
              SurgeryType: '',
              Education: '',
              Height: '',
              Weight: '',
              BMI: '',
              DateOfSurgery: '',
              Questionnaires: '',
              VerificationQuestion: 0,
              VerificationAnswer: 'Leo',
              Code: 'soroka372abc',
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.First_Name === '' || values.Password === '') {
                handleMessage(t('Please fill out all of the fields.'));
                setSubmitting(false);
              } else if (values.Password !== values.confirmPassword) {
                handleMessage(t('The passwords do not match.'));
                setSubmitting(false);
              } else {
                handleSignup(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label= {t('First Name')}
                  icon="person"
                  placeholder= {t('John')}
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('First_Name')}
                  onBlur={handleBlur('First_Name')}
                  value={values.First_Name}
                />
                <MyTextInput
                  label= {t('Last Name')}
                  icon="person"
                  placeholder= {t('Doe')}
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('Last_Name')}
                  onBlur={handleBlur('Last_Name')}
                  value={values.Last_Name}
                />
                <MyTextInput
                  label= {t('Email Address')}
                  icon="mail"
                  placeholder= {t('example@domail.com')}
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('UserID')}
                  onBlur={handleBlur('UserID')}
                  value={values.UserID}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label= {t('Date of Birth')}
                  icon="calendar"
                  placeholder= {t('YYYY - MM - DD')}
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('BirthDate')}
                  onBlur={handleBlur('BirthDate')}
                  value={dob ? dob.toLocaleDateString('en-GB').toString() : ''}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
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
                <MyTextInput
                  label= {t('Confirm Password')}
                  icon="lock"
                  placeholder="********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsBox type={messageType}>{message}</MsBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText> {t('Sign up')}</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}
                <Line />
                <ExtraView style={{flexDirection: i18n.language === 'en' || i18n.language === 'ru' ? 'row' : 'row-reverse'}}>
                  <ExtraText>{t('Do you already have an account?')}</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Login')}>
                    <TextLinkContent> {t('Sign in here')} </TextLinkContent>
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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput pointerEvents={'none'} {...props} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Signup;
