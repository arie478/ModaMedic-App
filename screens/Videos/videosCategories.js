import React, { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';
import { Formik } from 'formik';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import { View } from 'react-native';
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

  return (
      <InnerContainer>
        <Avatar style={{ marginTop: 50 }} welcomeLeftIcon={true} source={require('../../assets/notif_icon.png')} />

        <PageTitle style={{ marginTop: 10 }} welcome={true}>
          Home Video Exercises
        </PageTitle>

        <View style={{ display: 'flex', marginTop: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
          {videosCategory.map((categoryName, index) => (
            <StyledButton
              key={index}
              onPress={() => navigation.navigate('Neck',  categoryName )}
              home={true}
            >
              <ButtonText welcome={true}>{categoryName}</ButtonText>
            </StyledButton>
          ))}
          <Line />
          <StyledButton style={{ width: 300, margin: 50 }} onPress={clearLogin}>
            <ButtonText>Logout</ButtonText>
          </StyledButton>
        </View>
      </InnerContainer>
  );
};

export default VideosCategories;
