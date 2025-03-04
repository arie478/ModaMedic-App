import React, {useContext, useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Formik} from 'formik';
import {Ionicons} from '@expo/vector-icons';
import { Text } from 'react-native';

import {
    ButtonText,
    Colors,
    InnerContainer,
    LeftIcon,
    Line,
    MsBox,
    PageLogo,
    PageTitle,
    SubTitle,
    RightIcon,
    StyledButton,
    StyledFormArea,
    StyledInputLabel,
    StyledTextInput, WelcomeContainerHeader,
} from '../components/styles';
import {ActivityIndicator, Alert, Button, Modal, Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
// import ModalDropdown from 'react-native-modal-dropdown';
import {Picker} from '@react-native-picker/picker';
import {CredentialsContext} from '../components/CredentialsContext';

import ENV from "../environment";
import {useTranslation} from "react-i18next";
import {scale, verticalScale} from "react-native-size-matters";

const {brand, darkLight, primary} = Colors;

const UpdateSurgeryDate = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2023, 0, 1));
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const {storedCredentials} = useContext(CredentialsContext);
    const [SurgeryDate, setSurgeryDate] = useState();
    // const [usrInfo, setUsrInfo] = useState();
    var usrInfo = undefined;

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setSurgeryDate(currentDate);
        Platform.OS === 'android' && setShow(false);
    };


    useEffect(() => {
        const fetchSurgeryDate = async () => {
          handleMessage(null);
          try {
            const response = await axios.get(ENV.API_URL.userDetalis + "/userInfo", {
              headers: { 'x-auth-token': storedCredentials.token }
            })
            .then((response) => {
              console.log(response.data);
              usrInfo = response.data;
            })
            .catch((error) => {
                console.log('error', error);
                handleMessage(t("Something went wrong. Please try again later."));
            });
            if (usrInfo.data["DateOfSurgery"] !== null) {
              setSurgeryDate(new Date(usrInfo.data["DateOfSurgery"]));
            }
          } catch (error) {
            console.log('error', error);
            handleMessage(t("Something went wrong. Please try again later."));
          }
        };
      
        fetchSurgeryDate();
      }, []);

    const showDatePicker = () => {
        console.log('showDatePicker');
        setShow(true);
    };


    const handleDateUpdate = (data, setSubmitting) => {
        handleMessage(null);
        const url = ENV.API_URL.userDetalis + "/changeDateOfSurgery"; //Todo change to
        const headers = {'x-auth-token': storedCredentials.token};
        data = {
            ...data,
            DateOfSurgery: SurgeryDate.getTime(),
            changedSurgeryDate: true
        };
        axios
            .post(url, data, {headers: headers})
            .then((response) => {
                console.log(response.data);
                Alert.alert(t("Surgery date successfully updated"))
                setSubmitting(false);
                navigation.goBack();
                // navigation.navigate('PersonalDetails');
            })
            .catch((error) => {
                console.log('error', error);
                setSubmitting(false);
                handleMessage(t("Something went wrong. Please try again later."));
            });
    };



    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    /*
      The useTranslation hook is a custom hook provided by the react-i18next library.
      It allows you to access the t function in your functional React components.

      The t function is a function that takes a string key and returns the corresponding translation in the current language.
      It is used to translate strings in your component JSX.
      */
    const {t} = useTranslation();

    return (
        <ScrollView>
            <StatusBar style="dark"/>
            <InnerContainer>
                <StyledFormArea>
                    {/* <SubTitle welcomeHeader={true}>{t('Surgery Date:')} <Text>{SurgeryDate}</Text></SubTitle> */}
                    <Modal animationType="fade" visible={show} transparent={true}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(1,1,1,0.3)'
                        }}>
                            <View style={{backgroundColor: 'gray', borderRadius: 8, padding: 6, width: 330, margin: 8}}>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode="date"
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={onChange}
                                />
                                <View style={{width: 330}}>
                                    <Button color={'black'} title={'Choose Date'} onPress={() => setShow(false)}/>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </StyledFormArea>
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
                </WelcomeContainerHeader>
                <PageTitle style={{ marginTop: -50 }} welcome={true}>{t("Surgery Date")}</PageTitle>

                <Formik
                    initialValues={{
                        First_Name: '',
                        Last_Name: '',
                        UserID: '',
                        BirthDate: 786146400000,
                        Password: '',
                        confirmPassword: '',
                        Phone_Number: '',
                        Gender: '',
                        Smoke: '',
                        SurgeryType: '',
                        Education: '',
                        Height: '',
                        Weight: '',
                        BMI: '',
                        DateOfSurgery: 786146400000,
                        Questionnaires: '',
                        VerificationQuestion: 0,
                        VerificationAnswer: 'Leo',
                        Code: 'soroka372abc',
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        // if (values.Smoke === '' || values.Gender === '') {
                        //   handleMessage('Please fill all the fields');
                        //   setSubmitting(false);
                        // } else {
                        handleDateUpdate(values, setSubmitting);
                        // }
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                        <StyledFormArea>
                            <MyTextInput
                                label={t("Surgery Date")}
                                icon="calendar"
                                placeholder="YYYY - MM - DD" //TODO get personal birth date from server
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('DateOfSurgery')}
                                onBlur={handleBlur('DateOfSurgery')}
                                value={SurgeryDate ? SurgeryDate.toLocaleDateString('en-GB').toString() : ''}
                                isDate={true}
                                editable={false}
                                showDatePicker={showDatePicker}
                            />

                            <MsBox type={messageType}>{message}</MsBox>
                            {!isSubmitting && (
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>{t("Update information")}</ButtonText>
                                </StyledButton>
                            )}
                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary}/>
                                </StyledButton>
                            )}
                            <Line/>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </ScrollView>
    );
};

const MyTextInput = ({
                         isPicker,
                         label,
                         icon,
                         isPassword,
                         hidePassword,
                         setHidePassword,
                         isDate,
                         showDatePicker,
                         showPicker,
                         ...props
                     }) => {
    return (
        <View>
            <LeftIcon>
                <Ionicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && !isPicker && <StyledTextInput {...props} />}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput pointerEvents={'none'} {...props} />
                </TouchableOpacity>
            )}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                </RightIcon>
            )}
            {isPicker && (
                <TouchableOpacity onPress={showPicker}>
                    <StyledTextInput editable={false} pointerEvents={'none'} {...props} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default UpdateSurgeryDate;
