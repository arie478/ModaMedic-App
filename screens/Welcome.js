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

const { brand, darkLight, primary } = Colors;

const googleFitScopes = [
	'https://www.googleapis.com/auth/fitness.activity.read',
	'https://www.googleapis.com/auth/fitness.location.read',
	'https://www.googleapis.com/auth/fitness.sleep.read',
];
const expoClientId = '378094607252-i9tph8hef6r12felmk5h8ahidfrs4jng.apps.googleusercontent.com';
const androidClientId = '378094607252-v6ti9l876903jmhm2r26pq75mno7lup6.apps.googleusercontent.com';

const getStepsCount = async (token, userToken) => {
	const dataSource = 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps';
	const uri = backendPaths.API_URL.metrics + '/steps';
	const data = await getFitData(token, dataSource);
	const points = data.point;
	const headers = { 'x-auth-token': userToken };
	const values = points.map(point => point.value.map(v => v.intVal));
	const stepsCount = values.reduce((previousValue, currentValue) => previousValue + Number(currentValue), 0);
	const dataToSend = {
		ValidTime: Date.now().valueOf(),
		Data: stepsCount,
	};
	await axios.post(uri, dataToSend, { headers: headers });
};

const getDistanceCount = async (token, userToken) => {
	const dataSource = 'derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta';
	const uri = backendPaths.API_URL.metrics + '/distance';
	const data = await getFitData(token, dataSource);
	const values = data.point.map(point => point.value.map(v => v.fpVal));

	const distanceCount = values.reduce((previousValue, currentValue) => previousValue + Number(currentValue), 0);

	const headers = { 'x-auth-token': userToken };
	const dataToSend = {
		ValidTime: Date.now().valueOf(),
		Data: distanceCount,
	};
	await axios.post(uri, dataToSend, { headers: headers });
};

const getCaloriesCount = async (token, userToken) => {
	const dataSource = 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended';
	const uri = backendPaths.API_URL.metrics + '/calories';
	const data = await getFitData(token, dataSource);
	const values = data.point.map(point => point.value.map(v => v.fpVal));
	const caloriesCount = values.reduce((previousValue, currentValue) => previousValue + Number(currentValue), 0);

	const headers = { 'x-auth-token': userToken };
	const dataToSend = {
		ValidTime: Date.now().valueOf(),
		Data: caloriesCount,
	};
	await axios.post(uri, dataToSend, { headers: headers });
};

const getSleepCount = async (token, userToken) => {
	const dataSource = 'derived:com.google.sleep.segment:com.google.android.gms:merged';
	const uri = backendPaths.API_URL.metrics + '/sleep';
	const data = await getFitData(token, dataSource);
	const headers = { 'x-auth-token': userToken };
	const item = { StartTime: 0, EndTime: 0, State: '' };
	const dataToSend = {
		ValidTime: Date.now().valueOf(),
		Data: [],
	};
	await axios.post(uri, dataToSend, { headers: headers });
};

const getActivityCount = async (token, userToken) => {
	const dataSource = 'derived:com.google.activity.segment:com.google.android.gms:merge_activity_segments';
	const uri = backendPaths.API_URL.metrics + '/activity';

	const data = await getFitData(token, dataSource);
	const headers = { 'x-auth-token': userToken };
	const item = { StartTime: 0, EndTime: 0, State: '' };
	const dataToSend = {
		ValidTime: Date.now().valueOf(),
		Data: [],
	};
	await axios.post(uri, dataToSend, { headers: headers });
};

const getFitData = async (token, dataSource) => {
	const getConfig = { headers: { Authorization: `Bearer ${token}` } };
	const datePadding = '000000000';

	const dateNowAsNumber = (Date.now().valueOf() / 1000).toFixed(0);
	const dateNowAsString = String(dateNowAsNumber) + datePadding;

	const lastYearAsNumber = (moment().subtract(1, 'day').valueOf() / 1000).toFixed(0);
	const lastYearAsString = String(lastYearAsNumber) + datePadding;

	const getStepsUri = `https://fitness.googleapis.com/fitness/v1/users/me/dataSources/${dataSource}/datasets/${dateNowAsString}-${lastYearAsString}`;

	const result = await axios.get(getStepsUri, getConfig);
	return result.data;
};

