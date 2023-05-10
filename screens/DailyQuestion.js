import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import Question from '../components/Question';
import backendPath from '../environment';

import { ButtonText, StyledButton } from '../components/styles';
import axios from 'axios';
import { CredentialsContext } from '../components/CredentialsContext';
import {useTranslation} from "react-i18next";

// Imports library to handle in app notifications
import { Notifications } from 'expo-notifications';



const DailyQuestion = ({ navigation }) => {
	const { top } = useSafeAreaInsets();
	const colors = [
		'#00FF00',
		'#3FD104',
		'#5FBA06',
		'#7EA208',
		'#9E8B0A',
		'#BD730C',
		'#DD5C0E',
		'#E5560F',
		'#ED500F',
		'#FC440F',
	];

	/*
      The useTranslation hook is a custom hook provided by the react-i18next library.
      It allows you to access the t function in your functional React components.

      The t function is a function that takes a string key and returns the corresponding translation in the current language.
      It is used to translate strings in your component JSX.
      */
	const {t} = useTranslation();

	return (
		<View style={[styles.container, { paddingTop: top + 20 }]}>
			<Text style={{ fontSize: 20, textAlign: 'center' }}>{t("How would you rank your most severe pain you experienced today?")}</Text>
			<View style={styles.painList}>
				<Text style={{ textAlign: 'center' }}>{t("I did not experience pain at all")}</Text>

				{colors.map((color, index) => (
					<TouchableOpacity
						key={color}
						onPress={() => navigation.navigate('DailyQuestionMedication', { painLevel: index + 1 })}>
						<View key={`${color}${index}`} style={[{ backgroundColor: color }, styles.pain]}>
							<Text style={{ fontSize: 18 }}>{index + 1}</Text>
						</View>
					</TouchableOpacity>
				))}
				<Text style={{ textAlign: 'center' }}>{t("I was in excruciating pain")}</Text>
			</View>
			<View />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		paddingHorizontal: 8,
	},
	painList: { marginTop: 40 },
	pain: { alignItems: 'center', justifyContent: 'center', width: 100, height: 44, marginVertical: 4, borderRadius: 8 },
});


const NOTIFICATION_HOUR = 12;

export const DailyQuestionMedication = ({ route, navigation }) => {

	const { storedCredentials } = useContext(CredentialsContext);

	async function scheduleDailyQuestionnaireNotification() {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: 'ModaMedic Reminder',
				body: "Don't forget to fill out your daily questionnaire."
			},
			trigger: {
				hour: NOTIFICATION_HOUR,
				minute: 0,
				repeats: true,
			},
		});
	}

	useEffect(() => {
		scheduleDailyQuestionnaireNotification();
	}, []);


	async function resetNotificationTimer()  {
		await Notifications.cancelAllScheduledNotificationsAsync();
		await scheduleDailyQuestionnaireNotification();
	}

	const onAnswer = async answer => {
		const uri = backendPath.API_URL.answers + '/sendAnswers';
		const paintLevel = route.params.painLevel;
		const headers = { 'x-auth-token': storedCredentials.token };
		const dataToSend = {
			ValidTime: Date.now().valueOf(),
			QuestionnaireID: 0,
			Answers: [{ QuestionID: 0, AnswerID: [paintLevel] }, answer],
		};

		const result = await axios.post(uri, dataToSend, { headers: headers });
		console.log('result', result.data);


		// Reset the notification timer
		await resetNotificationTimer();

		Alert.alert(t("Form has been submitted"));
		navigation.navigate('Welcome');
	};

	/*
      The useTranslation hook is a custom hook provided by the react-i18next library.
      It allows you to access the t function in your functional React components.

      The t function is a function that takes a string key and returns the corresponding translation in the current language.
      It is used to translate strings in your component JSX.
      */
	const {t} = useTranslation();

	return (
		<Question
			questionId={1}
			onAnswer={onAnswer}
			question={t('Which type of medicine did you take today?')}
			answers={[
				t("I did not take any"),
				t("Paracetamol (Acamol, Dexamol) and Dipyrone(Optalgin)"),
				t("NSAIDs (Optalgin, Arcoxia, Brexin, Etopan)"),
				t("Opioids (Termadex, Zaldiar, Oxycontin, Percocet, Fentanyl)"),
				t("Cannabinoids (Cannabis)")
			]}
		/>
	);
};

