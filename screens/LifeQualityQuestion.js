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
            question={t('MOBILITY')}
            answers={[
                t("I have no problems in walking about"),
                t("I have slight problems in walking about"),
                t("I have moderate problems in walking about"),
                t("I have severe problems in walking about"),
                t("I am unable to walk about"),
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
            question={t('SELF-CARE')}
            answers={[
                t('I have no problems washing or dressing myself'),
                t('I have slight problems washing or dressing myself'),
                t('I have moderate problems washing or dressing myself'),
                t('I have severe problems washing or dressing myself'),
                t("I am unable to wash or dress myself"),
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
            question={t('USUAL ACTIVITIES (e.g. work, study, housework, family or leisure activities)')}
            answers={[
                t('I have no problems doing my usual activities'),
                t('I have slight problems doing my usual activities'),
                t('I have moderate problems doing my usual activities'),
                t('I have severe problems doing my usual activities'),
                t('I am unable to do my usual activities'),
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
            question={t('PAIN / DISCOMFORT')}
            answers={[
                t("I have no pain or discomfort"),
                t('I have slight pain or discomfort'),
                t('I have moderate pain or discomfort'),
                t('I have severe pain or discomfort'),
                t('I have extreme pain or discomfort'),
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
            question={t('ANXIETY / DEPRESSION')}
            answers={[
                t('I am not anxious or depressed'),
                t('I am slightly anxious or depressed'),
                t("I am moderately anxious or depressed"),
                t('I am severely anxious or depressed'),
                t('I am extremely anxious or depressed'),
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
                <Text style={{ fontSize: 22, textAlign: 'center', marginVertical: 4 }}>{t("We would like to know how good or bad your health is TODAY.") + "\n"}</Text>
                <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 4 }}>{t("This scale is numbered from 0 to 100.")}</Text>
                <Text style={{ fontSize: 16, textAlign: 'center', marginVertical: 4 }}>{t("0 means the worst health you can imagine.")}</Text>
                <Text style={{ fontSize: 16, textAlign: 'center', marginVertical: 4 }}>{t("100 means the best health you can imagine.")}</Text>
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
