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

export const CustomQuestion = ({ route, navigation }) => {

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
        //     navigation.push('CustomQuestionQuestion', {
        //         questionId: nextQuestion.id,
        //         questionsData: questionsData,
        //     });
        // } else {
        //     // Navigate to the next screen after all questions have been answered
        //     navigation.navigate('Welcome', { answers });
        // }

        if (questionNum + 1 < questionsData.length) {
            navigation.push('CustomQuestion', {
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

