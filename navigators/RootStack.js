import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import PersonalDetails from '../screens/PersonalDetails';
import { Colors } from '../components/styles';
import { CredentialsContext } from '../components/CredentialsContext';
import VideosCategories from '../screens/Videos/videosCategories';
import Videos from '../screens/Videos/videos';
import UpdatePersonalDetails from '../screens/UpdatePersonalDetails';
import BodyPartSelection from "../screens/BodyPartSelection";
import DailyQuestion, {
	DailyQuestionMedication,
	LifeQuality1,
	LifeQuality2,
	LifeQuality3,
	LifeQuality4,
	LifeQuality5,
  LifeQuality6,
} from '../screens/DailyQuestion';

const { primary, tertiary } = Colors;
const Stack = createNativeStackNavigator();
const RootStack = () => {
	return (
		<CredentialsContext.Consumer>
			{({ storedCredentials }) => (
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: {
								backgroundColor: 'transparent',
							},
							headerTintColor: tertiary,
							headerTransparent: true,
							headerTitle: '',
							headerLeftContainerStyle: {
								paddingLeft: 20,
							},
						}}
						initalRouteName="Login">
						{storedCredentials ? (
							<>
								<Stack.Screen name="BodyPartSelection" component={BodyPartSelection} />
								<Stack.Screen name="Welcome" component={Welcome} />
								<Stack.Screen name="PersonalDetails" component={PersonalDetails} />
								<Stack.Screen name="UpdatePersonalDetails" component={UpdatePersonalDetails} />
								<Stack.Screen name="HomeVideoExercise" component={VideosCategories} />
								<Stack.Screen name="Neck" component={Videos} />
								<Stack.Screen name="DailyQuestion" component={DailyQuestion} />
								<Stack.Screen name="DailyQuestionMedication" component={DailyQuestionMedication} />
								<Stack.Screen name="LifeQuality1" component={LifeQuality1} />
								<Stack.Screen name="LifeQuality2" component={LifeQuality2} />
								<Stack.Screen name="LifeQuality3" component={LifeQuality3} />
								<Stack.Screen name="LifeQuality4" component={LifeQuality4} />
								<Stack.Screen name="LifeQuality5" component={LifeQuality5} />
								<Stack.Screen name="LifeQuality6" component={LifeQuality6} />
							</>
						) : (
							<>
								<Stack.Screen name="Login" component={Login} />
								<Stack.Screen name="Signup" component={Signup} />
							</>
						)}
					</Stack.Navigator>
				</NavigationContainer>
			)}
		</CredentialsContext.Consumer>
	);
};

export default RootStack;