export default DailyQuestion;

export const LifeQuality1 = ({ route, navigation }) => {
	const onAnswer = answer => {
		navigation.navigate('LifeQuality2', { ...route.params, LifeQuality1: answer });
	};

	/*
      The useTranslation hook is a custom hook provided by the react-i18next library.
      It allows you to access the t function in your functional React components.

      The t function is a function that takes a string key and returns the corresponding translation in the current language.
      It is used to translate strings in your component JSX.
      */
	const {t} = useTranslation();

	return (
		<Question
			questionId={0}
			onAnswer={onAnswer}
			question={t('Which of the following statements regarding your mobility is the most accurate?')}
			answers={[
				t("I have no problems walking"),
				t("I have some small walking issues"),
				t("I experience noticeable walking problems"),
				t("I suffer from great walking issues"),
				t("I am incapable of walking at all"),
			]}
		/>
	);
};

export const LifeQuality2 = ({ route, navigation }) => {
	const onAnswer = answer => {
		navigation.navigate('LifeQuality3', { ...route.params, LifeQuality2: answer });
	};

	/*
  The useTranslation hook is a custom hook provided by the react-i18next library.
  It allows you to access the t function in your functional React components.

  The t function is a function that takes a string key and returns the corresponding translation in the current language.
  It is used to translate strings in your component JSX.
  */
	const {t} = useTranslation();

	return (
		<Question
			questionId={1}
			onAnswer={onAnswer}
			question={t('Are you capable of caring for your personal needs?')}
			answers={[
				t('I do not find it hard to bathe or get ready by myself'),
				t('I have small problems getting dressed or taking a bath'),
				t('I have moderate difficulties bathing or getting dressed'),
				t('I have a lot of trouble taking a shower or getting dressed'),
				t("I am incapable of washing myself or dressing up without assistance"),
			]}
		/>
	);
};

export const LifeQuality3 = ({ route, navigation }) => {
	const onAnswer = answer => {
		navigation.navigate('LifeQuality4', { ...route.params, LifeQuality3: answer });
	};

	/*
The useTranslation hook is a custom hook provided by the react-i18next library.
It allows you to access the t function in your functional React components.

The t function is a function that takes a string key and returns the corresponding translation in the current language.
It is used to translate strings in your component JSX.
*/
	const {t} = useTranslation();

	return (
		<Question
			questionId={2}
			onAnswer={onAnswer}
			question={t('How does your disability or pain impact your ability to perform daily activities?')}
			answers={[
				t('I have no problems carrying out my usual activities'),
				t('I have small troubles performing my daily activities'),
				t('I am having moderate trouble performing my everyday activities'),
				t('I really find it hard to do my regular activities'),
				t("I can't carry out my regular activities at all"),
			]}
		/>
	);
};

export const LifeQuality4 = ({ route, navigation }) => {
	const onAnswer = answer => {
		navigation.navigate('LifeQuality5', { ...route.params, LifeQuality4: answer });
	};

		/*
	The useTranslation hook is a custom hook provided by the react-i18next library.
	It allows you to access the t function in your functional React components.

	The t function is a function that takes a string key and returns the corresponding translation in the current language.
	It is used to translate strings in your component JSX.
	*/
	const {t} = useTranslation();

	return (
		<Question
			questionId={3}
			onAnswer={onAnswer}
			question={t('Do you experience pain or discomfort?')}
			answers={[
				t("I'm pain-free and comfortable"),
				t('I do not feel much pain or discomfort'),
				t('I do experience slight pain or discomfort'),
				t('I am very uncomfortable or dealing with significant amount of pain'),
				t('I feel unbearable pain or anguish'),
			]}
		/>
	);
};

