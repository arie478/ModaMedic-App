import React, { useContext, useState, useCallback, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../components/CredentialsContext';
import { Button, View, Alert, FlatList, ScrollView, SafeAreaView, Text, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import CardView from 'react-native-cardview';
import {videos} from "./videos.data";

// import {Card} from "@ui-kitten/components";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

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
} from '../../components/styles';
import {useTranslation} from "react-i18next";

const { brand, darkLight, primary } = Colors;

const Videos = ({ route }) => {


  const categoryName = route.params;
  console.log('categoryName', categoryName);

  const [playing, setPlaying] = useState(false);
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const clearLogin = () => {
    AsyncStorage.removeItem('loginCredentials')
      .then(() => {
        setStoredCredentials('');
      })
      .catch((error) => console.log(error));
  };

  const TopBar = ({ play, fullScreen }) => (
    <View
      style={{
        alignSelf: 'center',
        position: 'absolute',
        top: 0,
      }}
    >
      <Text style={{ color: '#FFF' }}> Custom Top bar</Text>
    </View>
  );

  /*
    The useTranslation hook is a custom hook provided by the react-i18next library.
    It allows you to access the t function in your functional React components.

    The t function is a function that takes a string key and returns the corresponding translation in the current language.
    It is used to translate strings in your component JSX.
    */
  const {t} = useTranslation();

  return (
    <>

      <PageTitle style={{ marginTop: 50 }} welcome={true}>
        {t("Exercise with home videos")}
      </PageTitle>
      <SubTitle style={{ textAlign: 'center' }}>{categoryName}</SubTitle>
      <ScrollView>
        <SafeAreaView>
          {videos[categoryName].map(({ id, description }) => (
            <CardView
              key={id}
              cardElevation={5}
              cardMaxElevation={5}
              cornerRadius={5}
              style={{
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 20,
                backgroundColor: '#ffffff',
              }}
            >
              <YoutubePlayer height={220} width={'100%'} play={playing} videoId={id} onChangeState={onStateChange} />
              <Text style={{ marginTop: 10, fontSize: 20 }}>{description}</Text>
            </CardView>
          ))}
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#EEEEEE',
  },
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    margin: 10,
  },
  text: {
    textAlign: 'center',
    margin: 10,
    height: 75,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Videos;
