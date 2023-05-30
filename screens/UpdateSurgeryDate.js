// import React, {useContext, useState, useEffect} from 'react';
// import {StatusBar} from 'expo-status-bar';
// import {Formik} from 'formik';
// import {Ionicons} from '@expo/vector-icons';

// import {
//     ButtonText,
//     Colors,
//     InnerContainer,
//     LeftIcon,
//     Line,
//     MsBox,
//     PageLogo,
//     PageTitle,
//     RightIcon,
//     StyledButton,
//     StyledFormArea,
//     StyledInputLabel,
//     StyledTextInput,
// } from '../components/styles';
// import {ActivityIndicator, Alert, Button, Modal, Platform, ScrollView, TouchableOpacity, View} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';
// // import ModalDropdown from 'react-native-modal-dropdown';
// import {Picker} from '@react-native-picker/picker';
// import {CredentialsContext} from '../components/CredentialsContext';

// import ENV from "../environment";
// import {useTranslation} from "react-i18next";




// const {brand, darkLight, primary} = Colors;

// const UpdateSurgeryDate = ({navigation}) => {
//     // const [showDatePicker, setShowDatePicker] = useState(false);
//     const [date, setDate] = useState(new Date());
//     const [SurgeryDate, setSurgeryDate] = useState(null);
//     const { storedCredentials } = useContext(CredentialsContext);
//     handleMessage(null);

//     const showDatePicker = () => {
//         console.log('showDatePicker');
//         setShow(true);
//     };

//     useEffect(() => {
//       const fetchSurgeryDate = async () => {
//         try {
//           const response = await axios.get(ENV.API_URL.userDetalis + "/getDateOfSurgery", {
//             headers: { 'x-auth-token': storedCredentials.token }
//           });
//           const { SurgeryDate } = response.data;
//           if (SurgeryDate) {
//             setSurgeryDate(new Date(SurgeryDate));
//           }
//         } catch (error) {
//           console.log('error', error);
//           handleMessage(t('Failed to fetch surgery date.'));
//         }
//       };
    
//       fetchSurgeryDate();
//     }, []);
      
//     const handleSignup = (data, setSubmitting) => {
//         handleMessage(null);
//         const url = ENV.API_URL.userDetalis + "/changeDateOfSurgery"; //Todo change to
//         const headers = {'x-auth-token': storedCredentials.token};
//         data = {
//             ...data
//         }
//         axios
//             .post(url, data, {headers: headers})
//             .then((response) => {
//                 console.log(response.data);
//                 Alert.alert(t("Personal Information successfully updated"))
//                 setSubmitting(false);
//                 navigation.goBack();
//             })
//             .catch((error) => {
//                 console.log('error', error);
//                 setSubmitting(false);
//                 handleMessage(t("Something went wrong. Please try again later."));
//             });
//     };

//     const handleMessage = (message, type = 'FAILED') => {
//         setMessage(message);
//         setMessageType(type);
//     };
  
//     const handleDateChange = (event, selectedDate) => {
//       const currentDate = selectedDate || date;
//       setShowDatePicker(Platform.OS === 'ios');
//       setDate(currentDate);
//     };

//     /*
//     The useTranslation hook is a custom hook provided by the react-i18next library.
//     It allows you to access the t function in your functional React components.

//     The t function is a function that takes a string key and returns the corresponding translation in the current language.
//     It is used to translate strings in your component JSX.
//     */
//     const {t} = useTranslation();
  
//     return (
//         <ScrollView>
//             <StatusBar style="dark"/>
//                 <InnerContainer>