export const LifeQuality5 = ({ route, navigation }) => {
	const onAnswer = answer => {
		navigation.navigate('LifeQuality6', { ...route.params, LifeQuality5: answer });
	};


		/*
	The useTranslation hook is a custom hook provided by the react-i18next library.
	It allows you to access the t function in your functional React components.

	The t function is a function that takes a string key and returns the corresponding translation in the current language.
	It is used to translate strings in your component JSX.
	*/
	const {t} = useTranslation();

	return (
		<Question
			questionId={4}
			onAnswer={onAnswer}
			question={t('Do you ever feel anxious or depressed?')}
			answers={[
				t('I do not experience anxiety or depression'),
				t('I feel a little nervous or down'),
				t("I'm nervous or mildly depressed"),
				t('I feel stressed or very depressed'),
				t('I\'m extremely depressed or anxious'),
			]}
		/>
	);
};

export const LifeQuality6 = ({ route, navigation }) => {
	const { top, bottom } = useSafeAreaInsets();
	const [healthLevel, setHealthLevel] = useState(50);
	const { storedCredentials } = useContext(CredentialsContext);

	/*
      The useTranslation hook is a custom hook provided by the react-i18next library.
      It allows you to access the t function in your functional React components.

      The t function is a function that takes a string key and returns the corresponding translation in the current language.
      It is used to translate strings in your component JSX.
      */
	const {t} = useTranslation();

	const onAnswer = async () => {
		const uri = backendPath.API_URL.answers + '/sendAnswers';
		const beforeAnswers = route.params;

		const answers = Object.values(beforeAnswers);

		const headers = { 'x-auth-token': storedCredentials.token };
		const dataToSend = {
			ValidTime: Date.now().valueOf(),
			QuestionnaireID: 5,
			Answers: [...answers, { QuestionID: 5, AnswerID: [healthLevel] }],
		};
		const result = await axios.post(uri, dataToSend, { headers: headers });
		console.log(result.data);
		Alert.alert(t("Form has been submitted"));

		navigation.navigate('Welcome');
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingTop: top + 40,
				paddingBottom: bottom,
			}}>
			<View>
				<Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 4 }}>
					{t("What would you say the past two weeks have been like for your well being?")}
				</Text>
				<Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 4 }}>{t("On a scale of 0 to 100")}</Text>
				<Text style={{ fontSize: 16, textAlign: 'center', marginVertical: 4 }}>
					{t("When the very worst state of health imaginable is 0 and 100 is the healthiest you can possibly imagine")}
				</Text>
			</View>
			<View
				style={{
					width: '100%',
					flexDirection: 'column',
					justifyContent: 'center',
					paddingHorizontal: 16,
				}}>
				<Text style={{ textAlign: 'center', fontSize: 22, marginBottom: 8 }}>{healthLevel}</Text>
				<Slider
					style={{ width: '100%', height: 40 }}
					value={healthLevel}
					minimumValue={0}
					maximumValue={100}
					minimumTrackTintColor="#52ba5b"
					maximumTrackTintColor="#9dbd9f"
					onValueChange={value => setHealthLevel(Number(value.toFixed(0)))}
				/>
				<View
					style={{
						width: '100%',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<Text style={{ fontSize: 16, textAlign: 'center' }}>0</Text>
					<Text style={{ fontSize: 16, textAlign: 'center' }}>50</Text>
					<Text style={{ fontSize: 16, textAlign: 'center' }}>100</Text>
				</View>
			</View>

			<StyledButton onPress={onAnswer}>
				<ButtonText>{t("Send answer")}</ButtonText>
			</StyledButton>
		</View>
	);
};
