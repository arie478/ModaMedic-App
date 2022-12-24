import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Question = ({ question, questionId, answers, onAnswer }) => {
	const { top } = useSafeAreaInsets();
	return (
		<View style={{ paddingTop: top + 50, paddingHorizontal: 8 }}>
			<Text style={{ textAlign: 'center', fontSize: 22, marginBottom: 10 }}>{question}</Text>
			{answers?.map((answer, index) => (
				<TouchableOpacity key={answer} onPress={() => onAnswer({ QuestionID: questionId, AnswerID: [index] })}>
					<View style={{ backgroundColor: 'lightgray', borderRadius: 8, marginVertical: 8, padding: 8 }}>
						<Text style={{ textAlign: 'center', fontSize: 18 }}>{answer}</Text>
					</View>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Question;
