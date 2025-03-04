import styled from 'styled-components/native';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: '#ffffff',
  secondary: '#E5E7EB',
  tertiary: '#1F2937',
  darkLight: '#9CA3AF',
  brand: '#6D28D9',
  green: '#10B981',
  red: '#EF4444',
  lightblue: '#87CEFA',
};

const { primary, secondary, tertiary, darkLight, brand, green, red, lightblue } = Colors;

export const WelcomeContainerHeader = styled.View`
  display: flex;
  flex-direction: row;
`;

export const StyledContainer = styled.View`
  padding-top: ${StatusBarHeight + 10}px;
  background-color: ${primary};
`;

export const InnerContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 0;
`;

export const WelcomeImage = styled.Image`
  height: 50%;
  min-width: 100%;
`;

export const Avatar = styled.Image`
  width: 250px;
  height: 250px;
  margin: auto;

  ${(props) =>
    props.welcomeLeftIcon &&
    `
    width: 50px;
    height: 50px;
    `}
`;

export const PageLogo = styled.Image`
  width: 300px;
  height: 150px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;

  ${(props) =>
    props.welcome &&
    `
    font-size: 35px;
  `}
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};

  ${(props) =>
    props.welcome &&
    `
    margin-bottom: 5px;
    font-weight: normal;
    color: ${tertiary};
  `}

  ${(props) =>
    props.welcomeHeader &&
    `
    font-weight: normal;
     margin: auto;
     color: ${lightblue};
  `}
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 50px;
  align-items: center;

  ${(props) =>
    props.google === true &&
    `
    background-color: ${red};
    flex-direction: row;
    justify-content: center;
    padding: 0px;
  `}

  ${(props) =>
    props.welcome === true &&
    `
    background-color: ${green};
    flex-direction: row;
    justify-content: center;
    flex: 1 50px;
  `}

  ${(props) =>
      props.home === true &&
      `
      background-color: ${green};
      justify-content: center;
      width: 100px;
      margin: 15px;
      `}
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;

  ${(props) =>
    props.google === true &&
    `
    padding: 10px;
  `}

  ${(props) =>
    props.welcome === true &&
    `
    padding-right: 10px;
  `}
`;

export const MsBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type === 'SUCCESS' ? green : red)};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;