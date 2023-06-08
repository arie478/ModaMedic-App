import React, {useContext, useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Formik} from 'formik';
import {Ionicons} from '@expo/vector-icons';

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
    StyledTextInput,
} from '../components/styles';
import {ActivityIndicator, Alert, Button, Modal, Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
// import ModalDropdown from 'react-native-modal-dropdown';
import {Picker} from '@react-native-picker/picker';
import {CredentialsContext} from '../components/CredentialsContext';

import ENV from "../environment";
import {useTranslation} from "react-i18next";

const {brand, darkLight, primary} = Colors;

const UpdatePersonalDetails = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [dob, setDob] = useState();
    const [showSmoke, setShowSmoke] = useState(false);
    const [selectedSmoke, setSelectedSmoke] = useState('');
    const [showGender, setShowGender] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');
    const [showAcademicStatus, setShowAcademicStatus] = useState(false);
    const [selectedAcademicStatus, setSelectedAcademicStatus] = useState('');
    const [showWorkType, setShowWorkType] = useState(false);
    const [selectedWorkType, setSelectedWorkType] = useState('');
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [userHeight, setUserHeight] = useState();
    const [userWeight, setUserWeight] = useState();
    const {storedCredentials} = useContext(CredentialsContext);
    const { name } = storedCredentials;
	const { First_Name } = storedCredentials;
    var usrInfo = undefined;

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setDob(currentDate);
        Platform.OS === 'android' && setShow(false);
    };

    const showDatePicker = () => {
        console.log('showDatePicker');
        setShow(true);
    };

    const showSmokePicker = () => {
        console.log('showSmokePicker');
        setShowSmoke(true);
    };

    const showGenderPicker = () => {
        console.log('showGenderPicker');
        setShowGender(true);
    };

    const showAcademicStatusPicker = () => {
        console.log('showAcademicStatusPicker');
        setShowAcademicStatus(true);
    };

    const showWorkTypePicker = () => {
        console.log('showWorkTypePicker');
        setShowWorkType(true);
    };

    const handleUpdate = (data, setSubmitting) => {
        handleMessage(null);
        const url = ENV.API_URL.personalDetalis; //Todo change to
        const headers = {'x-auth-token': storedCredentials.token};
        data = {
            ...data,
            "Gender": t(selectedGender, {lng: 'en'}),
            "Smoke": t(selectedSmoke, {lng: 'en'}),
            "Education": t(selectedAcademicStatus, {lng: 'en'}),
            "BirthDate": dob.getTime()
        }
        axios
            .post(url, data, {headers: headers})
            .then((response) => {
                console.log(response.data);
                Alert.alert(t("Personal Information successfully updated"))
                setSubmitting(false);
                navigation.goBack();
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

    useEffect(() => {
        const fetchUserInfo = async () => {
          handleMessage(null);
          try {
                const response = await axios.get(ENV.API_URL.userDetalis + "/userInfo", {
              headers: { 'x-auth-token': storedCredentials.token }
            })
            .then((response) => {
                console.log("feched user info");
                console.log(response.data);
                usrInfo = response.data;
            })
            .catch((error) => {
                console.log('error', error);
                handleMessage(t("Something went wrong. Please try again later."));
            });

            if (usrInfo.data["Gender"] === null || usrInfo.data["Gender"] === "") {
                setSelectedGender('Male');
            } else {
                const gender = usrInfo.data["Gender"].toString();
                setSelectedGender(gender);
            }
            
            if (usrInfo.data["Smoke"] === null || usrInfo.data["Smoke"] === "") {
                setSelectedSmoke("I don't smoke");
            } else {
                const smoke = usrInfo.data["Smoke"].toString();
                setSelectedSmoke(smoke);
            }
            
            if (usrInfo.data["Education"] === null || usrInfo.data["Education"] === "") {
                setSelectedAcademicStatus("Academic");
            } else {
                const education = usrInfo.data["Education"].toString();
                setSelectedAcademicStatus(education);
            }
            
            if (usrInfo.data["Height"] === null || usrInfo.data["Height"] === "") {
                setUserHeight('0');
            } else {
                const height = usrInfo.data["Height"].toString();
                setUserHeight(height);
            }
            
            if (usrInfo.data["Weight"] === null || usrInfo.data["Weight"] === "") {
                setUserWeight('0');
            } else {
                const weight = usrInfo.data["Weight"].toString();
                setUserWeight(weight);
            }
            
            if (usrInfo.data["BirthDate"] === null || usrInfo.data["BirthDate"] === "") {
                setDob(date);
            } else {
                const bDate = new Date(usrInfo.data["BirthDate"]);
                setDob(bDate);
            }            
            setSelectedWorkType("Office");

          } catch (error) {
            console.log('error', error);
            handleMessage(t("Something went wrong. Please try again later."));
          }
        };

        fetchUserInfo();
    }, []);

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
                <Modal animationType="fade" visible={showSmoke} transparent={true}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(1,1,1,0.3)'
                    }}>
                        <View style={{backgroundColor: 'gray', borderRadius: 8, padding: 6, width: 330, margin: 8}}> 
                            <Picker
                                selectedValue={selectedSmoke}
                                onValueChange={(itemValue, itemIndex) => setSelectedSmoke(itemValue)}
                            >
                                <Picker.Item label={t('I smoke')} value={t('I smoke')}/>
                                <Picker.Item label={t("I don't smoke")} value={t("I don't smoke")}/>
                            </Picker>
                            <View style={{width: 330}}>
                                <Button color={'black'} title={t('Select status')} onPress={() => setShowSmoke(false)}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal animationType="fade" visible={showGender} transparent={true}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(1,1,1,0.3)'
                    }}>
                        <View style={{backgroundColor: 'gray', borderRadius: 8, padding: 6, width: 330, margin: 8}}>
                            <Picker
                                selectedValue={selectedGender}
                                onValueChange={(itemValue, itemIndex) => setSelectedGender(itemValue)}
                            >
                                <Picker.Item label={t("Male")} value={t("Male")}/>
                                <Picker.Item label={t("Female")} value={t("Female")}/>
                            </Picker>
                            <View style={{width: 330}}>
                                <Button color={'black'} title={t("Select your gender")}
                                        onPress={() => setShowGender(false)}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal animationType="fade" visible={showAcademicStatus} transparent={true}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(1,1,1,0.3)'
                    }}>
                        <View style={{backgroundColor: 'gray', borderRadius: 8, padding: 6, width: 330, margin: 8}}>
                            <Picker
                                selectedValue={selectedAcademicStatus}
                                onValueChange={(itemValue, itemIndex) => setSelectedAcademicStatus(itemValue)}
                            >
                                <Picker.Item label={t("Academic")} value={t("Academic")}/>
                                <Picker.Item label={t("High-School")} value={t("High-School")}/>
                                <Picker.Item label={t("Between 10 to 12 years of formal education")}
                                             value={t("Between 10 to 12 years of formal education")}/>
                                <Picker.Item label={t("Between 6 to 9 years of formal education")}
                                             value={t("Between 6 to 9 years of formal education")}/>
                                <Picker.Item label={t("5 or less years of formal education")}
                                             value={t("5 or less years of formal education")}/>
                                <Picker.Item label={t("I would rather not disclose")}
                                             value={t("I would rather not disclose")}/>
                            </Picker>
                            <View style={{width: 330}}>
                                <Button color={'black'} title={t("Select your education level")}
                                        onPress={() => setShowAcademicStatus(false)}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal animationType="fade" visible={showWorkType} transparent={true}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(1,1,1,0.3)'
                    }}>
                        <View style={{backgroundColor: 'gray', borderRadius: 8, padding: 6, width: 330, margin: 8}}>
                            <Picker
                                selectedValue={selectedWorkType}
                                onValueChange={(itemValue, itemIndex) => setSelectedWorkType(itemValue)}
                            >
                                <Picker.Item label={t("Office")} value={t("Office")}/>
                                <Picker.Item label={t("Physical")} value={t("Physical")}/>
                            </Picker>
                            <View style={{width: 330}}>
                                <Button color={'black'} title={t("Select the nature of work")} //nature of work  or physical
                                        onPress={() => setShowWorkType(false)}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <PageLogo resizeMode="cover" source={require('../assets/app_logo.png')}/>
                <PageTitle welcome={true}>{t('Update Personal Information')}</PageTitle>
                <SubTitle welcome={true}>{name || First_Name || 'Hello User'}</SubTitle>
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
                        handleUpdate(values, setSubmitting);
                        // }
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                        <StyledFormArea>
                            <MyTextInput
                                label={t("Date of Birth")}
                                icon="calendar"
                                placeholder="YYYY - MM - DD" 
                                // placeholder={dob}
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('BirthDate')}
                                onBlur={handleBlur('BirthDate')}
                                value={dob ? dob.toString() : ''}
                                isDate={true}
                                editable={false}
                                showDatePicker={showDatePicker}
                            />
                            <MyTextInput
                                label={t('Smoking Habits')}
                                icon="person"
                                // placeholder={t("I don't smoke")}
                                placeholder={t(selectedSmoke)}
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('Smoke')}
                                onBlur={handleBlur('Smoke')}
                                isPicker={true}
                                value={selectedSmoke.toString()}
                                showPicker={showSmokePicker}
                            />
                            <MyTextInput
                                label={t("Gender")}
                                icon="person"
                                // placeholder={t("Male")}
                                placeholderTextColor={darkLight}
                                placeholder={t(selectedGender)}
                                
                                onChangeText={handleChange('Gender')}
                                onBlur={handleBlur('Gender')}
                                isPicker={true}
                                value={selectedGender.toString()}
                                showPicker={showGenderPicker}
                            />
                            <MyTextInput
                                label={t("Education level")}
                                icon="person"
                                placeholder={t(selectedAcademicStatus)}
                                // placeholder={t('Academic')}
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('Education')}
                                onBlur={handleBlur('Education')}
                                isPicker={true}
                                value={selectedAcademicStatus.toString()}
                                showPicker={showAcademicStatusPicker}
                            />
                            <MyTextInput
                                label={t("nature of work")}
                                icon="person"
                                placeholder={t(selectedWorkType)}
                                // placeholder={t('Academic')}
                                placeholderTextColor={darkLight}
                                // onChangeText={handleChange('Education')}
                                // onBlur={handleBlur('Education')}
                                isPicker={true}
                                value={selectedWorkType.toString()}
                                showPicker={showWorkTypePicker}
                            />
                            <MyTextInput
                                label={t("Height (cm)")}
                                icon="person"
                                // placeholder="175"
                                placeholder={userHeight}
                                // placeholderTextColor={darkLight}
                                onChangeText={handleChange('Height')}
                                onBlur={handleBlur('Height')}
                                value={values.Height}
                            />
                            <MyTextInput
                                label={t("Weight (kg)")}
                                icon="person"
                                // placeholder="75"
                                placeholder={userWeight}
                                // placeholderTextColor={darkLight}
                                onChangeText={handleChange('Weight')}
                                onBlur={handleBlur('Weight')}
                                value={values.Weight}
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

export default UpdatePersonalDetails;