const addDocToDatabase = async (collection, data) => {
	const databaseUri = '';

	const result = await axios.post(databaseUri);
};

const Welcome = ({ navigation }) => {
	// const [storedCredentials, setStoredCredentials] = useContext(CredentialsContext);
	const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
	// console.log("storedCredentials", storedCredentials);
	const { name } = storedCredentials;
	const { First_Name } = storedCredentials;
	const [request, response, promptAsync] = Google.useAuthRequest({
		expoClientId: expoClientId,
		androidClientId: androidClientId,
		scopes: googleFitScopes,
	});

	const accessToken = response?.authentication?.accessToken;

	useEffect(() => {
		const accessToken = response?.authentication?.accessToken;
		if (accessToken) {
			getStepsCount(accessToken, storedCredentials.token);
			getActivityCount(accessToken, storedCredentials.token);
			getCaloriesCount(accessToken, storedCredentials.token);
			getDistanceCount(accessToken, storedCredentials.token);
			getSleepCount(accessToken, storedCredentials.token);
		}
	}, [response]);

	const clearLogin = () => {
		AsyncStorage.removeItem('loginCredentials')
			.then(() => {
				setStoredCredentials('');
			})
			.catch(error => console.log(error));
	};

	return (
		<>
			<StatusBar style="light" />
			<InnerContainer>
				{/*<WelcomeContainerHeader>*/}
				{/*</WelcomeContainerHeader>*/}
				{/*<WelcomeImage resizeMode="contain" source={require('../assets/man.jpg')} />*/}
				<WelcomeContainer>
					<Avatar welcomeLeftIcon={true} source={require('../assets/notif_icon.png')} />

					<PageTitle welcome={true}>Welcome</PageTitle>
					<SubTitle welcome={true}>{name || First_Name || 'Hello User'}</SubTitle>
					{/*<SubTitle welcome={true}>{ 'Hello User'}</SubTitle>*/}

					<StyledFormArea>
						<Avatar resizeMode="cover" source={require('../assets/new_body.png')} />
						<SubTitle welcomeHeader={true}>Date Of Surgery: 29/11/2022</SubTitle>

						<StyledButton welcome={true} onPress={() => navigation.navigate('DailyQuestion')}>
							<ButtonText welcome={true}>Daily Questionnaires</ButtonText>
							<Fontisto name="table-1" color={primary} size={15} />
						</StyledButton>
						<StyledButton welcome={true} onPress={() => navigation.navigate('LifeQuality1')}>
							<ButtonText welcome={true}>Life Quality Questionnaires</ButtonText>
							<Fontisto name="table-1" color={primary} size={15} />
						</StyledButton>
						<StyledButton onPress={() => navigation.navigate('HomeVideoExercise')} welcome={true}>
							<ButtonText welcome={true}>Home Video Exercise</ButtonText>

							<Fontisto name="youtube-play" color={primary} size={15} />
						</StyledButton>
						<StyledButton welcome={true} onPress={() => navigation.navigate('PersonalDetails')}>
							<ButtonText welcome={true}>Personal Details</ButtonText>
							<Fontisto name="person" color={primary} size={15} />
						</StyledButton>
						<StyledButton
							disabled={accessToken}
							style={accessToken && { backgroundColor: 'gray' }}
							google={true}
							onPress={() => promptAsync({ showInRecents: true })}>
							<Fontisto name="google" color={primary} size={25} />
							<ButtonText google={true}>{accessToken ? 'Connected!' : 'Connect to Google Fit'}</ButtonText>
						</StyledButton>
						<Line />
						<StyledButton onPress={clearLogin}>
							<ButtonText>Logout</ButtonText>
						</StyledButton>
					</StyledFormArea>
				</WelcomeContainer>
			</InnerContainer>
		</>
	);
};

export default Welcome;