//                     <Modal animationType="fade" visible={show} transparent={true}>
//                         <View style={{
//                             flex: 1,
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             backgroundColor: 'rgba(1,1,1,0.3)'
//                         }}>
//                             <View style={{backgroundColor: 'gray', borderRadius: 8, padding: 6, width: 330, margin: 8}}>
//                                 <DateTimePicker
//                                     testID="dateTimePicker"
//                                     value={date}
//                                     mode="date"
//                                     is24Hour={true}
//                                     display="spinner"
//                                     onChange={onChange}
//                                 />
//                                 <View style={{width: 330}}>
//                                     <Button color={'black'} title={'Choose Date'} onPress={() => setShow(false)}/>
//                                 </View>
//                             </View>
//                         </View>
//                     </Modal>
//                     <PageLogo resizeMode="cover" source={require('../assets/app_logo.png')}/>
//                     <PageTitle>{t('Update Surgery Date')}</PageTitle>
//                     <Formik
//                     initialValues={{
//                         DateOfSurgery: ''
//                     }}
//                     onSubmit={(values, {setSubmitting}) => {
//                         // if (values.Smoke === '' || values.Gender === '') {
//                         //   handleMessage('Please fill all the fields');
//                         //   setSubmitting(false);
//                         // } else {
//                         handleSignup(values, setSubmitting);
//                         // }
//                     }}
//                 >
//                     {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
//                         <StyledFormArea>
//                             <MyTextInput
//                                 label={t("Date of Surgery")}
//                                 icon="calendar"
//                                 placeholder="YYYY - MM - DD" //TODO get personal birth date from server
//                                 placeholderTextColor={darkLight}
//                                 onChangeText={handleChange('SurgeryDate')}
//                                 onBlur={handleBlur('SurgeryDate')}
//                                 value={SurgeryDate ? SurgeryDate.toString() : ''}
//                                 isDate={true}
//                                 editable={false}
//                                 showDatePicker={showDatePicker}
//                             />

//                             <MsBox type={messageType}>{message}</MsBox>
//                             {!isSubmitting && (
//                                 <StyledButton onPress={handleSubmit}>
//                                     <ButtonText>{t("Update information")}</ButtonText>
//                                 </StyledButton>
//                             )}
//                             {isSubmitting && (
//                                 <StyledButton disabled={true}>
//                                     <ActivityIndicator size="large" color={primary}/>
//                                 </StyledButton>
//                             )}
//                             <Line/>
//                         </StyledFormArea>
//                     )}
//                 </Formik>
//                 </InnerContainer>
            
//         </ScrollView>

//     );
// };
  
// const MyTextInput = ({
//                          isPicker,
//                          label,
//                          icon,
//                          isPassword,
//                          hidePassword,
//                          setHidePassword,
//                          isDate,
//                          showDatePicker,
//                          showPicker,
//                          ...props
//                      }) => {
//     return (
//         <View>
//             <LeftIcon>
//                 <Ionicons name={icon} size={30} color={brand}/>
//             </LeftIcon>
//             <StyledInputLabel>{label}</StyledInputLabel>
//             {!isDate && !isPicker && <StyledTextInput {...props} />}
//             {isDate && (
//                 <TouchableOpacity onPress={showDatePicker}>
//                     <StyledTextInput pointerEvents={'none'} {...props} />
//                 </TouchableOpacity>
//             )}
//             {isPassword && (
//                 <RightIcon onPress={() => setHidePassword(!hidePassword)}>
//                     <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
//                 </RightIcon>
//             )}
//             {isPicker && (
//                 <TouchableOpacity onPress={showPicker}>
//                     <StyledTextInput editable={false} pointerEvents={'none'} {...props} />
//                 </TouchableOpacity>
//             )}
//         </View>
//     );
// };

//   export default UpdateSurgeryDate;

//     //     {/* <InnerContainer>
//     //     <StatusBar style="dark" />
//     //     <PageTitle>{t('Update Surgery Date')}</PageTitle>
//     //     {typeof SurgeryDate === 'object' && (
//     //         <>
//     //             <p>{t('Your current surgery date:')} {SurgeryDate}</p>
//     //         </>
//     //     )}
//     //     <View>
//     //       <Button title="Pick Surgery Date" onPress={() => setShowDatePicker(true)} />
//     //     </View>
//     //     {showDatePicker && (
//     //       <DateTimePicker
//     //         testID="dateTimePicker"
//     //         value={date}
//     //         mode="date"
//     //         is24Hour={true}
//     //         display="default"
//     //         onChange={handleDateChange}
//     //       />
//     //     )}
//     //     <View>
//     //       <Button title="Update Date" onPress={handleUpdateDate} />
//     //     </View>
//     //   </InnerContainer> */}

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
                <PageLogo resizeMode="cover" source={require('../assets/app_logo.png')}/>
                <PageTitle welcome={true}>{t("Surgery Date")}</PageTitle>

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
                                value={SurgeryDate ? SurgeryDate.toString() : ''}
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
