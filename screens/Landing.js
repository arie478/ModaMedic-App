import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
import { Formik } from 'formik';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import backendPaths from '../environment';

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
import moment from 'moment';
import axios from 'axios';

import {View, Text, Pressable, Button, Modal} from 'react-native';

//Import modules for translation
import '../assets/translations/i18n';
import {useTranslation} from 'react-i18next';
import SwitchSelector, {backgroundColor} from "react-native-switch-selector";

import Header from "react-native/Libraries/NewAppScreen/components/Header";

import componentProviderInstrumentationHook from "react-native-web/dist/exports/AppRegistry";

// This line imports four scaling functions from the react-native-size-matters library
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const { brand, darkLight, primary } = Colors;




const Landing = ({ navigation }) => {

	/*
	The useTranslation hook is a custom hook provided by the react-i18next library.
	It allows you to access the t function and the i18n instance in your functional React components.

	The t function is a function that takes a string key and returns the corresponding translation in the current language.
	It is used to translate strings in your component JSX.
	The i18n instance is an instance of the i18n library provided by react-i18next.
	It allows you to access various functions and options of the i18n library, such as changeLanguage and getFixedT.

	You can use the i18n instance to change the language, set custom options, and perform other operations.
	*/
	const {t, i18n} = useTranslation();



	/**
	 * Changes the language of the app and stores the new language in AsyncStorage.
	 * @param {string} value - The language code to switch to.
	 */
	/*
	This function takes a string parameter value which is the language code to switch to.
	It uses the changeLanguage function of the i18n instance to change the language,
	and stores the new language in AsyncStorage using the storeLanguage function.
	If an error occurs, it logs the error to the console.
	*/
	const changeLanguage = value => {
		i18n
			.changeLanguage(value)
			.then(() => storeLanguage(value))
			.catch(err => console.log(err));
	};

	/**
	 * Stores the given language code in AsyncStorage.
	 * @param {string} value - The language code to store.
	 */
	/*
	This function takes a string parameter value which is the language code to store.
	It uses the setItem function of AsyncStorage to store the language code in AsyncStorage.
	If an error occurs, it catches the error and does nothing.
	 */
	const storeLanguage = async (value) => {
		try {
			await AsyncStorage.setItem('storedLanguage', value)
		} catch (e) {
			// saving error
		}
	}

		return (
		<>
			<StatusBar style="dark" />
			<InnerContainer>
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
					<SwitchSelector
						//initial={i18n.language === 'en' ? 0 : i18n.language === 'he' ? 1 : i18n.language === 'ru' ? 2 : 3}
						initial={0}

						value = {i18n.language === 'en' ? 0 : i18n.language === 'he' ? 1 : i18n.language === 'ru' ? 2 : 3}

						onPress={selectedLanguage => changeLanguage(selectedLanguage)}

						textColor= '#9370db'
						selectedColor= '#f8f8ff'
						buttonColor= '#9370db'
						borderColor= '#9370db'
						backgroundColor = '#f8f8ff'
						borderRadius = {50}
						hasPadding

						options={[
							{ label: "English", value: "en",  },
							{ label: "עברית", value: "he", },
							{ label: "Русский", value: "ru",  },
							{ label: "عربي", value: "ar",  }
						]}
					/>

				</WelcomeContainerHeader>

				<WelcomeContainer >


					<Avatar
						resizeMode="contain"
						source={require('../assets/app_logo.png')}
						style={{ width: scale(300), height: verticalScale(150) }}
					/>
					{/*<PageTitle style={{ color: 'black', fontSize: 30, marginTop: 30}}>{t('Hello There!')}</PageTitle>*/}
					{/*<SubTitle style={{ color: 'grey', fontSize: 20, marginBottom: 30, textAlign: 'center'}}>{t('Automatic identity verification which enable you to verify your identity')}</SubTitle>*/}

					<StyledFormArea
						style={{
							justifyContent: 'space-evenly',
							height: verticalScale(100),
							width: scale(270),
							marginTop: verticalScale(50)
						}}
					>

						<StyledButton
							style={{
								backgroundColor: '#9370db',
								borderRadius: 50
							}}

							onPress={() => navigation.navigate('Login')}>
							<ButtonText>{t('Log In')}</ButtonText>
						</StyledButton>
						<StyledButton
							style={{
								backgroundColor: '#f8f8ff',
								borderColor: '#9370db',
								borderWidth: 1,
								borderRadius: 50,
							}}
							onPress={() => navigation.navigate('Signup')}
						>
							<ButtonText style={{color: '#9370db'}}>{t('Sign Up')}</ButtonText>
						</StyledButton>
					</StyledFormArea>
				</WelcomeContainer>
			</InnerContainer>
		</>
	);
};
export default Landing;