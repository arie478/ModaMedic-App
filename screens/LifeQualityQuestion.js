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
import SelectedPartsContext from "../components/SelectedPartsContext";

export const LifeQualityQuestion = ({ route, navigation }) => {

    async function scheduleDailyQuestionnaireNotification() {

        const daysInMonth = 30; // Assuming a month has 30 days

        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'ModaMedic Reminder',
                body: "Don't forget to fill out your monthly questionnaire."
            },
            trigger: {
                seconds: daysInMonth * 24 * 60 * 60, // Convert days to seconds
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

    const { t } = useTranslation();

    const [selectedParts, setSelectedParts] = useContext(SelectedPartsContext);

    //Defines the body zones groups and what body parts are a part of the whole group
    const groups = {
        head: ['head', 'neck'],
        chest: ['chest'],
        back: ['trapezius', 'upper-back', 'lower-back'],
        arms: ['biceps', 'triceps', 'forearm', 'front-deltoids'],
        abs: ['abs', 'obliques'],
        legs: ['adductor', 'hamstring', 'quadriceps', 'abductors', 'calves', 'gluteal', 'knees']
    };

    const {questionsData}= route.params;


    useEffect(() => {

        // This function will be executed only once when the component is first rendered
        //console.log('Component mounted');

        // If you need to perform any cleanup when the component unmounts,
        // you can return a cleanup function from the effect
        return () => {
            //console.log('Component unmounted');
        };


    }, []);

    const { storedCredentials } = useContext(CredentialsContext);

    //console.log(questions);



    const [answers, setAnswers] = useState({});

    const onAnswer = async (questionId, answer) => {

        //console.log("Current questions :", questionsData)


        setAnswers({ ...answers, [questionId]: answer });


        //console.log("questionsData");
        //console.log(questionsData);
        //const currentQuestion = questionsData.find((question) => question.id === questionId.QuestionID);
        //const nextQuestion = questionsData.find((question) => question.id > currentQuestion.id);

        // console.log("---");
        // console.log("questionId");
        // console.log(questionId);

        // if (nextQuestion) {
        //     console.log("nextQuestion.id");
        //     console.log(nextQuestion.id);
        // }
        // else
        //     console.log(nextQuestion);
        // console.log("---");



        // if (nextQuestion) {
        //     navigation.push('LifeQualityQuestion', {
        //         questionId: nextQuestion.id,
        //         questionsData: questionsData,
        //     });
        // } else {
        //     // Navigate to the next screen after all questions have been answered
        //     navigation.navigate('Welcome', { answers });
        // }

        if (questionNum + 1 < questionsData.length) {
            navigation.push('LifeQualityQuestion', {
                questionNum: questionNum + 1,
                questionsData: questionsData,
            });
        } else {
            // Navigate to the next screen after all questions have been answered
            Alert.alert(t("Form has been submitted"));

            navigation.navigate('Welcome', { answers });
        }
    };



    const { questionNum} = route.params;
    const question = questionsData[questionNum];

    // console.log("---");
    // console.log("Current Question");
    // console.log(question);
    // console.log("---");

    if (!question) {
        // Handle the case when the question is not available yet
        return null; // or show a loading spinner
    }

    return (
        <Question
            questionId={question.id}
            onAnswer={onAnswer}
            question={t(question.question)}
            answers={question.answers.map(t)}
        />

    );
};



// export const LifeQuality1 = ({ route, navigation }) => {
//     const onAnswer = answer => {
//         navigation.navigate('LifeQuality2', { ...route.params, LifeQuality1: answer });
//     };
//
//     /*
//       The useTranslation hook is a custom hook provided by the react-i18next library.
//       It allows you to access the t function in your functional React components.
//
//       The t function is a function that takes a string key and returns the corresponding translation in the current language.
//       It is used to translate strings in your component JSX.
//       */
//     const {t} = useTranslation();
//
//     return (
//         <Question
//             questionId={0}
//             onAnswer={onAnswer}
//             question={t('Which of the following statements regarding your mobility is the most accurate?')}
//             answers={[
//                 t("I have no problems walking"),
//                 t("I have some small walking issues"),
//                 t("I experience noticeable walking problems"),
//                 t("I suffer from great walking issues"),
//                 t("I am incapable of walking at all"),
//             ]}
//         />
//     );
// };
//
// export const LifeQuality2 = ({ route, navigation }) => {
//     const onAnswer = answer => {
//         navigation.navigate('LifeQuality3', { ...route.params, LifeQuality2: answer });
//     };
//
//     /*
//   The useTranslation hook is a custom hook provided by the react-i18next library.
//   It allows you to access the t function in your functional React components.
//
//   The t function is a function that takes a string key and returns the corresponding translation in the current language.
//   It is used to translate strings in your component JSX.
//   */
//     const {t} = useTranslation();
//
//     return (
//         <Question
//             questionId={1}
//             onAnswer={onAnswer}
//             question={t('Are you capable of caring for your personal needs?')}
//             answers={[
//                 t('I do not find it hard to bathe or get ready by myself'),
//                 t('I have small problems getting dressed or taking a bath'),
//                 t('I have moderate difficulties bathing or getting dressed'),
//                 t('I have a lot of trouble taking a shower or getting dressed'),
//                 t("I am incapable of washing myself or dressing up without assistance"),
//             ]}
//         />
//     );
// };
//
// export const LifeQuality3 = ({ route, navigation }) => {
//     const onAnswer = answer => {
//         navigation.navigate('LifeQuality4', { ...route.params, LifeQuality3: answer });
//     };
//
//     /*
// The useTranslation hook is a custom hook provided by the react-i18next library.
// It allows you to access the t function in your functional React components.
//
// The t function is a function that takes a string key and returns the corresponding translation in the current language.
// It is used to translate strings in your component JSX.
// */
//     const {t} = useTranslation();
//
//     return (
//         <Question
//             questionId={2}
//             onAnswer={onAnswer}
//             question={t('How does your disability or pain impact your ability to perform daily activities?')}
//             answers={[
//                 t('I have no problems carrying out my usual activities'),
//                 t('I have small troubles performing my daily activities'),
//                 t('I am having moderate trouble performing my everyday activities'),
//                 t('I really find it hard to do my regular activities'),
//                 t("I can't carry out my regular activities at all"),
//             ]}
//         />
//     );
// };
//
// export const LifeQuality4 = ({ route, navigation }) => {
//     const onAnswer = answer => {
//         navigation.navigate('LifeQuality5', { ...route.params, LifeQuality4: answer });
//     };
//
//     /*
// The useTranslation hook is a custom hook provided by the react-i18next library.
// It allows you to access the t function in your functional React components.
//
// The t function is a function that takes a string key and returns the corresponding translation in the current language.
// It is used to translate strings in your component JSX.
// */
//     const {t} = useTranslation();
//
//     return (
//         <Question
//             questionId={3}
//             onAnswer={onAnswer}
//             question={t('Do you experience pain or discomfort?')}
//             answers={[
//                 t("I'm pain-free and comfortable"),
//                 t('I do not feel much pain or discomfort'),
//                 t('I do experience slight pain or discomfort'),
//                 t('I am very uncomfortable or dealing with significant amount of pain'),
//                 t('I feel unbearable pain or anguish'),
//             ]}
//         />
//     );
// };
//
// export const LifeQuality5 = ({ route, navigation }) => {
//     const onAnswer = answer => {
//         navigation.navigate('LifeQuality6', { ...route.params, LifeQuality5: answer });
//     };
//
//
//     /*
// The useTranslation hook is a custom hook provided by the react-i18next library.
// It allows you to access the t function in your functional React components.
//
// The t function is a function that takes a string key and returns the corresponding translation in the current language.
// It is used to translate strings in your component JSX.
// */
//     const {t} = useTranslation();
//
//     return (
//         <Question
//             questionId={4}
//             onAnswer={onAnswer}
//             question={t('Do you ever feel anxious or depressed?')}
//             answers={[
//                 t('I do not experience anxiety or depression'),
//                 t('I feel a little nervous or down'),
//                 t("I'm nervous or mildly depressed"),
//                 t('I feel stressed or very depressed'),
//                 t('I\'m extremely depressed or anxious'),
//             ]}
//         />
//     );
// };
//
// export const LifeQuality6 = ({ route, navigation }) => {
//     const { top, bottom } = useSafeAreaInsets();
//     const [healthLevel, setHealthLevel] = useState(50);
//     const { storedCredentials } = useContext(CredentialsContext);
//
//     /*
//       The useTranslation hook is a custom hook provided by the react-i18next library.
//       It allows you to access the t function in your functional React components.
//
//       The t function is a function that takes a string key and returns the corresponding translation in the current language.
//       It is used to translate strings in your component JSX.
//       */
//     const {t} = useTranslation();
//
//     const onAnswer = async () => {
//         const uri = backendPath.API_URL.answers + '/sendAnswers';
//         const beforeAnswers = route.params;
//
//         const answers = Object.values(beforeAnswers);
//
//         const headers = { 'x-auth-token': storedCredentials.token };
//         const dataToSend = {
//             ValidTime: Date.now().valueOf(),
//             QuestionnaireID: 5,
//             Answers: [...answers, { QuestionID: 5, AnswerID: [healthLevel] }],
//         };
//         const result = await axios.post(uri, dataToSend, { headers: headers });
//         console.log(result.data);
//         Alert.alert(t("Form has been submitted"));
//
//         navigation.navigate('Welcome');
//     };
//
//     return (
//         <View
//             style={{
//                 flex: 1,
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 paddingTop: top + 40,
//                 paddingBottom: bottom,
//             }}>
//             <View>
//                 <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 4 }}>
//                     {t("What would you say the past two weeks have been like for your well being?")}
//                 </Text>
//                 <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 4 }}>{t("On a scale of 0 to 100")}</Text>
//                 <Text style={{ fontSize: 16, textAlign: 'center', marginVertical: 4 }}>
//                     {t("When the very worst state of health imaginable is 0 and 100 is the healthiest you can possibly imagine")}
//                 </Text>
//             </View>
//             <View
//                 style={{
//                     width: '100%',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     paddingHorizontal: 16,
//                 }}>
//                 <Text style={{ textAlign: 'center', fontSize: 22, marginBottom: 8 }}>{healthLevel}</Text>
//                 <Slider
//                     style={{ width: '100%', height: 40 }}
//                     value={healthLevel}
//                     minimumValue={0}
//                     maximumValue={100}
//                     minimumTrackTintColor="#52ba5b"
//                     maximumTrackTintColor="#9dbd9f"
//                     onValueChange={value => setHealthLevel(Number(value.toFixed(0)))}
//                 />
//                 <View
//                     style={{
//                         width: '100%',
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                     }}>
//                     <Text style={{ fontSize: 16, textAlign: 'center' }}>0</Text>
//                     <Text style={{ fontSize: 16, textAlign: 'center' }}>50</Text>
//                     <Text style={{ fontSize: 16, textAlign: 'center' }}>100</Text>
//                 </View>
//             </View>
//
//             <StyledButton onPress={onAnswer}>
//                 <ButtonText>{t("Send answer")}</ButtonText>
//             </StyledButton>
//         </View>
//     );
// };
