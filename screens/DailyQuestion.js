import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import Question from '../components/Question';
import backendPath from '../environment';

import { ButtonText, StyledButton } from '../components/styles';
import axios from 'axios';
import { CredentialsContext } from '../components/CredentialsContext';

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
	return (
		<View style={[styles.container, { paddingTop: top + 20 }]}>
			<Text style={{ fontSize: 20, textAlign: 'center' }}>What is the maximum level of pain experienced today?</Text>
			<View style={styles.painList}>
				<Text style={{ textAlign: 'center' }}>No pain at all</Text>

				{colors.map((color, index) => (
					<TouchableOpacity
						key={color}
						onPress={() => navigation.navigate('DailyQuestionMedication', { painLevel: index + 1 })}>
						<View key={`${color}${index}`} style={[{ backgroundColor: color }, styles.pain]}>
							<Text style={{ fontSize: 18 }}>{index + 1}</Text>
						</View>
					</TouchableOpacity>
				))}
				<Text style={{ textAlign: 'center' }}>Unbearable pain</Text>
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

export const DailyQuestionMedication = ({ route, navigation }) => {
	const { storedCredentials } = useContext(CredentialsContext);
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
		Alert.alert('Form Submitted');
		navigation.navigate('Welcome');
	};

	return (
		<Question
			questionId={1}
			onAnswer={onAnswer}
			question={'What kind of medication did you take today?'}
			answers={[
				'I did not take',
				'Basic (ACAMOL, OPTALGIN, ARCOXIA, BREXIN, ETOPAN)',
				'ADVANCED (ZALDIAR, TRAMADEX)',
				'NARCOTIC (OXYCONTIN, PERCOCET, FENTANYL, CANNABIS) I did not take',
			]}
		/>
	);
};

export default DailyQuestion;

export const LifeQuality1 = ({ route, navigation }) => {
	const onAnswer = answer => {
		navigation.navigate('LifeQuality2', { ...route.params, LifeQuality1: answer });
	};

	return (
		<Question
			questionId={0}
			onAnswer={onAnswer}
			question={'Mobility'}
			answers={[
				"I DON'T HAVE ANY WALKING PROBLEMS",
				'I HAVE MINOR WALKING PROBLEMS',
				'I HAVE MODERATE WALKING PROBLEMS',
				'I HAVE SERIOUS WALKING PROBLEMS',
				"I CAN'T WALK",
			]}
		/>
	);
};

export const LifeQuality2 = ({ route, navigation }) => {
	const onAnswer = answer => {
		navigation.navigate('LifeQuality3', { ...route.params, LifeQuality2: answer });
	};

	return (
		<Question
			questionId={1}
			onAnswer={onAnswer}
			question={'Self-care'}
			answers={[
				'I HAVE NO TROUBLE BATHING OR DRESSING MYSELF',
				'I HAVE MINOR PROBLEMS BATHING OR DRESSING MYSELF',
				'I AM HAVING TROUBLE PROBLEMS BATHING OR DRESSING MYSELF TO A MODERATE DEGREE',
				'I HAVE SERIOUS PROBLEMS BATHING OR DRESSING MYSELF',
				"I CAN'T WASH OR DRESS MYSELF",
			]}
		/>
	);
};

export const LifeQuality3 = ({ route, navigation }) => {
	const onAnswer = answer => {
		navigation.navigate('LifeQuality4', { ...route.params, LifeQuality3: answer });
	};

	return (
		<Question
			questionId={2}
			onAnswer={onAnswer}
			question={'Regular activities such as school, work,family time, home work or leisure activities'}
			answers={[
				'I HAVE NO PROBLEMS TO DO MY NORMAL ACTIVITIES',
				'I HAVE MINOR PROBLEMS TO DO MY NORMAL ACTIVITIES',
				'IM HAVING TROUBLE DOING MY NORMAL ACTIVITIES TO A MEDIUM DEGREE',
				'I HAVE SERIOUS PROBLEMS TO DO MY NORMAL ACTIVITIES',
				'I AM UNABLE TO DO MY NORMAL ACTIVITIES',
			]}
		/>
	);
};

export const LifeQuality4 = ({ route, navigation }) => {
	const onAnswer = answer => {
		navigation.navigate('LifeQuality5', { ...route.params, LifeQuality4: answer });
	};

	return (
		<Question
			questionId={3}
			onAnswer={onAnswer}
			question={'Pain / Discomfort'}
			answers={[
				'I HAVE NO PAIN OR DISCOMFORT',
				'I HAVE LITTLE PAIN OR DISCOMFORT',
				'I HAVE PAIN OR MODERATE DISCOMFORT',
				'I HAVE SEVERE PAIN OR DISCOMFORT',
				'I HAVE EXTREME PAIN OR DISCOMFORT',
			]}
		/>
	);
};

export const LifeQuality5 = ({ route, navigation }) => {
	const onAnswer = answer => {
		navigation.navigate('LifeQuality6', { ...route.params, LifeQuality5: answer });
	};

	return (
		<Question
			questionId={4}
			onAnswer={onAnswer}
			question={'Anxiety / Depression'}
			answers={[
				'I AM NOT ANXIOUS OR DEPRESSED',
				'I AM SLIGHTLY ANXIOUS OR DEPRESSED',
				'I AM ANXIOUS OR MODERATELY DEPRESSED',
				'I AM ANXIOUS OR LARGELY DEPRESSED',
				'I AM ANXIOUS OR EXTREMELY DEPRESSED',
			]}
		/>
	);
};

export const LifeQuality6 = ({ route, navigation }) => {
	const { top, bottom } = useSafeAreaInsets();
	const [healthLevel, setHealthLevel] = useState(50);
	const { storedCredentials } = useContext(CredentialsContext);

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
		Alert.alert('Form Submitted');

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
					How would you rate your health in the last two weeks?
				</Text>
				<Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 4 }}>Rate between 0 to 100</Text>
				<Text style={{ fontSize: 16, textAlign: 'center', marginVertical: 4 }}>
					When O is the worst health condition you can imagine And 100 is the best health condition you can imagine
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
				<ButtonText>Send Information</ButtonText>
			</StyledButton>
		</View>
	);
};
