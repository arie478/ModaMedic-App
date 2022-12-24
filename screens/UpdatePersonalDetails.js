import React, { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { Octicons, Ionicons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';

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
import { ActivityIndicator, Alert, Button, Modal, TouchableOpacity, View, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
// import ModalDropdown from 'react-native-modal-dropdown';
import { Picker } from '@react-native-picker/picker';
import { CredentialsContext } from '../components/CredentialsContext';

import ENV from "../environment";

const { brand, darkLight, primary } = Colors;

const UpdatePersonalDetails = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [dob, setDob] = useState();
  const [showSmoke, setShowSmoke] = useState(false);
  const [selectedSmoke, setSelectedSmoke] = useState('Non Smoker');
  const [showGender, setShowGender] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Female');
  const [showAcademicStatus, setShowAcademicStatus] = useState(false);
  const [selectedAcademicStatus, setSelectedAcademicStatus] = useState('Academic');
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
	const { storedCredentials } = useContext(CredentialsContext);


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

  const handleSignup = (data, setSubmitting) => {
    handleMessage(null);
    const url = ENV.API_URL.personalDetalis; //Todo change to
    const headers = {  'x-auth-token': storedCredentials.token };
    data = {...data, "Gender": selectedGender, "Smoke": selectedSmoke, "Education": selectedAcademicStatus}
    axios
      .post(url, data, {headers: headers})
      .then((response) => {
        Alert.alert("Update Successfully")
        setSubmitting(false);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('error', error);
        setSubmitting(false);
        handleMessage('An error occurred. Check your network');
      });
  };

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };
  return (
    <ScrollView>
      <StatusBar style="light" />
      <InnerContainer>
        <Modal animationType="fade" visible={show} transparent={true}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(1,1,1,0.3)' }}>
            <View style={{ backgroundColor: 'gray', borderRadius: 8, padding: 6, width: 330, margin: 8 }}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="spinner"
                onChange={onChange}
              />
              <View style={{ width: 330 }}>
                <Button color={'black'} title={'Choose Date'} onPress={() => setShow(false)} />
              </View>
            </View>
          </View>
        </Modal>
        <Modal animationType="fade" visible={showSmoke} transparent={false}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(1,1,1,0.3)' }}>
            <View style={{ backgroundColor: 'gray', borderRadius: 8, padding: 6, width: 330, margin: 8 }}>
              <Picker
                selectedValue={selectedSmoke}
                onValueChange={(itemValue, itemIndex) => setSelectedSmoke(itemValue)}
              >
                <Picker.Item label="Smoker" value="Smoker" />
                <Picker.Item label="Non Smoker" value="Non Smoker" />
              </Picker>
              <View style={{ width: 330 }}>
                <Button color={'black'} title={'Choose Status'} onPress={() => setShowSmoke(false)} />
              </View>
            </View>
          </View>
        </Modal>
        <Modal animationType="fade" visible={showGender} transparent={true}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(1,1,1,0.3)' }}>
            <View style={{ backgroundColor: 'gray', borderRadius: 8, padding: 6, width: 330, margin: 8 }}>
              <Picker
                selectedValue={selectedGender}
                onValueChange={(itemValue, itemIndex) => setSelectedGender(itemValue)}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
              <View style={{ width: 330 }}>
                <Button color={'black'} title={'Choose Gender'} onPress={() => setShowGender(false)} />
              </View>
            </View>
          </View>
        </Modal>
        <Modal animationType="fade" visible={showAcademicStatus} transparent={true}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(1,1,1,0.3)' }}>
            <View style={{ backgroundColor: 'gray', borderRadius: 8, padding: 6, width: 330, margin: 8 }}>
              <Picker
                selectedValue={selectedAcademicStatus}
                onValueChange={(itemValue, itemIndex) => setSelectedAcademicStatus(itemValue)}
              >
                <Picker.Item label="Academic" value="Academic" />
                <Picker.Item label="High-School" value="High-School" />
                <Picker.Item label="10-12 school years" value="10-12 school years" />
                <Picker.Item label="6-9 school years" value="6-9 school years" />
                <Picker.Item label="5 school years or less" value="5 school years or less" />
                <Picker.Item label="Not interested to share" value="Not interested to share" />
              </Picker>
              <View style={{ width: 330 }}>
                <Button color={'black'} title={'Choose Academic Status'} onPress={() => setShowAcademicStatus(false)} />
              </View>
            </View>
          </View>
        </Modal>
        <PageLogo resizeMode="cover" source={require('../assets/app_logo.png')} />
        <PageTitle welcome={true}>Update Personal Details</PageTitle>

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
            DateOfSurgery: '',
            Questionnaires: '',
            VerificationQuestion: 0,
            VerificationAnswer: 'Leo',
            Code: 'soroka372abc',
          }}
          onSubmit={(values, { setSubmitting }) => {
            // if (values.Smoke === '' || values.Gender === '') {
            //   handleMessage('Please fill all the fields');
            //   setSubmitting(false);
            // } else {
            handleSignup(values, setSubmitting);
            // }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
            <StyledFormArea>
              <MyTextInput
                label="Date of Birth"
                icon="calendar"
                placeholder="YYYY - MM - DD" //TODO get personal birth date from server
                placeholderTextColor={darkLight}
                onChangeText={handleChange('BirthDate')}
                onBlur={handleBlur('BirthDate')}
                value={dob ? dob.toString() : ''}
                isDate={true}
                editable={false}
                showDatePicker={showDatePicker}
              />
              <MyTextInput
                label="Smoking Status"
                icon="person"
                placeholder="John Doe "
                placeholderTextColor={darkLight}
                onChangeText={handleChange('Smoke')}
                onBlur={handleBlur('Smoke')}
                isPicker={true}
                value={selectedSmoke.toString()}
                showPicker={showSmokePicker}
              />
              <MyTextInput
                label="Gender"
                icon="person"
                placeholder="John Doe "
                placeholderTextColor={darkLight}
                onChangeText={handleChange('Gender')}
                onBlur={handleBlur('Gender')}
                isPicker={true}
                value={selectedGender.toString()}
                showPicker={showGenderPicker}
              />
              <MyTextInput
                label="Education"
                icon="person"
                placeholder="John Doe "
                placeholderTextColor={darkLight}
                onChangeText={handleChange('Education')}
                onBlur={handleBlur('Education')}
                isPicker={true}
                value={selectedAcademicStatus.toString()}
                showPicker={showAcademicStatusPicker}
              />
              <MyTextInput
                label="Height (cm)"
                icon="person"
                placeholder="175"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('Height')}
                onBlur={handleBlur('Height')}
                value={values.Height}
              />
              <MyTextInput
                label="Weight (kg)"
                icon="person"
                placeholder="75"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('Weight')}
                onBlur={handleBlur('Weight')}
                value={values.Weight}
              />

              <MsBox type={messageType}>{message}</MsBox>
              {!isSubmitting && (
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Update</ButtonText>
                </StyledButton>
              )}
              {isSubmitting && (
                <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color={primary} />
                </StyledButton>
              )}
              <Line />
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
        <Ionicons name={icon} size={30} color={brand} />
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
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
      {isPicker && (
        <TouchableOpacity onPress={showPicker}>
          <StyledTextInput editable={false}  pointerEvents={'none'} {...props} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UpdatePersonalDetails;
