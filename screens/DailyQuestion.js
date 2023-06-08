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
import * as Notifications from 'expo-notifications';

// This line imports four scaling functions from the react-native-size-matters library
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';


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
		<View style={[styles.container, { paddingTop: top + verticalScale(30) }]}>
			<Text style={{ fontSize: moderateScale(20), textAlign: 'center' }}>{t("How would you rank your most severe pain you experienced today?")}</Text>
			<View style={styles.painList}>
				<Text style={{ textAlign: 'center' }}>{t("I did not experience pain at all")}</Text>

				{colors.map((color, index) => (
					<TouchableOpacity
						key={color}
						onPress={() => navigation.navigate('DailyQuestionMedication', { painLevel: index + 1 })}>
						<View key={`${color}${index}`} style={[{ backgroundColor: color }, styles.pain]}>
							<Text style={{ fontSize: moderateScale(18) }}>{index + 1}</Text>
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
		flexDirection: 'column',
		alignItems: 'center',
		paddingHorizontal: moderateScale(5),
		height: verticalScale(200),
	},
	painList: { marginTop: verticalScale(10) },
	pain: { alignItems: 'center', justifyContent: 'center', width: scale(250), height: verticalScale(40), marginVertical: moderateScale(4), borderRadius: 8 },
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
				repeats: false,
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