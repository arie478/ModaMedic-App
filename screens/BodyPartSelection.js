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

//Imports for body highlight selection
import {StyleSheet, TouchableOpacity } from 'react-native';
import Body from 'react-native-body-highlighter';
import SelectedPartsContext from '../components/SelectedPartsContext';


const { brand, darkLight, primary } = Colors;


const BodyPartSelection = ({ navigation }) => {

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

	const [selectedParts, setSelectedParts] = useContext(SelectedPartsContext);

	/*
	This function takes in a body part object that contains a 'slug' property as a parameter.
	It checks whether this body part is already present in the selectedParts array.
	If it is, it removes the body part from the array. Otherwise, it adds the body part to the array.
	The 'selectedParts' state is updated using the 'setSelectedParts' function, which is a React Hook.

	The function does not return anything;
	Instead, it updates the state of the component that calls it,
	So that the selected parts can be used in other parts of the component or passed down to child components as props.
	 */
	const handlePartPress = (part) => {
		if (selectedParts.includes(part.slug)) {
			setSelectedParts(selectedParts.filter((partName) => partName !== part.slug));
		} else {
			setSelectedParts([...selectedParts, part.slug]);
		}
	};


	//Defines the body zones groups and what body parts are a part of the whole group
	const groups = {
		head: ['head', 'neck'],
		chest: ['chest'],
		back: ['trapezius', 'upper-back', 'lower-back'],
		arms: ['biceps', 'triceps', 'forearm', 'front-deltoids'],
		abs: ['abs', 'obliques'],
		legs: ['adductor', 'hamstring', 'quadriceps', 'abductors', 'calves', 'gluteal', 'knees']
	};

	/*
	This function takes a slug as a parameter and returns an intensity level based on whether
	The given body part is selected or not.
	The function first looks up the group that the given slug belongs to by using the groups object.
	If the group doesn't exist in groups, the function returns 1 as the default intensity.
	If the group does exist, the function checks if any of the body parts in the group
	Are included in the selectedParts array by using the some method.
	If at least one body part in the group is selected, the function returns an intensity level of 1,
	Indicating that the body part is being targeted for exercise.
	If none of the body parts in the group are selected, the function returns an intensity level of 2,
	Indicating that the body part is not being targeted but should still be exercised to maintain balance and avoid muscle imbalances.
	 */
	const getIntensity = (slug) => {
		const group = groups[slug];
		if (!group) return 1;
		return group.some((part) => selectedParts.includes(part)) ? 1 : 2;
	};



	const renderBody = () => {
			//Data for group selection where multiple parts are selected as a "whole" body part (like legs)
			const data = [
				//Head
				{ slug: 'head', intensity: getIntensity('head') },
				{ slug: 'neck', intensity: getIntensity('head') },

				//Chest
				{ slug: 'chest', intensity: getIntensity('chest') },

				//Back
				{ slug: 'trapezius', intensity: getIntensity('back') },
				{ slug: 'upper-back', intensity: getIntensity('back') },
				{ slug: 'lower-back', intensity: getIntensity('back') },

				//Arms
				{ slug: 'biceps', intensity: getIntensity('arms') },
				{ slug: 'triceps', intensity: getIntensity('arms') },
				{ slug: 'forearm', intensity: getIntensity('arms') },
				{ slug: 'front-deltoids', intensity: getIntensity('arms') },

				//Abs
				{ slug: 'abs', intensity: getIntensity('abs') },
				{ slug: 'obliques', intensity: getIntensity('abs') },

				//Legs
				{ slug: 'adductor', intensity: getIntensity('legs') },
				{ slug: 'hamstring', intensity: getIntensity('legs') },
				{ slug: 'quadriceps', intensity: getIntensity('legs') },
				{ slug: 'abductors', intensity: getIntensity('legs') },
				{ slug: 'calves', intensity: getIntensity('legs') },
				{ slug: 'gluteal', intensity: getIntensity('legs') },
				{ slug: 'knees', intensity: getIntensity('legs') }

			]
			//Data for body parts where each sub body part is being able to be selected by its own
			// const data = [
			// 	//Head
			// 	{ slug: 'head', intensity: selectedParts.includes('head') ? 1 : 2 },
			// 	{ slug: 'neck', intensity: selectedParts.includes('neck') ? 1 : 2 },
			//
			// 	// Chest
			// 	{ slug: 'chest', intensity: selectedParts.includes('chest') ? 1 : 2 },
			//
			// 	// Back
			// 	//trapezius
			// 	//upper-back
			// 	//lower-back
			//
			// 	// Arms
			// 	{ slug: 'biceps', intensity: selectedParts.includes('biceps') ? 1 : 2 },
			// 	{ slug: 'triceps', intensity: selectedParts.includes('triceps') ? 1 : 2 },
			// 	{ slug: 'forearm', intensity: selectedParts.includes('forearm') ? 1 : 2 },
			// 	{ slug: 'front-deltoids', intensity: selectedParts.includes('front-deltoids') ? 1 : 2 },
			//
			// 	// Abs
			// 	{ slug: 'abs', intensity: selectedParts.includes('abs') ? 1 : 2 },
			// 	{ slug: 'obliques', intensity: selectedParts.includes('obliques') ? 1 : 2 },
			//
			// 	// Legs
			// 	//adductor
			// 	//hamstring
			// 	{ slug: 'quadriceps', intensity: selectedParts.includes('quadriceps') ? 1 : 2 },
			// 	{ slug: 'abductors', intensity: selectedParts.includes('abductors') ? 1 : 2 },
			// 	{ slug: 'calves', intensity: selectedParts.includes('calves') ? 1 : 2 },
			// 	//gluteal
			// 	{ slug: 'knees', intensity: selectedParts.includes('knees') ? 1 : 2 },
			// ];


		return (
			<View style={{
				flex: 0,
				backgroundColor: 'transparent',
				alignItems: 'center',
				justifyContent: 'space-evenly',
				position: "relative",
			}}>
				{/*
				data is an array of objects that define the different parts of the body,
				Their slug (short identifier), and their intensity.
				The intensity value is determined based on whether the part is selected or not.
				colors is an array of two colors that define the gradient color scheme of the muscle parts.
				frontOnly is a boolean prop that determines whether to display the front side of the body only.
				onMusclePress is a callback function that is called when a muscle part is pressed.
				It takes the slug of the pressed part as an argument.
				zoomOnPress is a boolean prop that determines whether to zoom in on a pressed muscle part or not.
				scale is a number prop that determines the scale of the body model.
				When a user presses a muscle part, the handlePartPress function is called with the slug of the pressed part as an argument.
				This function updates the selectedParts state by adding or removing the pressed part depending on
				Whether it is already in the array or not.
				*/
				}
				<Body
					data={data}
					//colors={['#0984e3', '#74b9ff']}
					colors={['#137079', '#54a79d']}
					frontOnly={true}
					onMusclePress={handlePartPress}
					zoomOnPress={false}
					scale = {2.4}
				/>
			</View>
		);
	};


		return (
		<>
			<StatusBar style="dark" />
			<InnerContainer>
				{/*<WelcomeImage resizeMode="contain" source={require('../assets/man.jpg')} />*/}

				{/*Have the selection picker for the translation*/}
				<View
					style={{
						flex: 0,
						backgroundColor: 'transparent',
						alignItems: 'center',
						justifyContent: 'space-evenly',
						position: "relative",
						paddingTop: 50 // or marginTop: 50, adjust the value as needed
					}}>
					<PageTitle style={{ fontSize: 20 }}>{t('Select your problematic areas')}</PageTitle>
				</View>

				<View>
					{renderBody()}
				</View>

				<WelcomeContainer>
					<StyledFormArea>
						<StyledButton  onPress={() => navigation.navigate('LifeQuality1')}>
							<ButtonText >{t('Select')}</ButtonText>
							{/*<Fontisto name="person" color={primary} size={15} />*/}
						</StyledButton>

					</StyledFormArea>
				</WelcomeContainer>
			</InnerContainer>
		</>
	);
};


const styles = StyleSheet.create({
	bodyContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 500
	},
});


export default BodyPartSelection;
